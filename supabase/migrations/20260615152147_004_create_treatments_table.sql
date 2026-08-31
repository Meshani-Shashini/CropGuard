-- Create treatments table
CREATE TABLE public.treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disease_id UUID REFERENCES public.diseases(id) ON DELETE CASCADE NOT NULL,
  organic_treatment TEXT,
  chemical_treatment TEXT,
  dosage TEXT,
  application_method TEXT,
  sri_lankan_availability TEXT,
  precautions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "select_treatments" ON public.treatments FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_treatments" ON public.treatments FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "update_treatments" ON public.treatments FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "delete_treatments" ON public.treatments FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));