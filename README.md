# EcoVibe PYME

Aplicación web full-stack inspirada en el prototipo EcoVibe compartido, adaptada al proyecto semestral de **Transformación Digital + IA + Sostenibilidad/Economía Verde**, con foco en pymes de León, Guanajuato y ODS 7 / ODS 15.

## Qué incluye

- Dashboard de energía, residuos, CO₂e, reciclaje y EcoScore.
- Registro de actividades ambientales.
- Historial persistido en PostgreSQL.
- Simulador de ahorro energético/económico.
- Módulo de dispositivos con controles demo preparados para integración IoT.
- Configuración de metas.
- Recomendaciones con IA: si existe `OPENAI_API_KEY`, usa el modelo definido en `OPENAI_MODEL`; si no, funciona con reglas locales para que la demo no dependa de una API externa.
- Registro/inicio de sesión con contraseña cifrada y cookie de sesión.

## Arquitectura

- **Frontend + servidor:** Next.js App Router + TypeScript.
- **Base de datos:** PostgreSQL + Prisma.
- **IA:** OpenAI API opcional.
- **UI:** React + CSS propio + Recharts + Lucide.

## Ejecutarlo en Visual Studio Code

1. Instala Node.js 20+ y PostgreSQL 15+.
2. Abre esta carpeta en Visual Studio Code.
3. Duplica `.env.example` como `.env` y configura `DATABASE_URL` y `JWT_SECRET`.
4. Ejecuta:

```bash
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

5. Abre `http://localhost:3000`.
6. Usuario demo: `demo@ecovibe.local` / `Demo1234!`.

## Publicarla para compartirla

La opción sencilla es:

- **GitHub** para guardar el código.
- **Vercel** para publicar el Next.js.
- **Supabase o Neon** para PostgreSQL.
- En las variables de entorno de Vercel agrega `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY` y `OPENAI_MODEL`.
- Ejecuta una vez `npx prisma db push` contra la base de producción o configura migraciones Prisma.

Así las demás personas solo necesitan un navegador y el enlace de la página; no necesitan instalar Visual Studio Code, Node.js ni PostgreSQL.

## Para el proyecto semestral

La demo usa factores de emisión simplificados dentro de `lib/carbon.ts` para que puedas modificarlos fácilmente. Para una versión académica más rigurosa, conviene reemplazarlos por factores oficiales o fuentes que tu profesor permita citar, y guardar la fuente/año de cada factor en la base de datos.

## Próximas ampliaciones recomendadas

- Importar recibos de CFE o archivos CSV.
- Separar usuarios por empresa/rol.
- Integrar medidores reales mediante API/MQTT.
- Añadir un reporte mensual PDF.
- Agregar módulo de residuos por tipo (orgánico, cartón, plástico, vidrio, etc.).
- Dashboard multiempresa para un administrador.
