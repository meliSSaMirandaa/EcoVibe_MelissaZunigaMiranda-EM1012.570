import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
export async function POST(req:Request){const {email,password}=await req.json();const user=await prisma.user.findUnique({where:{email}});if(!user||!(await bcrypt.compare(password,user.passwordHash)))return NextResponse.json({error:'Credenciales inválidas'},{status:401});await createSession(user.id);return NextResponse.json({ok:true});}
