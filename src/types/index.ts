export interface Profile {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  district: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
}

export interface Crop {
  id: string;
  crop_name: string;
  description?: string;
  image_url?: string;
  growing_guide?: string;
  created_at: string;
  updated_at: string;
}

export interface Disease {
  id: string;
  crop_id: string;
  crop_name?: string;
  disease_name: string;
  symptoms: string;
  causes?: string;
  prevention?: string;
  severity: 'low' | 'medium' | 'high';
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Treatment {
  id: string;
  disease_id: string;
  organic_treatment?: string;
  chemical_treatment?: string;
  dosage?: string;
  application_method?: string;
  sri_lankan_availability?: string;
  precautions?: string;
  created_at: string;
  updated_at: string;
}

export interface Detection {
  id: string;
  user_id: string;
  crop_name: string;
  disease_id?: string;
  disease_name: string;
  confidence: number;
  severity?: string;
  image_url?: string;
  notes?: string;
  sinhala_treatment?: string;
  english_treatment?: string;
  scan_date: string;
  created_at: string;
}

export interface DetectionWithDetails extends Detection {
  treatment?: Treatment;
  disease?: Disease;
}

export interface DashboardStats {
  totalScans: number;
  diseasesFound: number;
  healthyPlants: number;
  recentDetection?: Detection;
}

export const SRI_LANKAN_DISTRICTS = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
];
