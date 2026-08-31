import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { Crop, Disease } from '../types';
import Navbar from '../components/Navbar';
import {
  Search,
  Sun,
  Droplets,
  Thermometer,
  AlertTriangle,
  BookOpen,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function CropInformation() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { t } = useLanguage();

  const cropImages: Record<string, string> = {
    Tomato: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    Potato: 'https://images.pexels.com/photos/15428958/pexels-photo-15428958.jpeg',
    Chilli: 'https://images.pexels.com/photos/10899475/pexels-photo-10899475.jpeg',
    Rice: 'https://images.pexels.com/photos/31737301/pexels-photo-31737301.jpeg',
    Cucumber: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg',
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const { data } = await supabase.from('crops').select('*').order('crop_name');
      if (data) setCrops(data as Crop[]);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDiseases = async (cropId: string) => {
    try {
      const { data } = await supabase
        .from('diseases')
        .select('*')
        .eq('crop_id', cropId)
        .order('disease_name');
      if (data) setDiseases(data as Disease[]);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const handleCropSelect = (crop: Crop) => {
    if (selectedCrop?.id === crop.id) {
      setSelectedCrop(null);
      setDiseases([]);
    } else {
      setSelectedCrop(crop);
      fetchDiseases(crop.id);
    }
  };

  const filteredCrops = crops.filter((crop) =>
    crop.crop_name.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            {t('crops')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('symptoms') === 'Symptoms'
              ? 'Learn about crops grown in Sri Lanka and their common diseases'
              : (t('symptoms') === 'රෝග ලක්ෂණ'
                ? 'ශ්‍රී ලංකාවේ වගා කරන බෝග සහ ඒවාට වැළඳෙන පොදු රෝග පිළිබඳ ඉගෙන ගන්න'
                : 'இலங்கையில் பயிரிடப்படும் பயிர்கள் மற்றும் அவற்றின் பொதுவான நோய்கள் பற்றி அறியவும்')}
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('symptoms') === 'Symptoms' ? 'Search crops...' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'බෝග සොයන්න...' : 'பயிர்களைத் தேடுங்கள்...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-12"
            />
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid gap-6">
          {filteredCrops.map((crop) => (
            <div key={crop.id} className="card overflow-hidden">
              <button
                onClick={() => handleCropSelect(crop)}
                className="w-full p-4 md:p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={cropImages[crop.crop_name] || 'https://images.pexels.com/photos/37321079/pexels-photo-37321079.jpeg'}
                      alt={crop.crop_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 font-poppins">
                      {t(crop.crop_name)}
                    </h2>
                    <p className="text-gray-600 mt-1 line-clamp-2">
                      {t(crop.description || 'A common vegetable crop grown in Sri Lanka')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge-green">
                    {diseases.filter((d) => d.crop_id === crop.id).length || diseases.length} {t('symptoms') === 'Symptoms' ? 'diseases' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'රෝග' : 'நோய்கள்')}
                  </span>
                  {selectedCrop?.id === crop.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {selectedCrop?.id === crop.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  {/* Growing Guide */}
                  {crop.growing_guide && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                        {t('symptoms') === 'Symptoms' ? 'Growing Guide' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'වගා උපදෙස්' : 'வளர்ப்பு வழிகாட்டி')}
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="card p-4">
                          <Sun className="w-6 h-6 text-yellow-500 mb-2" />
                          <p className="font-medium text-gray-900">{t('symptoms') === 'Symptoms' ? 'Sunlight' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'හිරු එළිය' : 'சூரிய ஒளி')}</p>
                          <p className="text-sm text-gray-600">{t('symptoms') === 'Symptoms' ? '6-8 hours daily' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'දිනපතා පැය 6-8' : 'தினமும் 6-8 மணிநேரம்')}</p>
                        </div>
                        <div className="card p-4">
                          <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                          <p className="font-medium text-gray-900">{t('symptoms') === 'Symptoms' ? 'Watering' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ජල සම්පාදනය' : 'நீர் பாய்ச்சுதல்')}</p>
                          <p className="text-sm text-gray-600">{t('symptoms') === 'Symptoms' ? 'Regular, moderate' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'නිතිපතා, මධ්‍යම ප්‍රමාණයෙන්' : 'வழக்கமான, மிதமான')}</p>
                        </div>
                        <div className="card p-4">
                          <Thermometer className="w-6 h-6 text-red-500 mb-2" />
                          <p className="font-medium text-gray-900">{t('symptoms') === 'Symptoms' ? 'Temperature' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'උෂ්ණත්වය' : 'வெப்பநிலை')}</p>
                          <p className="text-sm text-gray-600">{t('symptoms') === 'Symptoms' ? '25-35°C ideal' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'සෙල්සියස් 25-35 උචිතයි' : '25-35°C உகந்தது')}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-700">
  {t('symptoms') === 'Symptoms' 
    ? crop.growing_guide 
    : (t('symptoms') === 'රෝග ලක්ෂණ'
      ? (crop.crop_name === 'Tomato' ? 'හොඳින් ජලාපවහනය වන පසෙහි සිටුවන්න, දිනකට පැය 6-8 ක හිරු එළිය අවශ්‍ය වේ. නිතිපතා වතුර දමන්න නමුත් ජලයෙන් යටවීම වළක්වන්න. ආධාරක සඳහා ලී කූරු ගසන්න.'
        : crop.crop_name === 'Potato' ? 'සිසිල් දේශගුණයක, හොඳින් ජලාපවහනය වන බුරුල් පසෙහි සිටුවන්න. පැල වර්ධනය වන විට කඳ වටා පස් එකතු කරන්න. පත්‍ර වියළී ගිය පසු අස්වැන්න නෙලා ගන්න.'
        : crop.crop_name === 'Chilli' ? 'උණුසුම් දේශගුණයක් සහ හොඳින් ජලාපවහනය වන පසක් අවශ්‍ය වේ. මධ්‍යම ප්‍රමාණයෙන් ජලය යොදන්න. අධික වර්ෂාවෙන් ආරක්ෂා කරන්න. රතු වී හොඳින් ඉදුණු පසු අස්වැන්න නෙලා ගන්න.'
        : crop.crop_name === 'Rice' ? 'නිවර්තන දේශගුණය, පෝෂ්‍යදායී මැටි පස සහ ප්‍රමාණවත් ජලය අවශ්‍ය වේ. වර්ධන කාලය තුළ කුඹුරේ ජල මට්ටම පවත්වා ගන්න. කරල් රන්වන් පැහැයට හැරුණු පසු අස්වැන්න නෙලා ගන්න.'
        : 'වැල් ඉහළට යැවීම සඳහා ආධාරක සැපයීම සහ නිතිපතා ජලය දැමීම අවශ්‍ය වේ. කොම්පෝස්ට් සමඟ හොඳින් ජලාපවහනය වන පසෙහි සිටුවන්න. ලාබාල හා මෘදු වන විට අස්වැන්න නෙලා ගන්න.')
      : (crop.crop_name === 'Tomato' ? 'நன்கு வடிகால் வசதியுள்ள மண்ணில் நடவும், தினமும் 6-8 மணிநேர சூரிய ஒளி தேவை. தொடர்ந்து தண்ணீர் பாய்ச்சவும், ஆனால் தண்ணீர் தேங்குவதைத் தவிர்க்கவும். செடிகளுக்கு ஆதார கம்புகளை நடவும்.'
        : crop.crop_name === 'Potato' ? 'குளிர்ந்த காலநிலையில், நன்கு வடிகால் வசதியுள்ள தளர்வான மண்ணில் நடவும். செடிகள் வளரும்போது தண்டைச் சுற்றி மண்ணை அணைக்கவும். இலைகள் காய்ந்ததும் அறுவடை செய்யவும்.'
        : crop.crop_name === 'Chilli' ? 'வெப்பமான காலநிலையும் நன்கு வடிகால் வசதியுள்ள மண்ணும் தேவை. மிதமாக தண்ணீர் பாய்ச்சவும். அதிக மழையிலிருந்து பாதுகாக்கவும். மிளகாய் சிவப்பு நிறமாகி முதிர்ந்ததும் அறுவடை செய்யவும்.'
        : crop.crop_name === 'Rice' ? 'வெப்பமண்டல காலநிலை, அதிக நீர் மற்றும் வளமான களிமண் மண் தேவை. வளர்ச்சியின் போது வயலில் நீர் மட்டத்தை பராமரிக்கவும். கதிர்கள் பொன்னிறமாக மாறியதும் அறுவடை செய்யவும்.'
        : 'கொடி படர ஆதாரங்கள் தேவை, தொடர்ந்து தண்ணீர் பாய்ச்ச வேண்டும். உரம் கலந்த நன்கு வடிகால் வசதியுள்ள மண்ணில் நடவும். இளமையாக இருக்கும்போதே அறுவடை செய்யவும்.'))}
</p>
                    </div>
                  )}

                  {/* Common Diseases */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      {t('symptoms') === 'Symptoms' ? 'Common Diseases' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පොදු බෝග රෝග' : 'பொதுவான நோய்கள்')}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {diseases.map((disease) => (
                        <div key={disease.id} className="card p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {t(disease.disease_name)}
                            </h4>
                            <span
                              className={`badge ${
                                disease.severity === 'high'
                                  ? 'badge-red'
                                  : disease.severity === 'medium'
                                  ? 'badge-yellow'
                                  : 'badge-green'
                              }`}
                            >
                              {t(disease.severity)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {t(disease.symptoms)}
                          </p>
                          {disease.prevention && (
                            <p className="text-xs text-primary-600 mt-2">
                              {t('symptoms') === 'Symptoms' ? 'Prevention tips available' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'වැළැක්වීමේ උපදෙස් තිබේ' : 'தடுப்பு குறிப்புகள் கிடைக்கின்றன')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
