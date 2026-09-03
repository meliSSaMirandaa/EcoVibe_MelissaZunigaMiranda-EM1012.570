'use client';
import { useEffect, useMemo, useState } from 'react';
import { Sparkles, Zap, Trash2, Factory, Recycle, Trees, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import type { DashboardData } from '@/types';

export default function Dashboard(){
  const [data,setData]=useState<DashboardData|null>(null); const [insights,setInsights]=useState<any[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{ Promise.all([fetch('/api/dashboard').then(r=>r.json()), fetch('/api/ai').then(r=>r.json())]).then(([d,a])=>{setData(d);setInsights(a.insights||[])}).finally(()=>setLoading(false)); },[]);
  const chart = useMemo(()=> data?.activities.slice().reverse().map((a:any)=>({date:new Date(a.date).toLocaleDateString('es-MX',{day:'2-digit',month:'short'}),carbon:Number(a.carbonKg.toFixed(1))}))||[],[data]);
  if(loading||!data) return <div style={{padding:40}}>Cargando EcoVibe...</div>;
  return <>
    <div className="topbar"><div><div className="eyebrow">Panel de impacto</div><h1>Hola, revisemos tu operación 🌱</h1><div className="muted">Resumen de consumo y residuos · {data.month}</div></div><button className="btn btn-primary" onClick={()=>location.href='/registrar'}>+ Registrar dato</button></div>
    <section className="hero"><div><div className="eyebrow" style={{color:'#cfe87b'}}>EcoScore</div><h2>Tu operación está avanzando</h2><div style={{color:'#d4e7da',maxWidth:650}}>EcoVibe convierte tus datos diarios en señales fáciles de entender para decidir dónde ahorrar y cómo reducir residuos.</div><div className="kpi-strip"><div className="small-kpi">ODS 7 · {data.ods7}%</div><div className="small-kpi">ODS 15 · {data.ods15}%</div><div className="small-kpi">CO₂e · {data.carbon.toFixed(0)} kg</div></div></div><div className="score">{data.ecoScore}</div></section>
    <div style={{height:17}}/>
    <div className="grid4">
      <Metric icon={<Zap/>} label="Energía" value={`${data.energy.toFixed(0)} kWh`} delta={`${data.energyDelta>0?'+':''}${data.energyDelta.toFixed(1)}%`} bad={data.energyDelta>0}/>
      <Metric icon={<Trash2/>} label="Residuos" value={`${data.waste.toFixed(0)} kg`} delta="este mes"/>
      <Metric icon={<Factory/>} label="Huella CO₂e" value={`${data.carbon.toFixed(0)} kg`} delta={`${data.carbonDelta>0?'+':''}${data.carbonDelta.toFixed(1)}%`} bad={data.carbonDelta>0}/>
      <Metric icon={<Recycle/>} label="Reciclaje" value={`${data.recycling.toFixed(0)} kg`} delta="recuperados"/>
    </div>
    <div style={{height:18}}/>
    <div className="grid2"><div className="card"><div className="section-title"><h2>Huella reciente</h2><span className="badge">CO₂e</span></div><div style={{height:240}}><ResponsiveContainer width="100%" height="100%"><AreaChart data={chart}><CartesianGrid strokeDasharray="3 3" stroke="#e7eee9"/><XAxis dataKey="date" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/><Area type="monotone" dataKey="carbon" stroke="#2c8b57" fill="#dcefdc" /></AreaChart></ResponsiveContainer></div></div>
    <div className="card"><div className="section-title"><h2>Recomendaciones inteligentes</h2><Sparkles size={18} color="#2c8b57"/></div>{insights.map((x,i)=><div className="alert" key={i}><div style={{display:'flex',justifyContent:'space-between',gap:12}}><div><div className="alert-title">{x.title}</div><div className="muted">{x.message}</div><div style={{marginTop:8,fontSize:12,fontWeight:700}}>Acción: {x.action}</div></div><span className={'badge '+(x.priority==='alta'?'red':x.priority==='media'?'warn':'')}>{x.priority}</span></div></div>)}</div></div>
    <div style={{height:18}}/>
    <div className="grid2"><OdsCard icon={<Zap/>} title="ODS 7 · Energía asequible y no contaminante" value={data.ods7} text="Reduce consumo innecesario y aumenta la eficiencia."/><OdsCard icon={<Trees/>} title="ODS 15 · Vida de ecosistemas terrestres" value={data.ods15} text="Mide residuos evitados y acciones de economía circular."/></div>
  </>;
}
function Metric({icon,label,value,delta,bad}:{icon:any,label:string,value:string,delta:string,bad?:boolean}){return <div className="card metric"><div className="metric-top"><div className="device-icon">{icon}</div><span className={'badge '+(bad?'red':'')}>{bad?'vigilar':'estable'}</span></div><div className="metric-value">{value}</div><div className="metric-label">{label} · {delta}</div></div>}
function OdsCard({icon,title,value,text}:{icon:any,title:string,value:number,text:string}){return <div className="card"><div style={{display:'flex',gap:12,alignItems:'center'}}><div className="device-icon">{icon}</div><div><div style={{fontWeight:800}}>{title}</div><div className="muted" style={{fontSize:12}}>{text}</div></div><div style={{marginLeft:'auto',fontWeight:900,fontSize:24}}>{value}%</div></div><div className="progress" style={{marginTop:16}}><div style={{width:`${value}%`}}/></div></div>}
