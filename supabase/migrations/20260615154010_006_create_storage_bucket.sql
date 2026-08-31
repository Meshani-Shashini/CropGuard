-- Create storage bucket for detection images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'detection-images',
  'detection-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policy for uploads
CREATE POLICY "Anyone can upload detection images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'detection-images');

-- Create storage policy for viewing
CREATE POLICY "Anyone can view detection images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'detection-images');

-- Create storage policy for deleting own images
CREATE POLICY "Users can delete own detection images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'detection-images' AND auth.uid()::text = (storage.foldername(name))[1]);