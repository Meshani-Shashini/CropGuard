-- Create detections table
CREATE TABLE public.detections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  crop_name TEXT NOT NULL,
  disease_id UUID REFERENCES public.diseases(id) ON DELETE SET NULL,
  disease_name TEXT NOT NULL,
  confidence DECIMAL(5,2) NOT NULL,
  severity TEXT DEFAULT 'medium',
  image_url TEXT,
  notes TEXT,
  scan_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.detections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "select_own_detections" ON public.detections FOR SELECT
  TO authenticated USING (auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "insert_own_detections" ON public.detections FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own_detections" ON public.detections FOR UPDATE
  TO authenticated USING (auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "delete_own_detections" ON public.detections FOR DELETE
  TO authenticated USING (auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Indexes for common queries
CREATE INDEX idx_detections_user_id ON public.detections(user_id);
CREATE INDEX idx_detections_disease_id ON public.detections(disease_id);
CREATE INDEX idx_detections_scan_date ON public.detections(scan_date DESC);