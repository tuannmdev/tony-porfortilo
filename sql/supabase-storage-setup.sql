-- ============================================================================
-- Supabase Storage Setup for Portfolio Project
-- ============================================================================
-- This file contains SQL commands to create storage buckets and configure
-- Row Level Security (RLS) policies for file uploads in the admin panel.
--
-- BUCKETS:
-- 1. projects - For project cover images and gallery images
-- 2. avatars - For profile avatar images
-- 3. company-logos - For company logos in experience section
--
-- Run this in your Supabase SQL Editor after setting up the main database schema.
-- ============================================================================

-- ============================================================================
-- 1. CREATE STORAGE BUCKETS
-- ============================================================================

-- Create bucket for project images (covers and galleries)
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for profile avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for company logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-logos', 'company-logos', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. STORAGE POLICIES - Projects Bucket
-- ============================================================================

-- Allow public read access to project images
CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

-- Allow authenticated admin users to upload project images
CREATE POLICY "Admin can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'projects'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- Allow authenticated admin users to update project images
CREATE POLICY "Admin can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'projects'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
)
WITH CHECK (
  bucket_id = 'projects'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- Allow authenticated admin users to delete project images
CREATE POLICY "Admin can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'projects'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- ============================================================================
-- 3. STORAGE POLICIES - Avatars Bucket
-- ============================================================================

-- Allow public read access to avatars
CREATE POLICY "Public read access for avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated admin users to upload avatars
CREATE POLICY "Admin can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- Allow authenticated admin users to update avatars
CREATE POLICY "Admin can update avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
)
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- Allow authenticated admin users to delete avatars
CREATE POLICY "Admin can delete avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- ============================================================================
-- 4. STORAGE POLICIES - Company Logos Bucket
-- ============================================================================

-- Allow public read access to company logos
CREATE POLICY "Public read access for company logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-logos');

-- Allow authenticated admin users to upload company logos
CREATE POLICY "Admin can upload company logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'company-logos'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- Allow authenticated admin users to update company logos
CREATE POLICY "Admin can update company logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'company-logos'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
)
WITH CHECK (
  bucket_id = 'company-logos'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- Allow authenticated admin users to delete company logos
CREATE POLICY "Admin can delete company logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'company-logos'
  AND auth.role() = 'authenticated'
  AND auth.email() = (SELECT email FROM profile LIMIT 1)
);

-- ============================================================================
-- 5. VERIFY SETUP
-- ============================================================================

-- Check that all buckets were created
SELECT id, name, public, created_at
FROM storage.buckets
WHERE id IN ('projects', 'avatars', 'company-logos');

-- Check that policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
ORDER BY policyname;

-- ============================================================================
-- NOTES
-- ============================================================================
--
-- 1. All buckets are public (public: true) so images can be accessed via URL
-- 2. RLS policies restrict uploads/updates/deletes to admin users only
-- 3. Admin user is identified by matching auth.email() with profile.email
-- 4. File organization:
--    - projects/covers/ - Project cover images
--    - projects/gallery/ - Project gallery images
--    - avatars/ - Profile avatar images
--    - company-logos/ - Company logos for experience section
--
-- 5. File naming convention (handled by FileUpload component):
--    {timestamp}-{random}.{extension}
--    Example: 1704067200000-abc123.jpg
--
-- 6. Max file size is controlled in the frontend (default 5MB)
--
-- 7. To increase storage limits, upgrade your Supabase plan or configure
--    file size limits in the Supabase dashboard under Storage settings
--
-- ============================================================================
