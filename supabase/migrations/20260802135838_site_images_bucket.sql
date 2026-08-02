insert into storage.buckets (id, name, public, file_size_limit)
values ('site-images', 'site-images', true, 5242880) -- 5 MB
on conflict (id) do nothing;

create policy "site_images_editor_upload"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and public.is_editor());

create policy "site_images_public_read"
  on storage.objects for select
  using (bucket_id = 'site-images');

create policy "site_images_editor_delete"
  on storage.objects for delete
  using (bucket_id = 'site-images' and public.is_editor());
