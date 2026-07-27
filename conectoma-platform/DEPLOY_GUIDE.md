# Guía paso a paso: configurar y desplegar CONECTOMA | IngenIA 2026

Esta guía te lleva desde el código hasta la plataforma en línea, con panel administrativo funcionando.

---

## Parte 1 — Preparar el proyecto localmente

1. Instala [Node.js](https://nodejs.org) versión 18 o superior (necesario para Vite).
2. Copia todos los archivos de este proyecto dentro de tu repositorio `conectoma-platform` (reemplazando lo que ya existía en `src/`, o en una carpeta nueva si prefieres revisarlo antes de fusionar).
3. Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   npm install
   ```
4. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
   (En Windows PowerShell: `copy .env.example .env`)

No inicies `npm run dev` todavía — primero necesitas crear tu proyecto en Supabase para tener las credenciales.

---

## Parte 2 — Configurar Supabase (base de datos + autenticación)

### 2.1 Crear el proyecto

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta o inicia sesión.
2. Clic en **New project**.
3. Elige un nombre (ej. `conectoma-ingenia-2026`), una contraseña segura para la base de datos (guárdala), y la región más cercana (ej. `South America (São Paulo)`).
4. Espera 1-2 minutos a que se aprovisione el proyecto.

### 2.2 Ejecutar el esquema de base de datos

1. En el panel izquierdo, ve a **SQL Editor** → **New query**.
2. Abre el archivo `supabase/schema.sql` de este proyecto, copia **todo** su contenido y pégalo en el editor.
3. Clic en **Run**. Esto crea las tablas (`agenda_sessions`, `speakers`, `sponsors`, `news`, `submissions`, `profiles`) y las reglas de seguridad (RLS) que permiten lectura pública pero solo escritura a usuarios con rol de administrador/editor.

### 2.3 Obtener tus credenciales

1. Ve a **Project Settings** (ícono de engranaje) → **API**.
2. Copia el **Project URL** y la llave **anon public**.
3. Pégalas en tu archivo `.env`:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-llave-anonima-publica
   ```

> La llave "anon public" está diseñada para ser expuesta en el frontend — no es secreta. **Nunca** uses la `service_role key` en el código del sitio; esa sí es privada.

### 2.4 Crear tu primer usuario administrador

1. Ve a **Authentication** → **Users** → **Add user** → **Create new user**.
2. Ingresa tu correo y una contraseña. Marca "Auto Confirm User" para no depender del correo de verificación.
3. Ve a **Table Editor** → tabla **profiles**. Busca la fila con tu correo (se crea automáticamente al registrar el usuario).
4. Edita la columna `role` de ese registro y cámbiala de `editor` a `admin`.
5. ¡Listo! Ya puedes iniciar sesión en `/admin` de tu plataforma con ese correo y contraseña.

Para agregar más personas al equipo de administración (por ejemplo, el comité organizador), repite este proceso: crea el usuario en Authentication y ajusta su `role` en `profiles` a `admin` o `editor` según el nivel de acceso que quieras darle.

### 2.5 Cargar el contenido inicial (opcional)

El sitio ya muestra datos de ejemplo tomados de tu agenda (definidos en `src/data/agenda.ts`) mientras las tablas de Supabase estén vacías. Para publicar el contenido real:

- Ve al panel **`/admin`** de tu sitio ya desplegado (o corriendo en local) y carga ahí la información de speakers, sponsors y noticias — es la forma más fácil.
- O bien, inserta filas directamente desde **Table Editor** en Supabase si prefieres cargar varios registros de una vez.

---

## Parte 3 — Probar en local

```bash
npm run dev
```

Abre `http://localhost:5173`. Verifica:
- La página de inicio carga con el conteo regresivo.
- `/agenda` muestra el cronograma de ambos días.
- `/admin/login` te permite iniciar sesión con el usuario admin que creaste.
- Desde `/admin`, puedes agregar/editar una sesión de agenda y verla reflejada en `/agenda`.

Ajusta la fecha real del evento en tu `.env`:
```
VITE_EVENT_DATE=2026-10-21T08:00:00-05:00
```
(Formato ISO 8601, con el offset de Bogotá `-05:00`.)

Y el enlace real de inscripción en SUMMA:
```
VITE_SUMMA_REGISTRATION_URL=https://summa.usta.edu.co/tu-enlace-real
```

---

## Parte 4 — Subir el código a GitHub

```bash
git add .
git commit -m "Plataforma CONECTOMA IngenIA 2026: agenda, speakers, sponsors, noticias, convocatoria y panel admin"
git push origin main
```

> **Importante:** revisa antes de hacer push que tu `.env` NO se suba (debe estar en `.gitignore`, ya incluido en este proyecto). Solo `.env.example` (sin credenciales reales) debe ir al repositorio.

---

## Parte 5 — Desplegar en Netlify

### Opción A: conectar el repositorio (recomendado)

1. Ve a [app.netlify.com](https://app.netlify.com) e inicia sesión (puedes usar tu cuenta de GitHub).
2. Clic en **Add new site** → **Import an existing project**.
3. Elige **GitHub** y autoriza el acceso; selecciona el repositorio `leoyepesa/conectoma-platform`.
4. Netlify detectará automáticamente la configuración gracias al archivo `netlify.toml` incluido:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Antes de desplegar, ve a **Add environment variables** y agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_EVENT_DATE`
   - `VITE_SUMMA_REGISTRATION_URL`
6. Clic en **Deploy site**. En 1-2 minutos tu sitio estará en línea en una URL tipo `https://nombre-aleatorio.netlify.app`.

### Opción B: subir el build manualmente

```bash
npm run build
```
Esto genera la carpeta `dist/`. En Netlify, puedes arrastrar esa carpeta directamente en **Sites** → **Add new site** → **Deploy manually**. (Menos recomendable porque no se actualiza automáticamente con cada cambio.)

### 5.1 Configurar tu dominio

- En **Site settings** → **Domain management**, puedes cambiar el subdominio gratuito de Netlify (ej. `conectoma-ingenia2026.netlify.app`) o conectar un dominio propio de la universidad si lo tienes disponible (ej. `ingenia.usta.edu.co`, requiere configurar DNS).

### 5.2 Despliegues automáticos

Con la Opción A, cada vez que hagas `git push` a la rama `main`, Netlify reconstruye y publica el sitio automáticamente. Así, actualizaciones de código (no de contenido, eso se hace desde `/admin`) quedan en línea en minutos.

---

## Parte 6 — Roles y edición de contenido en producción

Una vez desplegado, cualquier persona con rol `admin` o `editor` en la tabla `profiles` de Supabase puede:

1. Entrar a `https://tu-sitio.netlify.app/admin/login`.
2. Iniciar sesión con su correo/contraseña.
3. Editar agenda, speakers, sponsors, noticias, y revisar/actualizar el estado de los artículos y pósters recibidos — todo sin tocar una línea de código ni volver a desplegar.

Roles disponibles (columna `role` en `profiles`):
- **admin**: acceso completo (equivalente a editor, pensado para el organizador principal).
- **editor**: puede crear, editar y borrar contenido en todas las secciones administrables.
- **viewer**: solo lectura (útil si en el futuro quieres dar acceso de consulta sin edición — puedes ajustar las políticas RLS en `schema.sql` si necesitas diferenciar permisos de "viewer" más adelante).

---

## Checklist final antes de compartir el sitio

- [ ] `.env` con credenciales reales configurado en Netlify (no en el repo).
- [ ] `VITE_EVENT_DATE` con la fecha real del congreso.
- [ ] `VITE_SUMMA_REGISTRATION_URL` con el enlace real de inscripción.
- [ ] Al menos un usuario con `role = admin` creado y probado.
- [ ] Agenda, speakers y sponsors cargados desde `/admin`.
- [ ] Archivo `token_github` eliminado del repositorio (ver nota de seguridad en el README).
- [ ] Probado en móvil (el diseño es responsive, pero vale la pena revisar).
