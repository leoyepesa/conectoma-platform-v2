# Actualización: carga de archivos local en Convocatoria

Antes, el formulario de artículos/pósters pedía un **enlace** (Drive, OneDrive). Ahora permite **adjuntar el archivo directamente desde el computador** — se sube a Supabase Storage y el enlace público se guarda solo automáticamente en `file_url`.

## Si ya tenías Supabase configurado

No hace falta repetir todo `supabase/schema.sql`. Solo corre este fragmento nuevo (está al final del archivo actualizado):

**Dashboard web:** SQL Editor → New query → pega esto → Run:

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

**O por CLI**, siguiendo el patrón de `SUPABASE_CLI_SETUP.md`:

```bash
supabase migration new storage_submissions_bucket
# pega el SQL de arriba dentro del archivo generado
supabase db push
```

## Qué cambia para quien postula

- El campo "Enlace al documento" desaparece.
- Aparece un botón de carga: "Haz clic para elegir un archivo desde tu computador".
- Acepta PDF, DOC, DOCX, PPT, PPTX — máximo 15 MB.
- El nombre del archivo elegido se muestra con opción de quitarlo antes de enviar.

## Qué cambia para ti en `/admin/submissions`

El campo `file_url` ahora se llena solo con la URL pública del archivo subido a Supabase Storage (ya no es editable manualmente como enlace externo, pero sigue siendo un campo de texto visible/copiable en el panel admin).

## Ajustar el límite de tamaño (opcional)

Si 15 MB se queda corto (por ejemplo, para pósters con imágenes de alta resolución), cambia dos lugares:

1. En `src/components/submissions/SubmissionForm.tsx`, la constante `MAX_FILE_MB`.
2. En el SQL de arriba, el valor `file_size_limit` (en bytes; 15728640 = 15 MB).
