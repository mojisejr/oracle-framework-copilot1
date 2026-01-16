---
project: ninlanee
issue: #none
tags: [supabase, storage, rls, fix]
date: 2026-01-16
agent: oracle-keeper
---

# Snapshot: Fixing Supabase Storage RLS Policy for Image Uploads

**Time**: 2026-01-16 14:35
**Context**: Investigating and providing a fix for the `new row violates row-level security policy` error (403 Forbidden) encountered when uploading chicken images to the `chickens` bucket.

## Insight

1.  **Problem Diagnostic**:
    -   The error occurs because Supabase Storage buckets, even when set to **Public**, only allow **READ** access by default.
    -   **INSERT** (upload) and **SELECT** (viewing list) operations require explicit Row Level Security (RLS) policies on the `storage.objects` table.
    -   The client-side `anon` key used in `lib/storage.ts` does not have permission to write to the bucket without these policies.

2.  **The Fix (SQL Solution)**:
    -   Executing the following SQL in the Supabase Dashboard SQL Editor grants the necessary permissions to the `public` role for the specific bucket.
    -   **Grant Upload**:
        ```sql
        CREATE POLICY "Enable upload for all" ON storage.objects 
        FOR INSERT TO public 
        WITH CHECK (bucket_id = 'chickens');
        ```
    -   **Grant View**:
        ```sql
        CREATE POLICY "Enable read for all" ON storage.objects 
        FOR SELECT TO public 
        USING (bucket_id = 'chickens');
        ```

3.  **Future Hardening**:
    -   For production, it is recommended to restrict uploads to `authenticated` users only.
    -   Alternatively, use the `SERVICE_ROLE_KEY` in Server Actions to bypass RLS entirely since ownership is already validated at the application layer.

## Apply When

- Encountering `StorageApiError: new row violates row-level security policy` during file upload.
- Setting up new storage buckets in Supabase.

## Tags
`supabase` `storage-error` `rls-policy` `fix-applied`
