# Paso a paso desde terminal: montar el proyecto y subirlo a GitHub

Esta guía asume que ya tienes `conectoma-platform.zip` descargado (por ejemplo, en `~/Downloads`) y que tu repositorio público en GitHub es `https://github.com/leoyepesa/conectoma-platform`.

---

## 1. Clonar tu repositorio actual

Abre una terminal y ejecuta:

```bash
cd ~/Documents        # o la carpeta donde quieras trabajar
git clone https://github.com/leoyepesa/conectoma-platform.git
cd conectoma-platform
```

Esto crea la carpeta `~/Documents/conectoma-platform` con lo que ya existe en tu repo (incluyendo, si no lo has borrado aún, el archivo `token_github`).

---

## 2. ⚠️ Eliminar el token expuesto (antes de todo lo demás)

```bash
git rm token_github
```

Si el token era una credencial real y válida, no basta con borrarlo aquí — sigue visible en el historial de git. Para purgarlo del historial completo:

```bash
pip install git-filter-repo --break-system-packages   # si no lo tienes instalado
git filter-repo --path token_github --invert-paths
git push origin --force --all
```

Y sobre todo: **revócalo desde GitHub** → Settings → Developer settings → Personal access tokens, sin importar si haces el filter-repo o no.

---

## 3. Descomprimir el proyecto que te generé encima del repo

```bash
cd ~/Documents/conectoma-platform
unzip ~/Downloads/conectoma-platform.zip -d /tmp/conectoma-nuevo
```

Esto deja el proyecto nuevo en `/tmp/conectoma-nuevo/conectoma-platform`. Cópialo por encima de tu repo:

```bash
cp -r /tmp/conectoma-nuevo/conectoma-platform/. ~/Documents/conectoma-platform/
```

El flag `-r` copia carpetas completas y el `.` al final de la ruta de origen asegura que se copie también el contenido oculto (`.gitignore`, `.env.example`).

Verifica que quedó todo en su lugar:

```bash
ls -la
```

Deberías ver, entre otros: `src/`, `public/`, `supabase/`, `package.json`, `netlify.toml`, `README.md`, `DEPLOY_GUIDE.md`, `.gitignore`, `.env.example`.

---

## 4. Instalar dependencias y crear tu `.env` local

```bash
npm install
cp .env.example .env
```

Abre `.env` con tu editor y completa las credenciales reales de Supabase (las obtienes siguiendo la Parte 2 de `DEPLOY_GUIDE.md`):

```bash
nano .env      # o: code .env / vim .env
```

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-llave-anonima-publica
VITE_EVENT_DATE=2026-10-21T08:00:00-05:00
VITE_SUMMA_REGISTRATION_URL=https://summa.usantotomas.edu.co/tu-enlace-real
```

Guarda y cierra.

---

## 5. Probar en local antes de subir nada

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador y revisa que todo cargue bien. Detén el servidor con `Ctrl + C` cuando termines de probar.

---

## 6. Confirmar que `.env` no se subirá

```bash
git status
```

`.env` **no debe aparecer** en la lista de archivos a subir (está protegido por `.gitignore`, que ya viene incluido en el proyecto). Si por error aparece, revisa que el archivo `.gitignore` esté presente en la raíz del proyecto.

---

## 7. Subir los cambios a GitHub

```bash
git add .
git commit -m "Plataforma completa CONECTOMA IngenIA 2026: agenda, speakers, sponsors, noticias, convocatoria y panel admin"
git push origin main
```

Si tu rama principal se llama `master` en vez de `main`, usa:

```bash
git push origin master
```

---

## 8. Verificar en GitHub

Entra a `https://github.com/leoyepesa/conectoma-platform` y confirma que:

- [ ] Los nuevos archivos aparecen (carpeta `src/`, `supabase/schema.sql`, etc.)
- [ ] `token_github` **ya no existe** en el repo
- [ ] `.env` **no aparece** en ningún commit

---

## Resumen de rutas clave

| Qué | Dónde |
|---|---|
| Código fuente de la app | `src/` |
| Páginas públicas | `src/pages/*.tsx` |
| Panel admin | `src/pages/admin/*.tsx` |
| Datos de agenda (respaldo) | `src/data/agenda.ts` |
| Esquema de base de datos | `supabase/schema.sql` |
| Variables de entorno (no se sube) | `.env` |
| Plantilla de variables (sí se sube) | `.env.example` |
| Configuración de Netlify | `netlify.toml` |
| Guía completa de despliegue | `DEPLOY_GUIDE.md` |

---

## Siguiente paso

Una vez el código está en GitHub, continúa con la **Parte 5 (Desplegar en Netlify)** de `DEPLOY_GUIDE.md`: conectas el repo desde Netlify, agregas las variables de entorno ahí también, y cada `git push` futuro despliega automáticamente.
