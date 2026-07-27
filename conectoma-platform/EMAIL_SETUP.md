# Configurar el reenvío de postulaciones al editor en jefe

Nueva función en `/admin/submissions`: cada propuesta tiene un botón **"Reenviar al editor"** que envía por correo todo el detalle del artículo/póster al editor en jefe del congreso.

Esto requiere una función de servidor (Supabase Edge Function) y una cuenta de correo transaccional (usamos [Resend](https://resend.com), gratis hasta 100 correos/día — suficiente para este caso de uso).

---

## 1. Crear cuenta en Resend y obtener tu API key

1. Ve a [resend.com](https://resend.com) → crea una cuenta gratuita.
2. Ve a **API Keys** → **Create API Key** → dale un nombre (ej. `ingenia-2026`) → copia la key (empieza con `re_...`).
3. (Opcional pero recomendado) Ve a **Domains** → agrega y verifica el dominio de la universidad (ej. `usta.edu.co`) para poder enviar desde una dirección propia en vez de la de pruebas de Resend. Si no verificas dominio todavía, puedes usar el remitente de pruebas `onboarding@resend.dev` mientras tanto (con límites).

---

## 2. Configurar las variables secretas en Supabase

Desde la terminal, en la carpeta de tu proyecto (requiere tener el CLI ya vinculado — ver `SUPABASE_CLI_SETUP.md`):

```bash
supabase secrets set RESEND_API_KEY=re_TU_API_KEY_AQUI
supabase secrets set EDITOR_EMAIL=congreso.ingenieria@usta.edu.co
supabase secrets set FROM_EMAIL=onboarding@resend.dev
```

Usamos `onboarding@resend.dev` como remitente por ahora (es el remitente de pruebas de Resend, no requiere verificar dominio). Cuando la universidad verifique el dominio `usta.edu.co` en Resend, puedes cambiarlo a un correo propio:

```bash
supabase secrets set FROM_EMAIL=no-reply@usta.edu.co
```

Verifica que quedaron guardadas:

```bash
supabase secrets list
```

---

## 3. Desplegar la función

El código ya está incluido en `supabase/functions/send-submission-email/index.ts`. Despliégala:

```bash
supabase functions deploy send-submission-email
```

Esto la publica en:
```
https://TU_PROJECT_REF.supabase.co/functions/v1/send-submission-email
```

No necesitas usar esa URL directamente — el botón del panel admin ya la invoca automáticamente con `supabase.functions.invoke(...)`.

---

## 4. Probar

1. Entra a `/admin/submissions` en tu sitio (local o desplegado).
2. Debe haber al menos una postulación (real, o crea una de prueba desde `/convocatoria`).
3. Clic en **"Reenviar al editor"**.
4. Revisa la bandeja del correo que configuraste en `EDITOR_EMAIL` (y la carpeta de spam la primera vez).

Si ves el botón cambiar a **"Error, reintentar"**, revisa los logs de la función:

```bash
supabase functions logs send-submission-email
```

Las causas más comunes: `RESEND_API_KEY` mal copiada, `FROM_EMAIL` no verificado en Resend, o el usuario que hizo clic no tiene rol `admin`/`editor` en la tabla `profiles`.

---

## Cómo funciona por dentro (para referencia)

1. El botón llama a la función Edge con el `submissionId`.
2. La función verifica que quien llama esté autenticado y tenga rol `admin` o `editor` (usa la `service_role` key internamente — nunca expuesta al navegador).
3. Busca la postulación completa en la base de datos.
4. Arma un correo HTML con todos los campos (tipo, título, autores, facultad, línea, resumen, enlace al documento, contacto, estado).
5. Lo envía vía la API de Resend al correo configurado en `EDITOR_EMAIL`.

## Cambiar el correo del editor en jefe más adelante

Solo necesitas actualizar el secreto, sin volver a desplegar código:

```bash
supabase secrets set EDITOR_EMAIL=congreso.ingenieria@usta.edu.co
```
