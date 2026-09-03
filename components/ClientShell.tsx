'use client';
import { usePathname } from 'next/navigation';
import Layout from './Layout';
export default function ClientShell({children}:{children:React.ReactNode}) { const p=usePathname(); return p==='/login'||p==='/registro'?<>{children}</>:<Layout>{children}</Layout>; }
