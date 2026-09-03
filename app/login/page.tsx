'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login(){
  const [email,setEmail]=useState('demo@ecovibe.local');
  const [password,setPassword]=useState('Demo1234!');
  const [error,setError]=useState('');
  return <div className="auth"><div className="auth-card">
    <div className="brand"><div className="brand-mark">🌿</div><div>EcoVibe PYME</div></div>
    <h1>Iniciar sesión</h1><p className="muted">Accede al panel de tu negocio.</p>
    <form className="form" onSubmit={async e=>{e.preventDefault();setError('');const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});if(r.ok)location.href='/';else setError('Correo o contraseña incorrectos.')}}>
      <div className="field"><label>Correo</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div>
      <div className="field"><label>Contraseña</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div>
      <button className="btn btn-primary">Entrar</button>
      {error&&<div className="alert">{error}</div>}
    </form>
    <p className="footer-note">Demo: <b>demo@ecovibe.local</b> · <b>Demo1234!</b> · <Link href="/registro">Crear cuenta</Link></p>
  </div></div>
}
