-- Create diseases table
CREATE TABLE public.diseases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE NOT NULL,
  disease_name TEXT NOT NULL,
  symptoms TEXT NOT NULL,
  causes TEXT,
  prevention TEXT,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "select_diseases" ON public.diseases FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_diseases" ON public.diseases FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "update_diseases" ON public.diseases FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "delete_diseases" ON public.diseases FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Insert diseases data
INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity) VALUES
((SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Early Blight', 
'Dark spots with concentric rings on lower leaves, yellowing, leaf drop. Stem lesions may appear.',
'Fungal infection (Alternaria solani), spread through infected plant debris, warm humid conditions.',
'Remove infected leaves, ensure good air circulation, avoid overhead watering, rotate crops every 2-3 years.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Late Blight', 
'Water-soaked lesions that turn brown, white fungal growth on leaf undersides, fruit rot.',
'Fungal infection (Phytophthora infestans), favored by cool wet weather, spreads rapidly.',
'Use resistant varieties, ensure good drainage, avoid crowding plants, remove infected plants immediately.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Leaf Curl Virus', 
'Upward curling of leaves, yellowing, stunted growth, reduced fruit production.',
'Viral infection transmitted by whiteflies, prevalent in warm climates.',
'Control whitefly population, use virus-free seedlings, remove infected plants, use reflective mulches.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Bacterial Wilt', 
'Sudden wilting, yellowing, brown staining inside stems. Plant dies within days.',
'Bacterial infection (Ralstonia solanacearum), soil-borne, enters through wounds.',
'Use clean tools, avoid soil waterlogging, rotate crops, remove and destroy infected plants.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Late Blight', 
'Water-soaked lesions that turn brown, white fungal growth on leaf undersides, tuber rot.',
'Fungal infection spread from infected tubers, favored by cool wet conditions.',
'Use certified seed potatoes, ensure good drainage, hill soil around plants, harvest in dry weather.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Black Scurf', 
'Dark sclerotia on tuber surface, stem cankers, stunted growth.',
'Fungal infection (Rhizoctonia solani), soil-borne, favored by cool wet soil.',
'Use certified seed potatoes, avoid planting in cold wet soil, rotate crops, improve drainage.',
'medium'),

((SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Common Scab', 
'Rough, corky lesions on tuber surface, reduced quality.',
'Bacterial infection, favored by dry alkaline soil (high pH).',
'Maintain soil moisture during tuber formation, lower soil pH, use resistant varieties.',
'low'),

((SELECT id FROM public.crops WHERE crop_name = 'Chilli'), 'Anthracnose', 
'Sunken lesions on fruits, dark spots with orange spore masses, fruit rot.',
'Fungal infection, spread through rain splash, warm humid conditions.',
'Harvest fruits before fully ripe, remove infected fruits, ensure good drainage, use resistant varieties.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Chilli'), 'Leaf Spot', 
'Small brown spots on leaves, yellowing, leaf drop.',
'Fungal or bacterial infection, spread through rain, overhead irrigation.',
'Remove infected leaves, avoid overhead watering, ensure good air circulation, apply copper fungicides.',
'medium'),

((SELECT id FROM public.crops WHERE crop_name = 'Chilli'), 'Powdery Mildew', 
'White powdery growth on leaves and stems, yellowing, stunted growth.',
'Fungal infection favored by dry conditions with high humidity, poor air circulation.',
'Prune for air circulation, avoid overhead watering, apply sulfur-based fungicides, remove infected leaves.',
'medium'),

((SELECT id FROM public.crops WHERE crop_name = 'Rice'), 'Rice Blast', 
'Spindle-shaped spots with gray centers on leaves, dark lesions on leaf sheaths and panicle necks (Neck Blast).',
'Fungal infection (Magnaporthe oryzae), favored by high humidity, overcast weather, and excessive nitrogen fertilizer.',
'Use resistant varieties, balance nitrogen fertilizer application, treat seeds before planting, avoid water stress.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Rice'), 'Sheath Blight', 
'Oval or irregular grayish-green lesions on leaf sheaths near the waterline, spreading upwards.',
'Fungal infection (Rhizoctonia solani), survives in soil and crop residue, favored by dense planting and high humidity.',
'Maintain proper plant spacing, avoid excessive nitrogen, drain excess water, clear weeds and infected stubble.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Rice'), 'Bacterial Leaf Blight', 
'Water-soaked to yellowish stripes along leaf margins, leaves wilt, turn white or grayish, and dry up.',
'Bacterial infection (Xanthomonas oryzae), enters through natural openings or wounds, spread by wind and rain.',
'Plant resistant rice varieties, avoid over-fertilization, maintain good field drainage, treat seeds before sowing.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Cucumber'), 'Downy Mildew', 
'Yellow angular spots on upper leaf surface, gray fungal growth underneath.',
'Fungal infection favored by cool wet conditions, spreads rapidly.',
'Ensure good air circulation, avoid overhead watering, apply copper-based fungicides, remove infected leaves.',
'high'),

((SELECT id FROM public.crops WHERE crop_name = 'Cucumber'), 'Cucumber Mosaic Virus', 
'Mosaic pattern on leaves, stunted growth, deformed fruits.',
'Viral infection transmitted by aphids, mechanical transmission possible.',
'Control aphids, remove infected plants, avoid working with wet plants, use virus-free seeds.',
'high');