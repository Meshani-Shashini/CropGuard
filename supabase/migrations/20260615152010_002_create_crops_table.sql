-- Create crops table
CREATE TABLE public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  growing_guide TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;

-- RLS Policies (crops are public read, admin write)
CREATE POLICY "select_crops" ON public.crops FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_crops" ON public.crops FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "update_crops" ON public.crops FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "delete_crops" ON public.crops FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Insert default crops for Sri Lanka
INSERT INTO public.crops (crop_name, description, growing_guide) VALUES
('Tomato', 'One of the most popular vegetables in Sri Lanka, used in many dishes.', 
'Plant in well-drained soil, requires 6-8 hours of sunlight. 
Water regularly but avoid waterlogging. Stake plants for support.'),

('Potato', 'A staple food crop grown in upcountry areas of Sri Lanka.', 
'Plant in cool climates, well-drained loose soil. Hill up soil around stems as they grow. 
Harvest when foliage dies back.'),

('Chilli', 'Essential spice in Sri Lankan cuisine, grown across the country.', 
'Needs warm climate and well-drained soil. Water moderately. Protect from excessive rain.
 Harvest when red and fully mature.'),

('Rice', 'The primary staple food and most important agricultural crop in Sri Lanka.', 
'Requires tropical climate, abundant water, and fertile clay soil. Maintain water levels in paddy fields during growth. 
Harvest when grains turn golden-yellow.'),

('Cucumber', 'Refreshing vegetable grown in home gardens across Sri Lanka.', 
'Needs support for climbing, regular watering. Plant in well-drained soil with compost. 
Harvest when young and tender.');