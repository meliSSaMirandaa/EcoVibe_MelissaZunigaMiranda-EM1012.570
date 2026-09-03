import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-only-secret-change-me');

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
  (await cookies()).set('ecovibe_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
}

export async function getCurrentUser() {
  const token = (await cookies()).get('ecovibe_session')?.value;
  if (!token) return null;
  try {
    const payload = await jwtVerify(token, secret);
    const userId = payload.payload.userId as string;
    return prisma.user.findUnique({ where: { id: userId }, include: { organization: true } });
  } catch { return null; }
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('UNAUTHORIZED');
  return user;
}
