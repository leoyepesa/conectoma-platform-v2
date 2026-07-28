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
