import OpenAI from 'openai';

export type Insight = { title: string; message: string; priority: 'alta'|'media'|'baja'; action: string };

const fallback = (metrics: { energy: number; waste: number; carbon: number; recycling: number }): Insight[] => {
  const out: Insight[] = [];
  if (metrics.energy > 1200) out.push({ title: 'Optimiza energía', message: 'El consumo mensual estimado está por encima del objetivo. Revisa climatización e iluminación.', priority: 'alta', action: 'Configura horarios y apagado automático.' });
  else out.push({ title: 'Buen control energético', message: 'El consumo de energía se encuentra dentro de un rango manejable.', priority: 'baja', action: 'Mantén el monitoreo y revisa picos por horario.' });
  if (metrics.waste > 250) out.push({ title: 'Reduce residuos', message: 'Se detecta una generación de residuos alta para una pyme de esta escala.', priority: 'media', action: 'Separa reciclables en origen y mide por área.' });
  if (metrics.recycling < 15) out.push({ title: 'Aumenta reciclaje', message: 'La recuperación de materiales aún representa una proporción pequeña.', priority: 'media', action: 'Instala estaciones de separación visibles.' });
  out.push({ title: 'ODS 15', message: 'Convierte la reducción de residuos en una acción de protección de recursos naturales.', priority: 'baja', action: 'Define una meta semanal de residuos evitados.' });
  return out.slice(0,4);
};

export async function generateInsights(metrics: { energy: number; waste: number; carbon: number; recycling: number }): Promise<Insight[]> {
  if (!process.env.OPENAI_API_KEY) return fallback(metrics);
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Eres un asesor de sostenibilidad para pequeñas empresas en León, Guanajuato. Con estos datos mensuales: energía=${metrics.energy} kWh, residuos=${metrics.waste} kg, CO2e=${metrics.carbon} kg, reciclaje=${metrics.recycling} kg. Devuelve JSON con 4 recomendaciones accionables y concretas. Esquema: [{"title":string,"message":string,"priority":"alta|media|baja","action":string}]. Considera ODS 7 (energía asequible y no contaminante) y ODS 15 (vida de ecosistemas terrestres).`;
  const response = await client.responses.create({ model: process.env.OPENAI_MODEL || 'gpt-4.1-mini', input: prompt });
  try { return JSON.parse(response.output_text) as Insight[]; } catch { return fallback(metrics); }
}
