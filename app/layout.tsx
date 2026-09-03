import './globals.css';
import ClientShell from '@/components/ClientShell';
export const metadata = { title:'EcoVibe PYME', description:'Monitoreo de energía, residuos y huella de carbono para pymes locales.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body><ClientShell>{children}</ClientShell></body></html>; }
