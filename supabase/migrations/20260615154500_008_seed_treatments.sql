-- Seed treatment data matching official DOA Sri Lanka guidelines
INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions) VALUES

-- 1. Tomato - Early Blight
((SELECT id FROM public.diseases WHERE disease_name = 'Early Blight' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
 'Remove and burn infected lower leaves immediately. Spray Neem Seed Kernel Extract (NSKE 5%) or copper oxychloride. Ensure crop rotation with non-solanaceous crops.',
 'Apply protective or systemic fungicides such as Mancozeb, Chlorothalonil, or Azoxystrobin.',
 'Mancozeb: 20-30g in 10L water; Chlorothalonil: 20g in 10L water.',
 'Spray thoroughly on all foliage at 7-10 day intervals upon first appearance of symptoms.',
 'Available at local agro-chemical shops islandwide. Common brands include Dithane M-45 (Lankem), Bravo (Hayleys), and CIC Mancozeb.',
 'Wear gloves and a protective mask during spraying. Observe a pre-harvest interval (PHI) of 7-14 days. Avoid spraying during heavy winds.'),

-- 2. Tomato - Late Blight
((SELECT id FROM public.diseases WHERE disease_name = 'Late Blight' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
 'Ensure wide plant spacing for air circulation. Avoid overhead watering to reduce foliage wetness. Spray copper-based organic formulations on lower leaves.',
 'Apply systemic combination fungicides like Metalaxyl-M + Mancozeb, Propineb, or Cymoxanil + Mancozeb.',
 'Ridomil Gold (Metalaxyl + Mancozeb): 25g in 10L water; Antracol (Propineb): 20g in 10L water.',
 'Spray immediately upon first symptom detection or when weather is cool and highly humid. Repeat at 7-day intervals in wet periods.',
 'Widely available in Sri Lankan agricultural stores. Common brands: Ridomil Gold (CIC), Antracol (Hayleys/Bayer), Lankem Mancozeb.',
 'Highly toxic to aquatic life. Observe strict 14-day pre-harvest interval (PHI) for chemical options.'),

-- 3. Tomato - Leaf Curl Virus
((SELECT id FROM public.diseases WHERE disease_name = 'Leaf Curl Virus' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
 'Use yellow sticky traps (10-15 traps per acre) to trap whitefly vectors. Spray neem oil (15ml per liter of water). Eradicate and burn infected plants immediately.',
 'Control the whitefly insect vector using systemic insecticides like Imidacloprid, Acetamiprid, or Thiamethoxam.',
 'Imidacloprid: 5ml in 10L water; Acetamiprid: 5g in 10L water.',
 'Spray early in the morning or late evening targeting the undersides of the leaves where whiteflies gather.',
 'Readily available at local dealers. Brands include Admire (Bayer/Hayleys), Mospilan (Lankem), and Actara (CIC).',
 'Highly toxic to bees; avoid spraying during active flowering hours. Wear appropriate personal protective equipment.'),

-- 4. Tomato - Bacterial Wilt
((SELECT id FROM public.diseases WHERE disease_name = 'Bacterial Wilt' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
 'Use wild brinjal (Solanum torvum) rootstock for grafting. Soil solarization using clear polythene sheets. Practice crop rotation with paddy or maize. Apply Trichoderma-enriched compost.',
 'No effective chemical cure exists. Soil drenching with copper fungicides around healthy plants in infected fields can slow disease spread.',
 'Copper Oxychloride: 30g in 10L water.',
 'Drench the soil root zone of neighboring healthy plants. Do not spray on leaves.',
 'Copper Oxychloride is widely available. Brands: Hayleys Copper, Lankem Copper, CIC Copper Oxychloride.',
 'Ensure pruning tools are sanitized with alcohol between plants to avoid mechanical transmission.'),

-- 5. Potato - Late Blight
((SELECT id FROM public.diseases WHERE disease_name = 'Late Blight' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
 'Plant certified disease-free seed tubers. Improve soil drainage and hill up soil around plant bases. Destroy volunteer potato plants in adjacent areas.',
 'Spray preventative and curative fungicides like Mancozeb, Ridomil Gold, or Fluazinam.',
 'Ridomil Gold: 25g in 10L water; Mancozeb: 30g in 10L water.',
 'Apply preventatively when weather becomes humid and cool (common in Nuwara Eliya and Badulla districts), repeating every 7-10 days.',
 'Extremely common in upcountry agro-dealers. Distributed by CIC, Lankem, Hayleys Agriculture, and Harrisons.',
 'Keep livestock away from treated fields. Do not exceed recommended concentrations.'),

-- 6. Potato - Black Scurf
((SELECT id FROM public.diseases WHERE disease_name = 'Black Scurf' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
 'Rotate crops with green manures or mustard. Plant seed tubers in warm soils at shallow depths to promote fast emergence. Avoid harvesting in wet soils.',
 'Treat seed tubers with fungicides containing Pencycuron or Fludioxonil prior to planting.',
 'Monceren (Pencycuron): 1.5-2ml per liter of water for seed tuber dip.',
 'Dip seed tubers in the solution or spray them evenly on a clean tarp and allow to dry before planting.',
 'Available in potato growing regions (Nuwara Eliya, Welimada). Main distributor: CIC (Monceren).',
 'Do not use treated seed tubers for consumption or animal feed. Wear rubber gloves during handling.'),

-- 7. Potato - Common Scab
((SELECT id FROM public.diseases WHERE disease_name = 'Common Scab' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
 'Maintain high soil moisture during tuber initiation (first 4-6 weeks of growth). Incorporate sulfur to lower soil pH below 5.5. Avoid using fresh poultry manure.',
 'Treat seed tubers with Mancozeb before planting to reduce seed-borne inoculum.',
 'Mancozeb: 30g in 10L water for tuber wash.',
 'Wash tubers or dip them in fungicide solution before planting.',
 'Available islandwide via CIC, Lankem, and Hayleys Agriculture.',
 'Dispose of wash water safely, far from natural water resources.'),

-- 8. Chilli - Anthracnose
((SELECT id FROM public.diseases WHERE disease_name = 'Anthracnose' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')),
 'Use pathogen-free seeds. Collect and destroy infected fruits and crop debris. Ensure proper crop spacing and field drainage. Spray neem seed extract (NSKE 5%).',
 'Spray systemic and contact fungicides like Tebuconazole + Trifloxystrobin, Carbendazim, or Mancozeb.',
 'Nativo (Tebuconazole + Trifloxystrobin): 4g in 10L water; Mancozeb: 25g in 10L water.',
 'Spray at 10-14 day intervals starting from the onset of flowering and fruit set.',
 'Available at agro-chemical stores. Popular brands: Nativo (Bayer/Hayleys), Lankem Carbendazim, Dithane M-45.',
 'Observe a pre-harvest interval (PHI) of 7 days. Avoid chemical application during peak heat.'),

-- 9. Chilli - Leaf Spot
((SELECT id FROM public.diseases WHERE disease_name = 'Leaf Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')),
 'Practice crop rotation. Remove weeds and wild solanaceous hosts. Avoid overhead sprinkler irrigation. Spray copper hydroxide at early stages.',
 'For fungal spot: Mancozeb or Chlorothalonil. For bacterial leaf spot: Copper hydroxide mixed with Kasugamycin.',
 'Mancozeb: 25g in 10L water; Copper Hydroxide: 20g in 10L water.',
 'Apply immediately when leaf spots are first observed, repeating in 10 days if rainy weather persists.',
 'Available at agrochemical shops. Common brands: Kocide (DuPont/CIC), Dithane M-45, Bravo.',
 'Do not spray copper fungicides during hot noon hours to prevent phytotoxicity (leaf scorch).'),

-- 10. Chilli - Powdery Mildew
((SELECT id FROM public.diseases WHERE disease_name = 'Powdery Mildew' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')),
 'Ensure good airflow through pruning. Spray organic sulfur formulations or neem oil. Remove and destroy lower infected leaves.',
 'Apply Wettable Sulfur, Hexaconazole, or Triadimefon.',
 'Wettable Sulfur: 30-40g in 10L water; Hexaconazole: 10-15ml in 10L water.',
 'Spray thoroughly on both upper and lower leaf surfaces at first sign of white powdery spots.',
 'Available islandwide. Common brands: Sulcox (Lankem), Eraze (Hayleys), Shavit (CIC).',
 'Do not apply sulfur during temperatures exceeding 32 degrees C as it may cause leaf burn.'),

-- 11. Rice - Rice Blast
((SELECT id FROM public.diseases WHERE disease_name = 'Rice Blast' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')),
 'Soak seeds in hot water (52-54 degrees C) for 15 minutes prior to planting. Avoid excessive nitrogen fertilizer. Burn infected stubble after harvest. Treat seeds with Trichoderma bio-fungicides.',
 'Apply systemic fungicides like Tricyclazole, Isoprothiolane, or Tebuconazole + Trifloxystrobin.',
 'Tricyclazole 75% WP: 6g in 10L water; Isoprothiolane 40% EC: 15ml in 10L water.',
 'Foliar spray when leaf blast lesions appear, or at late booting stage to prevent neck blast.',
 'Widely available in paddy-growing regions (Polonnaruwa, Anuradhapura, Ampara, Kurunegala). Brands: Beam (Hayleys/Dow), Fuji-one (CIC), Nativo (Bayer).',
 'Do not drain water from the paddy field immediately after application. Avoid over-application of nitrogenous fertilizers.'),

-- 12. Rice - Sheath Blight
((SELECT id FROM public.diseases WHERE disease_name = 'Sheath Blight' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')),
 'Maintain wider plant spacing to reduce microclimate humidity. Remove weeds along paddy bunds. Apply neem cake to paddy soil during land preparation.',
 'Apply target fungicides such as Validamycin, Hexaconazole, or Azoxystrobin + Difenoconazole.',
 'Validamycin 3% L: 20ml in 10L water; Hexaconazole 5% EC: 10-15ml in 10L water.',
 'Direct spray toward the lower leaf sheaths near the water level upon initial detection.',
 'Readily available across all rice farming districts. Brands: Sheathmar (CIC), Eraze (Hayleys), Amistar Top (Syngenta).',
 'Drain excess standing water slightly before chemical application to ensure spray reaches the plant base.'),

-- 13. Rice - Bacterial Leaf Blight
((SELECT id FROM public.diseases WHERE disease_name = 'Bacterial Leaf Blight' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')),
 'Use resistant rice varieties recommended by DOA (e.g., Bg 352, Bg 300). Avoid field flooding from infected neighboring fields. Apply balanced fertilizers (NPK) with adequate Potassium.',
 'No effective curative chemical exists. Preventative seed treatment with Copper Hydroxide or Kasugamycin can reduce seed-borne bacteria.',
 'Copper Hydroxide: 20g in 10L water for seed soaking or early field spray.',
 'Soak seeds in solution for 12 hours before nursery sowing, or spray affected patches in early stage.',
 'Available at agrochemical dealers islandwide. Brands: Kocide (CIC), Kasumin (Hayleys).',
 'Avoid clipping seedling tips during transplanting as wounds facilitate bacterial entry.'),

-- 14. Cucumber - Downy Mildew
((SELECT id FROM public.diseases WHERE disease_name = 'Downy Mildew' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Cucumber')),
 'Provide trellis support to elevate vines and improve ventilation. Keep plant spacing wide. Avoid overhead watering. Spray copper oxychloride.',
 'Apply systemic combination fungicides like Metalaxyl + Mancozeb, or Propamocarb Hydrochloride.',
 'Ridomil Gold (Metalaxyl + Mancozeb): 25g in 10L water.',
 'Apply weekly during cool, wet, and cloudy conditions when downy mildew spreads rapidly.',
 'Available at all agricultural stores. Brands: Ridomil Gold (CIC), Lankem Mancozeb.',
 'Observe a pre-harvest interval (PHI) of 7 days before picking cucumbers.'),

-- 15. Cucumber - Cucumber Mosaic Virus
((SELECT id FROM public.diseases WHERE disease_name = 'Cucumber Mosaic Virus' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Cucumber')),
 'Control aphid vectors using yellow sticky traps and neem oil. Eradicate and burn infected vines. Keep field borders clear of wild weed hosts.',
 'Control aphid populations using contact or systemic insecticides like Acetamiprid or Imidacloprid.',
 'Acetamiprid: 5g in 10L water; Imidacloprid: 5ml in 10L water.',
 'Spray target aphid colonies under leaves. Apply in the late evening to protect pollinating bees.',
 'Available at local agrochemical stores. Brands: Mospilan (Lankem), Admire (Hayleys), Actara (CIC).',
 'Cucumber plants depend heavily on bees for pollination. Avoid spraying chemicals during flowering daytime hours.');