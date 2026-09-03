import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(req: NextRequest){
  const hasSession=!!req.cookies.get('ecovibe_session')?.value;
  const path=req.nextUrl.pathname;
  if(!hasSession && !path.startsWith('/login') && !path.startsWith('/registro') && !path.startsWith('/_next') && !path.startsWith('/api/auth')) return NextResponse.redirect(new URL('/login',req.url));
  if(hasSession && (path==='/login'||path==='/registro')) return NextResponse.redirect(new URL('/',req.url));
  return NextResponse.next();
}
export const config={matcher:['/((?!favicon.ico).*)']};
