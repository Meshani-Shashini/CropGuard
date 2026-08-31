import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { Disease, Treatment } from '../types';
import Navbar from '../components/Navbar';
import {
  ArrowLeft,
  Leaf,
  Droplets,
  FlaskConical,
  Shield,
  MapPin,
  AlertTriangle,
  Loader2,
  CheckCircle,
} from 'lucide-react';

const translateTextValue = (value: string, t: (key: string) => string) => {
  const candidates = [
    value,
    value.trim(),
    value.trim().replace(/\s+/g, ' '),
    value.trim().replace(/[.!?]+$/, ''),
    value.trim().replace(/[.!?]+$/, '').replace(/\s+/g, ' '),
  ];

  for (const candidate of candidates) {
    const translated = t(candidate);
    if (translated && translated !== candidate) {
      return translated.trim();
    }
  }

  return value.trim();
};

const translateTreatmentText = (text: string, t: (key: string) => string) => {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length > 1) {
    const translatedParts = parts.map((item) => translateTextValue(item, t));
    const hasSentenceTranslation = translatedParts.some((item, index) => item !== parts[index]);

    if (hasSentenceTranslation) {
      return translatedParts.map((item) => `${item}${item && !item.endsWith('.') ? '.' : ''}`);
    }
  }

  const fullTranslated = translateTextValue(text, t);
  if (fullTranslated !== text.trim()) {
    return [fullTranslated];
  }

  return [text.trim()];
};

const translateAvailabilityText = (
  text: string,
  t: (key: string) => string,
  language: string,
) => {
  if (language === 'en') {
    const segments = text
      .split(/(?<=[.!?])\s+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (segments.length > 1) {
      return segments;
    }
  }

  const segments = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (segments.length > 1) {
    const translatedSegments = segments.map((item) => translateTextValue(item, t));
    const hasSentenceTranslation = translatedSegments.some((item, index) => item !== segments[index]);

    if (hasSentenceTranslation) {
      return translatedSegments;
    }
  }

  const fullTranslated = translateTextValue(text, t);
  if (fullTranslated !== text.trim()) {
    return [fullTranslated];
  }

  return [text.trim()];
};

export default function TreatmentRecommendation() {
  const { diseaseId } = useParams<{ diseaseId: string }>();
  const { language, t } = useLanguage();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (diseaseId) fetchData();
  }, [diseaseId]);

  const fetchData = async () => {
    try {
      const { data: diseaseData } = await supabase
        .from('diseases')
        .select('*, crops(crop_name)')
        .eq('id', diseaseId)
        .single();

      if (diseaseData) {
        setDisease({
          ...diseaseData,
          crop_name: diseaseData.crops?.crop_name,
        } as Disease);
      }

      const { data: treatmentData } = await supabase
        .from('treatments')
        .select('*')
        .eq('disease_id', diseaseId)
        .single();

      if (treatmentData) {
        setTreatment(treatmentData as Treatment);
      }
    } catch (error) {
      console.error('Error fetching treatment data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  if (!disease) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Treatment Not Found</h2>
          <Link to="/detect" className="btn-primary mt-4 inline-flex">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('back_to_detection')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/detect"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('back_to_detection')}
        </Link>

        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t(disease.crop_name || '')}</p>
              <h1 className="text-2xl font-bold text-gray-900 font-poppins">
                {t(disease.disease_name)}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`badge ${
                    disease.severity === 'high'
                      ? 'badge-red'
                      : disease.severity === 'medium'
                      ? 'badge-yellow'
                      : 'badge-green'
                  }`}
                >
                  {t(disease.severity === 'high' ? 'High' : disease.severity === 'medium' ? 'Medium' : 'Low')}{' '}{t('severity')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Disease Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Symptoms */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                {t('symptoms')}
              </h2>
              <p className="text-gray-700">{t(disease.symptoms)}</p>
            </div>

            {/* Organic Treatment */}
            {treatment?.organic_treatment && (
              <div className="card p-6 border-l-4 border-l-green-500">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  {t('organic_treatment')}
                </h2>
                <div className="prose prose-green max-w-none">
                  {translateTreatmentText(treatment.organic_treatment, t).map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chemical Treatment */}
            {treatment?.chemical_treatment && (
              <div className="card p-6 border-l-4 border-l-blue-500">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-600" />
                  {t('chemical_treatment')}
                </h2>
                <p className="text-gray-700 mb-4">{translateTreatmentText(treatment.chemical_treatment, t).join(' ')}</p>

                {treatment.dosage && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">{t('recommended_dosage')}</p>
                    <p className="text-blue-800">{translateTreatmentText(treatment.dosage, t).join(' ')}</p>
                  </div>
                )}

                {treatment.application_method && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{t('application_method')}</p>
                    <p className="text-gray-700">{translateTreatmentText(treatment.application_method, t).join(' ')}</p>
                  </div>
                )}
              </div>
            )}

            {/* Precautions */}
            {treatment?.precautions && (
              <div className="card p-6 border-l-4 border-l-orange-500 bg-orange-50">
                <h2 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  {t('safety_precautions')}
                </h2>
                <div className="text-orange-800">
                  {translateTreatmentText(treatment.precautions, t).map((item, index) => (
                    <p key={`${item}-${index}`} className="mb-2">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Prevention */}
            {disease.prevention && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary-600" />
                  {t('prevention_tips')}
                </h2>
                <div className="text-gray-700">
                  {translateTreatmentText(disease.prevention, t).map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-start gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Availability */}
          <div className="space-y-6">
            {treatment?.sri_lankan_availability && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  {t('available_in_sl')}
                </h2>
                <div className="text-gray-700 text-sm">
                  {translateAvailabilityText(treatment.sri_lankan_availability, t, language).map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg mb-2"
                    >
                      <CheckCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{t('quick_actions')}</h3>
              <div className="space-y-3">
                <Link to="/detect" className="btn-secondary w-full">
                  {t('scan_another_crop')}
                </Link>
                <Link to="/history" className="btn-ghost w-full">
                  {t('view_history')}
                </Link>
                <Link to="/knowledge" className="btn-ghost w-full">
                  {t('browse_diseases')}
                </Link>
              </div>
            </div>

            {/* Help */}
            <div className="card p-6 bg-primary-50 border border-primary-100">
              <h3 className="font-semibold text-primary-900 mb-2">{t('need_help')}</h3>
              <p className="text-sm text-primary-800 mb-4">
                {t('help_desc')}
              </p>
              <p className="text-xs text-primary-700">
                {t('hotline')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
