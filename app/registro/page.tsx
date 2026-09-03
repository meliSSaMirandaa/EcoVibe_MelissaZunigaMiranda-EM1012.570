'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Registro(){
  const [f,setF]=useState({name:'',email:'',password:'',business:'',sector:'Comercio local'});
  const [m,setM]=useState('');
  return <div className="auth"><div className="auth-card">
    <div className="brand"><div className="brand-mark">🌿</div><div>EcoVibe PYME</div></div>
    <h1>Registrar negocio</h1><p className="muted">Crea el espacio de monitoreo de tu pyme.</p>
    <form className="form" onSubmit={async e=>{e.preventDefault();setM('');const r=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});const x=await r.json();if(r.ok)location.href='/';else setM(x.error||'No se pudo registrar');}}>
      <div className="field"><label>Nombre</label><input required value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></div>
      <div className="field"><label>Negocio</label><input required value={f.business} onChange={e=>setF({...f,business:e.target.value})}/></div>
      <div className="field"><label>Correo</label><input required type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></div>
      <div className="field"><label>Contraseña</label><input required type="password" minLength={8} value={f.password} onChange={e=>setF({...f,password:e.target.value})}/></div>
      <div className="field"><label>Sector</label><select value={f.sector} onChange={e=>setF({...f,sector:e.target.value})}><option>Comercio local</option><option>Restaurante</option><option>Servicios</option><option>Manufactura</option><option>Hotel</option><option>Otro</option></select></div>
      <button className="btn btn-primary">Crear cuenta</button>{m&&<div className="alert">{m}</div>}
    </form>
    <p className="footer-note"><Link href="/login">Volver a iniciar sesión</Link></p>
  </div></div>
}
