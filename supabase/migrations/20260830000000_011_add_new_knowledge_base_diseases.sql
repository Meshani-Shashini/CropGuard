-- Add new crop disease entries for the knowledge base with local Sri Lankan treatment guidance

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Chilli'), 'Chilli Whitefly',
       'Leaf yellowing, sticky honeydew on leaves, stunted growth, poor flowering, and sooty mould on foliage.',
       'Whitefly infestation spreads quickly in warm dry conditions and can transmit viral diseases.',
       'Use yellow sticky traps, remove weeds around the field, avoid dense planting, and maintain field sanitation.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')
    AND d.disease_name = 'Chilli Whitefly'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Chilli'), 'Chilli Yellowish',
       'Leaf yellowing, weak plant growth, reduced vigour, pale foliage, and poor fruit development.',
       'Nutrient imbalance, water stress, poor crop management, and sometimes virus transmission by insects.',
       'Use balanced fertiliser, avoid water stress, control insect vectors, and remove severely affected plants.',
       'medium'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')
    AND d.disease_name = 'Chilli Yellowish'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Cucumber'), 'Cucumber Ill Cucumber',
       'Mosaic pattern on leaves, leaf distortion, stunted growth, deformed fruits, and reduced yield.',
       'Usually caused by cucumber mosaic virus and spread by aphids or contaminated tools.',
       'Use virus-free seed, control aphids, remove infected plants, and disinfect tools regularly.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Cucumber')
    AND d.disease_name = 'Cucumber Ill Cucumber'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Potato Bacterial Wilt',
       'Sudden wilting, leaf yellowing, brown discoloration inside the stem, and rapid plant death.',
       'Soil-borne bacterial infection spread by contaminated water, infected seed tubers, and field tools.',
       'Use clean seed potatoes, improve drainage, avoid moving soil from infected areas, and rotate crops.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')
    AND d.disease_name = 'Potato Bacterial Wilt'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Potato Fungi',
       'Leaf spots, stem lesions, reduced foliage, weak growth, and poor tuber quality.',
       'Fungal infection favoured by wet humid conditions, poor airflow, and infected crop residue.',
       'Use healthy seed tubers, avoid dense planting, improve drainage, and maintain open canopies.',
       'medium'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')
    AND d.disease_name = 'Potato Fungi'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Potato Nematode',
       'Root damage, yellowing, poor growth, reduced tuber size, and uneven crop stand.',
       'Soil nematodes feeding on roots and reducing nutrient uptake.',
       'Rotate crops, remove infected plant debris, use resistant varieties, and keep fields free of host weeds.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')
    AND d.disease_name = 'Potato Nematode'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Potato Pest',
       'Leaf feeding, stunted growth, holes in leaves, damaged tubers, and reduced quality.',
       'Insect pests such as cutworms, beetles, aphids, and leaf miners feed on potato foliage and tubers.',
       'Use clean seed tubers, monitor fields regularly, remove weeds, and manage pest outbreaks early.',
       'medium'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')
    AND d.disease_name = 'Potato Pest'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Potato Phytophthora (Late Blight)',
       'Water-soaked lesions, brown patches, white fungal growth on leaf undersides, and rapid spread under wet weather.',
       'Phytophthora infestans infection favoured by cool, humid weather and poor airflow.',
       'Use certified disease-free seed tubers, improve drainage, remove infected vines, and avoid dense canopies.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')
    AND d.disease_name = 'Potato Phytophthora (Late Blight)'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Potato'), 'Potato Virus',
       'Leaf mottling, yellowing, reduced plant vigor, poor tuber size, and distorted leaves.',
       'Virus spread by aphids, infected seed tubers, and contaminated tools.',
       'Use virus-free seed potatoes, control aphids, remove infected plants, and sanitise equipment.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')
    AND d.disease_name = 'Potato Virus'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Tomato Leaf Mold',
       'Yellow spots on upper leaves, grey fungal growth on lower leaves, reduced photosynthesis, and leaf drop.',
       'High humidity, poor airflow, dense planting, and prolonged wet foliage.',
       'Prune plants for airflow, avoid overhead irrigation, and maintain proper crop spacing.',
       'medium'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')
    AND d.disease_name = 'Tomato Leaf Mold'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Tomato Septoria Leaf Spot',
       'Small dark circular lesions with pale centers on lower leaves, yellowing, and leaf drop.',
       'Fungal infection spread by splashing water, infected debris, and poor sanitation.',
       'Remove infected leaves, improve pruning, avoid overhead irrigation, and rotate crops where possible.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')
    AND d.disease_name = 'Tomato Septoria Leaf Spot'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Tomato Target Spot',
       'Circular leaf spots with concentric rings, yellow halos, and reduced fruit quality.',
       'Fungal disease favoured by humidity, rainfall, and poor field spacing.',
       'Rotate crops, remove weed hosts, improve drainage, and maintain good pruning practices.',
       'medium'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')
    AND d.disease_name = 'Tomato Target Spot'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Tomato'), 'Tomato Two-Spotted Spider Mite',
       'Pale speckling on leaves, visible webbing, yellowing, and severe defoliation.',
       'Hot dry weather and poor moisture management create ideal conditions for mite outbreaks.',
       'Maintain irrigation, reduce dust, keep fields weed-free, and monitor regularly.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')
    AND d.disease_name = 'Tomato Two-Spotted Spider Mite'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Rice'), 'Rice Brown Spot',
       'Brown leaf spots, poor tillering, wilting, and reduced grain filling.',
       'Fungal infection associated with poor nutrition, low soil fertility, and moisture stress.',
       'Use healthy seed, maintain balanced fertiliser use, and improve field drainage.',
       'medium'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')
    AND d.disease_name = 'Rice Brown Spot'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Rice'), 'Rice Hispa',
       'Feeding scars and leaf scratches, yellowing, reduced leaf area, and weak growth.',
       'Rice hispa feeding from larvae and adults, often worsened by poor field hygiene.',
       'Keep fields clean, remove weeds, monitor early infestations, and manage pest pressure promptly.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')
    AND d.disease_name = 'Rice Hispa'
);

