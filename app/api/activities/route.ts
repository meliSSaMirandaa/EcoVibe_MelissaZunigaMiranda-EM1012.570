import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { estimateCarbon } from '@/lib/carbon';
import { ActivityCategory } from '@prisma/client';

export async function GET() {
  try {
    const user = await requireUser();
    const rows = await prisma.activity.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { date: 'desc' },
      take: 150
    });
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const b = await req.json();
    const quantity = Number(b.quantity);
    const category = b.category as ActivityCategory;

    if (!quantity || quantity < 0) {
      return NextResponse.json({ error: 'Cantidad inválida' }, { status: 400 });
    }

    const row = await prisma.activity.create({
      data: {
        organizationId: user.organizationId,
        date: new Date(b.date || Date.now()),
        category,
        quantity,
        unit: String(b.unit || ''),
        source: b.source || null,
        carbonKg: estimateCarbon(category, quantity),
        energyKwh: category === 'ENERGY' ? quantity : 0,
        wasteKg: ['WASTE', 'RECYCLING'].includes(category) 
          ? (category === 'RECYCLING' ? -quantity : quantity) 
          : 0,
        waterLiters: category === 'WATER' ? quantity : 0,
        notes: b.notes || null
      }
    });

    return NextResponse.json(row);
  } catch (e) {
    return NextResponse.json({ error: 'No se pudo guardar' }, { status: 400 });
  }
}