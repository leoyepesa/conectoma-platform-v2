# CONECTOMA | IngenIA 2026

Plataforma oficial del Congreso Internacional CONECTOMA — "Ingeniería que piensa, decide y construye". Universidad Santo Tomás, Sede Central, Bogotá.

## Tecnologías

- React + TypeScript + Vite
- TailwindCSS
- Supabase (base de datos, autenticación y roles)
- Netlify (despliegue)

## Funcionalidades

- Conteo regresivo hacia el evento
- Agenda interactiva con estado en vivo (qué está pasando ahora, qué ya pasó, qué viene)
- Perfil de conferencistas
- Directorio de patrocinadores por nivel
- Noticias del congreso
- Inscripción (redirección a SUMMA)
- Convocatoria de artículos y pósters, con formulario de postulación
- Panel administrativo (`/admin`) con login por Supabase para editar todo el contenido sin tocar código

## Instalación local

```bash
npm install
cp .env.example .env   # completa tus credenciales de Supabase
npm run dev
```

## Build de producción

```bash
npm run build
```

## Guía completa de despliegue

Ver [`DEPLOY_GUIDE.md`](./DEPLOY_GUIDE.md) para el paso a paso de configuración de Supabase, variables de entorno y despliegue en Netlify.

## ⚠️ Nota de seguridad

Este repositorio es público. Nunca subas archivos con credenciales, tokens o llaves API al repo (por ejemplo, un archivo llamado `token_github`). Usa siempre variables de entorno (`.env`, que está en `.gitignore`) o los "Environment variables" de Netlify.
# conectoma-platform-v2