INSERT INTO public.diseases (crop_id, disease_name, symptoms, causes, prevention, severity)
SELECT (SELECT id FROM public.crops WHERE crop_name = 'Rice'), 'Rice Leaf Blast',
       'Diamond-shaped lesions on leaves, yellowing, reduced leaf function, and poor grain filling.',
       'Fungal disease encouraged by high humidity, excessive nitrogen, and susceptible rice varieties.',
       'Use resistant varieties, avoid over-fertilisation, maintain drainage, and treat seeds before planting.',
       'high'
WHERE NOT EXISTS (
  SELECT 1 FROM public.diseases d
  WHERE d.crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')
    AND d.disease_name = 'Rice Leaf Blast'
);

-- Treatment entries for all newly added diseases
INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Chilli Whitefly' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')),
       'Use neem oil spray (15 ml per 1 litre of water), remove heavily infested leaves, and keep field borders weed-free.',
       'Apply Imidacloprid or Acetamiprid as a foliar spray where infestation is severe.',
       'Imidacloprid: 5 ml per 10 L water; Acetamiprid: 5 g per 10 L water; Neem oil: 15 ml per 1 L water.',
       'Spray early in the morning or late evening, targeting the undersides of leaves where whiteflies gather.',
       'Available in local agro-shops. Common brands: Admire (Hayleys/Bayer), Mospilan (Lankem), Actara (CIC).',
       'Avoid spraying during active flowering hours to protect pollinators. Wear gloves and masks and do not spray in strong wind.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Chilli Whitefly' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Chilli Yellowish' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli')),
       'Apply compost or well-decomposed farmyard manure, avoid excess nitrogen, and use neem-based sprays to reduce insect pressure.',
       'Apply a balanced nutrient programme with foliar micronutrients and control vectors where necessary.',
       'Neem oil: 15 ml per 1 L water; foliar micronutrient mix: follow label instructions.',
       'Apply foliar nutrients and insect control sprays in early morning under calm weather conditions.',
       'Available through local cooperative stores and agro-input shops; neem oil and foliar micronutrient mixes are common products.',
       'Do not over-apply nitrogen. Avoid spraying when bees are active and use protective equipment during mixing.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Chilli Yellowish' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Chilli'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Cucumber Ill Cucumber' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Cucumber')),
       'Use neem oil and yellow sticky traps to reduce aphid populations. Remove infected vines immediately and destroy them.',
       'Apply systemic insecticides such as Acetamiprid or Imidacloprid to control aphid vectors.',
       'Acetamiprid: 5 g per 10 L water; Imidacloprid: 5 ml per 10 L water; Neem oil: 15 ml per 1 L water.',
       'Target aphid colonies on the undersides of leaves. Spray in the late evening to protect pollinators.',
       'Available in agricultural suppliers. Brands include Mospilan (Lankem), Admire (Hayleys), Actara (CIC).',
       'Avoid spraying during peak flowering hours because cucumber depends heavily on bees for pollination.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Cucumber Ill Cucumber' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Cucumber'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Potato Bacterial Wilt' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
       'Use soil solarisation, rotate with non-solanaceous crops, and apply Trichoderma-enriched compost in fields with previous infection.',
       'There is no highly effective chemical cure; soil drenching with copper-based products can slow spread around healthy plants.',
       'Copper Oxychloride: 30 g per 10 L water.',
       'Drench the root zone of neighbouring healthy plants in infected areas; do not spray leaves heavily.',
       'Copper Oxychloride is widely available. Common brands: Hayleys Copper, Lankem Copper, CIC Copper Oxychloride.',
       'Avoid moving soil from infected fields to clean areas. Do not use contaminated seed potatoes and practise strict field hygiene.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Potato Bacterial Wilt' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Potato Fungi' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
       'Remove and destroy infected leaves, improve air circulation, and use copper-based organic sprays on lower foliage.',
       'Use Mancozeb or Chlorothalonil-based fungicides for prevention or control.',
       'Mancozeb: 25-30 g per 10 L water; Chlorothalonil: 20 g per 10 L water.',
       'Spray when symptoms begin and repeat every 7-10 days under humid conditions.',
       'Available in local agro-input shops. Common brands: Dithane M-45 (Lankem), Bravo (Hayleys), CIC Mancozeb.',
       'Wear protective gloves and masks. Observe the recommended pre-harvest interval before harvest.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Potato Fungi' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Potato Nematode' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
       'Rotate with non-host crops and use organic soil amendments while maintaining good soil moisture and avoiding water stress.',
       'Apply soil nematicides only according to local agricultural recommendations and label instructions.',
       'Follow label rates for approved Sri Lankan nematicides; do not exceed recommended dose.',
       'Apply as a soil treatment before planting or during early crop establishment.',
       'Approved nematicides are available through registered agrochemical dealers in Sri Lanka.',
       'Avoid repeated use of the same active ingredient to reduce resistance. Handle with care and follow safety instructions.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Potato Nematode' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Potato Pest' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
       'Use neem oil, pheromone traps, and regular removal of infested plants or damaged foliage.',
       'Apply registered insecticides such as Chlorantraniliprole, Spinosad, or Emamectin Benzoate.',
       'Coragen: 3 ml per 10 L water; Spinosad: 4 ml per 10 L water.',
       'Apply targeted sprays when pest pressure begins to rise, especially to infested foliage and stems.',
       'Available at local agricultural shops. Common brands: Coragen (FMC/CIC), Tracer (Dow/Hayleys).',
       'Rotate insecticide groups to reduce resistance. Keep livestock away from treated fields and follow PHI instructions.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Potato Pest' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Potato Phytophthora (Late Blight)' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
       'Use copper-based organic formulations and remove infected lower leaves immediately. Maintain ventilation and avoid overhead irrigation.',
       'Use systemic fungicides such as Metalaxyl-M + Mancozeb, Propineb, or Cymoxanil + Mancozeb.',
       'Ridomil Gold: 25 g per 10 L water; Antracol: 20 g per 10 L water.',
       'Apply immediately when symptoms first appear or during cool wet weather. Repeat every 7 days during high-risk periods.',
       'Widely available through CIC, Lankem, Hayleys Agriculture and local agro-dealers in Sri Lanka.',
       'Avoid spraying in heavy rain and observe the recommended pre-harvest interval before harvest.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Potato Phytophthora (Late Blight)' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Potato Virus' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato')),
       'Remove infected plants, use yellow sticky traps, and reduce aphid pressure with neem oil or trap plants.',
       'Apply insecticide sprays to control aphid vectors, especially early in the season.',
       'Acetamiprid: 5 g per 10 L water; Imidacloprid: 5 ml per 10 L water.',
       'Target aphid colonies on the undersides of leaves, especially in the early evening.',
       'Readily available from local agrochemical suppliers. Brands include Mospilan (Lankem), Admire (Hayleys), Actara (CIC).',
       'Do not spray during flowering periods when pollinators are active.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Potato Virus' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Potato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Leaf Mold' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
       'Remove infected leaves, maintain air movement, and use sulfur-based or neem-based formulations.',
       'Apply Wettable Sulfur, Hexaconazole, or Triadimefon.',
       'Wettable Sulfur: 30-40 g per 10 L water; Hexaconazole: 10-15 ml per 10 L water.',
       'Spray both upper and lower leaf surfaces at first signs of infection and repeat if weather remains humid.',
       'Available through agrochemical dealers across Sri Lanka. Common brands: Sulcox (Lankem), Eraze (Hayleys), Shavit (CIC).',
       'Avoid applying sulfur under very hot midday conditions to prevent leaf burn.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Leaf Mold' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Septoria Leaf Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
       'Remove and destroy infected leaves. Maintain good spacing and apply copper-based organic sprays.',
       'Use Mancozeb or Chlorothalonil; in severe cases use a systemic fungicide.',
       'Mancozeb: 25 g per 10 L water; Chlorothalonil: 20 g per 10 L water.',
       'Apply to all foliage at early symptom onset and repeat every 10 days if weather stays wet.',
       'Available in agricultural shops. Common brands: Kocide (DuPont/CIC), Dithane M-45, Bravo.',
       'Do not spray copper fungicides during hot noon hours to prevent leaf scorch.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Septoria Leaf Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Target Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
       'Collect and destroy infected leaves and crop debris. Maintain proper spacing and avoid overhead irrigation.',
       'Apply Mancozeb, Chlorothalonil, or copper hydroxide depending on severity.',
       'Mancozeb: 25 g per 10 L water; Copper Hydroxide: 20 g per 10 L water.',
       'Begin treatment when target spots first appear and repeat every 10 days in wet weather.',
       'Available across local agro-shops. Common brands: Dithane M-45, Bravo, Kocide.',
       'Avoid late-day applications under high heat; timely spraying is most effective.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Target Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Two-Spotted Spider Mite' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato')),
       'Use neem oil, improve irrigation, and remove heavily infested foliage. Keep field surroundings clean.',
       'Apply approved miticides or insecticides such as Abamectin or Spiromesifen as per label instructions.',
       'Follow label rates for approved local products; local product rates vary by brand.',
       'Spray the undersides of leaves thoroughly and repeat as needed under infestation pressure.',
       'Available through registered agrochemical dealers and suppliers.',
       'Avoid excessive spraying and rotate products to prevent resistance.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Tomato Two-Spotted Spider Mite' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Tomato'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Rice Brown Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')),
       'Use balanced fertilisation, remove infected straw, and improve field drainage. Avoid excessive nitrogen.',
       'Apply recommended fungicides such as Tricyclazole or Carbendazim under severe outbreaks.',
       'Use label-specific rates for approved local fungicides; do not exceed the recommended dose.',
       'Apply when symptoms appear and repeat during prolonged wet conditions.',
       'Approved fungicides are available through registered local agricultural dealers.',
       'Avoid overusing nitrogen, and use PPE when mixing and spraying.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Rice Brown Spot' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Rice Hispa' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')),
       'Hand-remove adults and damaged leaves, and maintain field hygiene while monitoring early pest pressure.',
       'Use approved insecticides such as Chlorpyrifos or Carbofuran under supervision and label guidance.',
       'Use label-based rates for approved local products.',
       'Apply localized spray to infested patches or field-wide where infestation is severe.',
       'Available through registered agrochemical supply shops and agricultural service dealers.',
       'Follow safety intervals and avoid spraying near watercourses or paddy drains.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Rice Hispa' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice'))
);

INSERT INTO public.treatments (disease_id, organic_treatment, chemical_treatment, dosage, application_method, sri_lankan_availability, precautions)
SELECT (SELECT id FROM public.diseases WHERE disease_name = 'Rice Leaf Blast' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice')),
       'Use balanced nitrogen management, remove infected crop residue, and ensure field drainage is effective.',
       'Apply fungicides such as Tricyclazole, Isoprothiolane, or Carbendazim as per local recommendations.',
       'Follow local label recommendations for product-specific rates.',
       'Spray at first disease appearance and repeat when humidity and rainfall remain high.',
       'Available through local agrochemical dealers and agricultural input suppliers in Sri Lanka.',
       'Avoid over-fertilisation and do not spray within the recommended pre-harvest interval.'
WHERE NOT EXISTS (
  SELECT 1 FROM public.treatments t
  WHERE t.disease_id = (SELECT id FROM public.diseases WHERE disease_name = 'Rice Leaf Blast' AND crop_id = (SELECT id FROM public.crops WHERE crop_name = 'Rice'))
);
