# Configurar Supabase desde consola — CONECTOMA | IngenIA 2026

Todo lo que hicimos antes desde el dashboard web de Supabase también se puede hacer por terminal con el **Supabase CLI**. Aquí el paso a paso completo.

---

## 1. Instalar el Supabase CLI

Elige el comando según tu sistema:

```bash
# macOS (Homebrew)
brew install supabase/tap/supabase

# Windows (Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux / alternativa multiplataforma (npx, sin instalar global)
npx supabase --version
```

Verifica la instalación:

```bash
supabase --version
```

---

## 2. Iniciar sesión

```bash
supabase login
```

Esto abre el navegador para autorizar el CLI con tu cuenta de Supabase. Si prefieres no usar navegador (ej. en un servidor remoto), genera un token en `https://supabase.com/dashboard/account/tokens` y usa:

```bash
supabase login --token TU_ACCESS_TOKEN
```

---

## 3. Ubicarte en la carpeta del proyecto

```bash
cd ~/Documents/conectoma-platform
```

El proyecto ya trae una carpeta `supabase/` con `schema.sql`. Vamos a convertir esto en un proyecto Supabase gestionado por CLI (con migraciones versionadas).

```bash
supabase init
```

Esto genera `supabase/config.toml` y la estructura estándar del CLI (respeta el `schema.sql` que ya tienes, no lo borra).

---

## 4. Crear el proyecto en Supabase (o vincular uno existente)

### Opción A — Crear el proyecto por CLI

Primero necesitas el ID de tu organización:

```bash
supabase orgs list
```

Copia el `id` que te interese y crea el proyecto:

```bash
supabase projects create conectoma-ingenia-2026 \
  --org-id TU_ORG_ID \
  --db-password "UnaContraseñaSeguraAqui" \
  --region sa-east-1
```

`sa-east-1` es São Paulo, la región más cercana a Colombia disponible en Supabase. Guarda la contraseña de base de datos en un lugar seguro (gestor de contraseñas), la necesitarás para conexiones directas por Postgres.

Esto imprime un `project ref` (algo como `abcdefghijklmnop`). Cópialo.

### Opción B — Ya creaste el proyecto desde el dashboard

Solo necesitas el `project ref`, visible en la URL del dashboard: `https://supabase.com/dashboard/project/TU_PROJECT_REF`.

### Vincular tu carpeta local al proyecto remoto

```bash
supabase link --project-ref TU_PROJECT_REF
```

Te pedirá la contraseña de base de datos que definiste al crear el proyecto.

---

## 5. Convertir `schema.sql` en una migración y aplicarla

```bash
supabase migration new init_schema
```

Esto crea un archivo vacío en `supabase/migrations/TIMESTAMP_init_schema.sql`. Copia todo el contenido de tu `supabase/schema.sql` original dentro de ese nuevo archivo de migración:

```bash
cat supabase/schema.sql > supabase/migrations/*_init_schema.sql
```

(En Windows PowerShell: `Get-Content supabase/schema.sql | Set-Content (Get-Item supabase/migrations/*_init_schema.sql)`)

Aplica la migración al proyecto remoto:

```bash
supabase db push
```

Esto ejecuta el SQL completo (tablas, RLS, funciones, triggers) directamente sobre tu base de datos en la nube. Confirma cuando el CLI te lo pida.

---

## 6. Obtener tus credenciales de API

```bash
supabase projects api-keys --project-ref TU_PROJECT_REF
```

Esto imprime tu `anon` key y tu `service_role` key. Usa la **anon** en tu `.env` del frontend:

```bash
echo "VITE_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co" >> .env
echo "VITE_SUPABASE_ANON_KEY=TU_ANON_KEY_AQUI" >> .env
```

> La `service_role` key **nunca** va en el frontend ni en `.env` del sitio — tiene permisos totales saltándose RLS. Solo la usaremos una vez, desde la terminal, para crear el primer usuario admin (paso siguiente), y luego la descartas de tu historial de shell.

---

## 7. Crear tu primer usuario administrador por consola

El CLI no tiene un comando directo para crear usuarios de Auth, pero puedes usar `curl` contra la API de administración de Supabase con la `service_role` key:

```bash
curl -X POST "https://TU_PROJECT_REF.supabase.co/auth/v1/admin/users" \
  -H "apikey: TU_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer TU_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "congreso.ingenieria@usta.edu.co",
    "password": "UnaContraseñaSegura123",
    "email_confirm": true
  }'
```

Esto crea el usuario y dispara automáticamente el trigger `handle_new_user` (definido en tu `schema.sql`), que le crea un `profile` con rol `editor` por defecto.

Ahora súbelo a `admin` por consola, conectándote directo a la base de datos con `psql` (necesitas la contraseña de base de datos del paso 4):

```bash
supabase db execute --project-ref TU_PROJECT_REF \
  --query "update profiles set role = 'admin' where email = 'congreso.ingenieria@usta.edu.co';"
```

Si tu versión del CLI no trae `db execute`, usa `psql` directamente con la cadena de conexión que te da:

```bash
supabase projects api-keys --project-ref TU_PROJECT_REF
```

o, más simple, ve a **Table Editor → profiles** en el dashboard web solo para este último ajuste manual (es la única parte donde el dashboard es más rápido que la consola).

---

## 8. Verificar que todo quedó bien

```bash
supabase status          # si estás corriendo Supabase local también
supabase projects list   # confirma que tu proyecto aparece
```

Y en tu proyecto local:

```bash
npm run dev
```

Entra a `http://localhost:5173/admin/login` e inicia sesión con el correo y contraseña que creaste en el paso 7. Deberías entrar directo al panel de administración.

---

## 9. (Opcional) Flujo de trabajo continuo con migraciones

De ahora en adelante, si necesitas cambiar el esquema de la base de datos (nueva columna, nueva tabla, etc.), el flujo correcto por consola es:

```bash
supabase migration new nombre_del_cambio
# edita el archivo generado en supabase/migrations/
supabase db push
```

Así mantienes un historial versionado de la base de datos junto con tu código en GitHub, en vez de hacer cambios sueltos desde el dashboard que nadie más ve.

---

## Resumen de comandos clave

| Acción | Comando |
|---|---|
| Instalar CLI | `brew install supabase/tap/supabase` |
| Iniciar sesión | `supabase login` |
| Inicializar proyecto local | `supabase init` |
| Crear proyecto remoto | `supabase projects create ...` |
| Vincular carpeta con proyecto | `supabase link --project-ref REF` |
| Nueva migración | `supabase migration new nombre` |
| Aplicar migraciones | `supabase db push` |
| Ver llaves de API | `supabase projects api-keys --project-ref REF` |
| Listar proyectos | `supabase projects list` |

---

## Siguiente paso

Con Supabase ya configurado y tu usuario admin funcionando en local, el siguiente paso es agregar estas mismas variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) en Netlify (Site settings → Environment variables) para que el sitio en producción también se conecte a la misma base de datos. Eso ya está cubierto en la Parte 5 de `DEPLOY_GUIDE.md`.
