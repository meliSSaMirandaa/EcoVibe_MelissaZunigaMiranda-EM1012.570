import { PrismaClient, ActivityCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Demo1234!', 10);

  const org = await prisma.organization.upsert({
    where: { id: 'demo-org' },
    update: {},
    create: {
      id: 'demo-org',
      name: 'EcoVibe Demo',
      city: 'León',
      state: 'Guanajuato',
      sector: 'Comercio local',
      settings: { create: {} },
    },
  });

  await prisma.user.upsert({
    where: { email: 'demo@ecovibe.local' },
    update: {},
    create: { name: 'Usuario Demo', email: 'demo@ecovibe.local', passwordHash, organizationId: org.id },
  });

  const count = await prisma.activity.count({ where: { organizationId: org.id } });
  if (count === 0) {
    const now = new Date();
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (13 - i));
      return d;
    });
    await prisma.activity.createMany({ data: days.flatMap((date, i) => [
      { organizationId: org.id, date, category: ActivityCategory.ENERGY, quantity: 95 + i * 2, unit: 'kWh', source: 'Medidor principal', carbonKg: (95 + i * 2) * 0.42, energyKwh: 95 + i * 2 },
      { organizationId: org.id, date, category: ActivityCategory.WASTE, quantity: 14 + (i % 4), unit: 'kg', source: 'Residuos mixtos', carbonKg: 14 * 0.58, wasteKg: 14 + (i % 4) },
      { organizationId: org.id, date, category: ActivityCategory.RECYCLING, quantity: 6 + (i % 3), unit: 'kg', source: 'Reciclables', carbonKg: -(6 + (i % 3)) * 0.18, wasteKg: -(6 + (i % 3)) },
    ]) });
  }

  const deviceCount = await prisma.device.count({ where: { organizationId: org.id } });
  if (deviceCount === 0) {
    await prisma.device.createMany({ data: [
      { organizationId: org.id, name: 'Aire acondicionado', type: 'HVAC', location: 'Área de ventas', powerW: 2200, isOn: true, status: 'ONLINE' },
      { organizationId: org.id, name: 'Iluminación', type: 'LIGHTING', location: 'Todo el local', powerW: 780, isOn: true, status: 'ONLINE' },
      { organizationId: org.id, name: 'Refrigerador', type: 'REFRIGERATION', location: 'Almacén', powerW: 620, isOn: true, status: 'ONLINE' },
    ] });
  }
}

main().finally(() => prisma.$disconnect());
