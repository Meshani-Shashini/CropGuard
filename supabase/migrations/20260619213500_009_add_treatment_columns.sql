-- Add sinhala_treatment and english_treatment columns to detections table
ALTER TABLE public.detections 
ADD COLUMN sinhala_treatment TEXT,
ADD COLUMN english_treatment TEXT;
