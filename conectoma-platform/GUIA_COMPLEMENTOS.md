# Guía consolidada: complementos requeridos

Esta guía reúne, en orden, **todo lo que falta configurar fuera del código** para que los dos complementos más recientes funcionen: la carga local de archivos en la convocatoria, y el reenvío de postulaciones por correo al editor en jefe.

Asume que ya completaste `SUPABASE_CLI_SETUP.md` (proyecto Supabase creado, CLI vinculado, esquema base aplicado, usuario admin funcionando).

---

## Complemento 1 — Carga local de archivos (artículos y pósters)

**Qué hace:** en `/convocatoria`, la persona ya no pega un enlace de Drive/OneDrive — sube el documento (PDF/Word/PowerPoint, máx. 15 MB) directo desde su computador. El archivo se guarda en Supabase Storage y el enlace se genera solo.

### Paso 1.1 — Crear el bucket y sus políticas de seguridad

Este SQL ya viene incluido al final de `supabase/schema.sql`. Si es un proyecto nuevo, ya quedó aplicado cuando corriste el esquema completo. Si tu proyecto ya existía antes de este complemento, aplícalo solo:

```bash
supabase migration new storage_submissions_bucket
```

Abre el archivo que se generó en `supabase/migrations/` y pega:

```sql
insert into storage.buckets (id, name, public, file_size_limit)
values ('submissions', 'submissions', true, 15728640) -- 15 MB
on conflict (id) do nothing;

create policy "submissions_bucket_public_upload"
  on storage.objects for insert
  with check (bucket_id = 'submissions');

create policy "submissions_bucket_public_read"
  on storage.objects for select
  using (bucket_id = 'submissions');

create policy "submissions_bucket_editor_delete"
  on storage.objects for delete
  using (bucket_id = 'submissions' and public.is_editor());
```

Aplica:

```bash
supabase db push
```

### Paso 1.2 — Verificar

```bash
npm run dev
```

Ve a `/convocatoria`, elige un PDF de prueba y envía el formulario. Si todo salió bien, verás "¡Propuesta recibida!". Confirma en Supabase → **Storage** → bucket `submissions` que el archivo quedó ahí.

No requiere ninguna variable de entorno adicional — usa las mismas `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` que ya tenías.

---

## Complemento 2 — Reenvío de postulaciones al editor en jefe por correo

**Qué hace:** en `/admin/submissions`, cada postulación tiene un botón **"Reenviar al editor"** que envía por correo todo el detalle al editor en jefe.

### Paso 2.1 — Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) → crea cuenta gratuita (100 correos/día sin costo).
2. **API Keys** → **Create API Key** → copia la key (`re_...`).

### Paso 2.2 — Configurar los secretos en Supabase

```bash
supabase secrets set RESEND_API_KEY=re_TU_API_KEY_AQUI
supabase secrets set EDITOR_EMAIL=congreso.ingenieria@usta.edu.co
supabase secrets set FROM_EMAIL=onboarding@resend.dev
```

> `onboarding@resend.dev` es el remitente de pruebas de Resend — funciona de inmediato sin configurar DNS. Más adelante, si la universidad verifica el dominio `usta.edu.co` en Resend, puedes cambiar solo el remitente:
> ```bash
> supabase secrets set FROM_EMAIL=no-reply@usta.edu.co
> ```

Verifica:

```bash
supabase secrets list
```

### Paso 2.3 — Desplegar la función

```bash
supabase functions deploy send-submission-email
```

### Paso 2.4 — Probar

1. Ve a `/admin/submissions` (inicia sesión si no lo has hecho).
2. Debe existir al menos una postulación — usa la que enviaste probando el Complemento 1, o crea una nueva desde `/convocatoria`.
3. Clic en **"Reenviar al editor"**.
4. Revisa la bandeja de `congreso.ingenieria@usta.edu.co` (y spam la primera vez).

Si el botón muestra **"Error, reintentar"**, revisa los logs:

```bash
supabase functions logs send-submission-email
```

Causas típicas: `RESEND_API_KEY` mal copiada, o el usuario con el que iniciaste sesión no tiene rol `admin`/`editor` en la tabla `profiles`.

---

## Checklist final de ambos complementos

- [ ] Bucket `submissions` creado en Supabase Storage con sus 3 políticas
- [ ] Formulario de `/convocatoria` sube archivos correctamente (probado)
- [ ] Cuenta de Resend creada, `RESEND_API_KEY` configurada como secreto
- [ ] `EDITOR_EMAIL` = `congreso.ingenieria@usta.edu.co`
- [ ] `FROM_EMAIL` = `onboarding@resend.dev` (o dominio propio si ya está verificado)
- [ ] Función `send-submission-email` desplegada
- [ ] Botón "Reenviar al editor" probado de punta a punta, correo recibido

---

## Recordatorio: variables de entorno en Netlify

Los pasos de arriba configuran **Supabase** (secretos de servidor, vía CLI). Eso es independiente de las variables de entorno del **sitio en Netlify** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_EVENT_DATE`, `VITE_SUMMA_REGISTRATION_URL`), que ya deberían estar configuradas según la Parte 5 de `DEPLOY_GUIDE.md`. No hace falta agregar nada nuevo ahí para estos dos complementos — `RESEND_API_KEY`, `EDITOR_EMAIL` y `FROM_EMAIL` viven únicamente del lado de Supabase, nunca en Netlify ni en el `.env` del frontend.
