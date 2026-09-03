'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ClipboardList, Gauge, Settings, SlidersHorizontal, Cpu, Leaf, LogOut } from 'lucide-react';

const items = [
  ['/', 'Dashboard', Gauge],
  ['/registrar', 'Registrar', ClipboardList],
  ['/historial', 'Historial', BarChart3],
  ['/simulador', 'Simulador', SlidersHorizontal],
  ['/dispositivo', 'Dispositivos', Cpu],
  ['/configuracion', 'Configuración', Settings],
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Leaf size={19}/></div><div>EcoVibe <span style={{color:'#cfe87b'}}>PYME</span></div></div>
    <div style={{fontSize:12,color:'#9db6a7',marginBottom:9}}>MONITOREO SOSTENIBLE</div>
    <nav className="nav">{items.map(([href,label,Icon]) => <Link key={href} href={href} className={pathname===href?'active':''}><Icon size={17}/>{label}</Link>)}</nav>
    <div style={{marginTop:'auto',padding:'18px 10px 0'}}><button className="btn" style={{width:'100%',background:'#28533c',color:'white',marginBottom:12}} onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});location.href='/login'}}><LogOut size={15} style={{verticalAlign:'-2px',marginRight:6}}/>Salir</button><div style={{fontSize:12,color:'#9db6a7'}}>León, Guanajuato<br/>ODS 7 + ODS 15</div></div>
  </aside>;
}
