import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { Disease, Crop } from '../types';
import Navbar from '../components/Navbar';
import {
  Search,
  Leaf,
  AlertTriangle,
  Filter,
  X,
  Loader2,
  Eye,
  ExternalLink,
} from 'lucide-react';

export default function KnowledgeBase() {
  const [diseases, setDiseases] = useState<(Disease & { crop_name?: string })[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDiseases();
  }, [search, selectedCrop, selectedSeverity]);

  const fetchData = async () => {
    try {
      const { data: cropsData } = await supabase.from('crops').select('*').order('crop_name');
      if (cropsData) setCrops(cropsData as Crop[]);

      const { data: diseasesData } = await supabase
        .from('diseases')
        .select('*, crops(crop_name)')
        .order('disease_name');

      if (diseasesData) {
        setDiseases(
          diseasesData.map((d: Record<string, unknown>) => ({
            ...d,
            crop_name: (d.crops as { crop_name: string })?.crop_name,
          })) as (Disease & { crop_name: string })[]
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDiseases = () => {
    let filtered = diseases;

    if (search) {
      filtered = filtered.filter(
        (d) =>
          d.disease_name.toLowerCase().includes(search.toLowerCase()) ||
          d.symptoms.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCrop) {
      filtered = filtered.filter((d) => d.crop_name === selectedCrop);
    }

    if (selectedSeverity) {
      filtered = filtered.filter((d) => d.severity === selectedSeverity);
    }

    return filtered;
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCrop('');
    setSelectedSeverity('');
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="badge-red">{t('High')}</span>;
      case 'medium':
        return <span className="badge-yellow">{t('Medium')}</span>;
      case 'low':
        return <span className="badge-green">{t('Low')}</span>;
      default:
        return <span className="badge-gray">N/A</span>;
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

  const filteredDiseases = filterDiseases();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            {t('knowledge_base')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('symptoms') === 'Symptoms'
              ? 'Browse diseases, symptoms, and treatments'
              : (t('symptoms') === 'රෝග ලක්ෂණ'
                ? 'බෝග රෝග, ලක්ෂණ සහ ප්‍රතිකාර පිරික්සන්න'
                : 'பயிர் நோய்கள், அறிகுறிகள் மற்றும் சிகிச்சைகளை பார்வையிடவும்')}
          </p>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('symptoms') === 'Symptoms' ? 'Search diseases or symptoms...' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'රෝග හෝ රෝග ලක්ෂණ සොයන්න...' : 'நோய்கள் அல்லது அறிகுறிகளைத் தேடுங்கள்...')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-12"
                />
              </div>
            </div>

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="input w-full lg:w-48"
            >
              <option value="">{t('symptoms') === 'Symptoms' ? 'All Crops' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'සියලුම බෝග' : 'அனைத்து பயிர்களும்')}</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.crop_name}>
                  {t(crop.crop_name)}
                </option>
              ))}
            </select>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="input w-full lg:w-48"
            >
              <option value="">{t('symptoms') === 'Symptoms' ? 'All Severity' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'සියලුම දරුණුතා' : 'அனைத்து தீவிரமும்')}</option>
              <option value="high">{t('High')}</option>
              <option value="medium">{t('Medium')}</option>
              <option value="low">{t('Low')}</option>
            </select>

            {(search || selectedCrop || selectedSeverity) && (
              <button onClick={clearFilters} className="btn-ghost">
                <X className="w-5 h-5 mr-2" />
                {t('symptoms') === 'Symptoms' ? 'Clear' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පිරිසිදු කරන්න' : 'சுத்தம் செய்க')}
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {t('symptoms') === 'Symptoms' ? 'Found' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'හමු විය' : 'கண்டறியப்பட்டது')}{' '}
            <span className="font-semibold">{filteredDiseases.length}</span>{' '}
            {t('symptoms') === 'Symptoms' ? 'diseases' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'රෝග' : 'நோய்கள்')}
          </p>
          <div className="flex gap-2">
            <span className="badge-gray flex items-center gap-1">
              <Filter className="w-3 h-3" />
              {t('symptoms') === 'Symptoms' ? 'Filters' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පෙරහන්' : 'வடிகட்டிகள்')}
            </span>
          </div>
        </div>

        {/* Disease Cards */}
        {filteredDiseases.length === 0 ? (
          <div className="card p-12 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('symptoms') === 'Symptoms' ? 'No diseases found' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'රෝග කිසිවක් හමු නොවීය' : 'நோய்கள் எதுவும் காணப்படவில்லை')}
            </h3>
            <p className="text-gray-500">
              {t('symptoms') === 'Symptoms' ? 'Try adjusting your search or filters' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඔබේ සෙවුම හෝ පෙරහන් වෙනස් කර උත්සාහ කරන්න' : 'உங்கள் தேடல் அல்லது வடிகட்டிகளை மாற்ற முயற்சிக்கவும்')}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <div key={disease.id} className="card-hover overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm text-primary-600 font-medium">
                        {t(disease.crop_name || '')}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">
                        {t(disease.disease_name)}
                      </h3>
                    </div>
                    {getSeverityBadge(disease.severity)}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('symptoms')}</span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-3">{t(disease.symptoms)}</p>
                  </div>

                  {disease.causes && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 line-clamp-2">
                        <span className="font-medium">
                          {t('symptoms') === 'Symptoms' ? 'Causes:' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'හේතු:' : 'காரணங்கள்:')}{' '}
                        </span>{' '}
                        {t('symptoms') === 'Symptoms' ? disease.causes : (t('symptoms') === 'රෝග ලක්ෂණ'
                          ? (disease.disease_name === 'Early Blight' ? 'දිලීර ආසාදනයකි (Alternaria solani), ආසාදිත ශාක සුන්බුන් සහ උණුසුම් තෙතමනය සහිත කාලගුණය මඟින් බෝවේ.'
                            : disease.disease_name === 'Late Blight' ? 'දිලීර ආසාදනයකි (Phytophthora infestans), සිසිල් වැසි සහිත කාලගුණයට හිතකර වන අතර වේගයෙන් පැතිරේ.'
                              : disease.disease_name === 'Leaf Curl Virus' ? 'සුදුමැස්සන් මඟින් බෝවන වෛරස් ආසාදනයකි, උණුසුම් දේශගුණයේ බහුලව පවතී.'
                                : disease.disease_name === 'Bacterial Wilt' ? 'පස ආශ්‍රිත බැක්ටීරියා ආසාදනයකි (Ralstonia solanacearum), ශාකයේ තුවාල මඟින් ඇතුල් වේ.'
                                  : disease.disease_name === 'Black Scurf' ? 'පස ආශ්‍රිත දිලීර ආසාදනයකි (Rhizoctonia solani), සිසිල් තෙත් පසෙහි බහුල වේ.'
                                    : disease.disease_name === 'Common Scab' ? 'බැක්ටීරියා ආසාදනයකි, වියළි ක්ෂාරීය පසෙහි (ඉහළ pH) වර්ධනය වේ.'
                                      : disease.disease_name === 'Anthracnose' ? 'දිලීර ආසාදනයකි, වැසි බිංදු සහ උණුසුම් තෙතමනය සහිත කාලගුණයෙන් බෝවේ.'
                                        : disease.disease_name === 'Leaf Spot' ? 'වැසි හෝ උඩින් වතුර ඉසීමෙන් පැතිරෙන දිලීර හෝ බැක්ටීරියා ආසාදනයකි.'
                                          : disease.disease_name === 'Powdery Mildew' ? 'දුර්වල වාතාශ්‍රය සහ වියළි කාලගුණ තත්ත්වයන්ට හිතකර දිලීර ආසාදනයකි.'
                                            : disease.disease_name === 'Fruit and Shoot Borer' ? 'කරල් සහ දළු සිදුරු කරන කෘමි කීඩෑවෙකි (Leucinodes orbonalis).'
                                              : disease.disease_name === 'Little Leaf Disease' ? 'කොළ පලඟැටියන් මඟින් සම්ප්‍රේෂණය වන ෆයිටොප්ලාස්මා රෝගයකි.'
                                                : disease.disease_name === 'Verticillium Wilt' ? 'පස ආශ්‍රිත දිලීර ආසාදනයකි, මුල් හරහා ශාකයට ඇතුල් වී පසෙහි බොහෝ කාලයක් පවතී.'
                                                  : disease.disease_name === 'Downy Mildew' ? 'සිසිල් තෙත් තත්ත්වයන් යටතේ වේගයෙන් පැතිරෙන දිලීර ආසාදනයකි.'
                                                    : 'කුඩිත්තන් සහ යාන්ත්‍රික ස්පර්ශය මඟින් බෝවන වෛරස් ආසාදනයකි.')
                          : (disease.disease_name === 'Early Blight' ? 'பூஞ்சை தொற்று (Alternaria solani), பாதிக்கப்பட்ட பயிர் குப்பைகள் மற்றும் வெப்பமான ஈரப்பதமான காலநிலையால் பரவுகிறது.'
                            : disease.disease_name === 'Late Blight' ? 'பூஞ்சை தொற்று (Phytophthora infestans), குளிர்ச்சியான ஈரமான காலநிலையால் வேகமாகப் பரவுகிறது.'
                              : disease.disease_name === 'Leaf Curl Virus' ? 'வெள்ளை ஈக்களால் பரவும் வைரஸ் தொற்று, வெப்பமான காலநிலையில் பரவலாகக் காணப்படுகிறது.'
                                : disease.disease_name === 'Bacterial Wilt' ? 'மண் மூலம் பரவும் பாக்டீரியா தொற்று (Ralstonia solanacearum), காயங்கள் மூலம் தாவரத்திற்குள் நுழைகிறது.'
                                  : disease.disease_name === 'Black Scurf' ? 'மண் மூலம் பரவும் பூஞ்சை தொற்று (Rhizoctonia solani), குளிர்ச்சியான ஈரமான மண்ணில் பரவுகிறது.'
                                    : disease.disease_name === 'Common Scab' ? 'பாக்டீரியா தொற்று, வறண்ட காரத்தன்மை கொண்ட மண்ணில் (அதிக pH) வளர்கிறது.'
                                      : disease.disease_name === 'Anthracnose' ? 'பூஞ்சை தொற்று, மழைத்துளிகள் மற்றும் வெப்பமான ஈரப்பதமான காலநிலையால் பரவுகிறது.'
                                        : disease.disease_name === 'Leaf Spot' ? 'மழை அல்லது இலைகளில் நீர் தெளிப்பதால் பரவும் பூஞ்சை அல்லது பாக்டீரியா தொற்று.'
                                          : disease.disease_name === 'Powdery Mildew' ? 'வறண்ட மற்றும் அதிக ஈரப்பதம் உள்ள சூழலில் பரவும் பூஞ்சை தொற்று.'
                                            : disease.disease_name === 'Fruit and Shoot Borer' ? 'காய்கள் மற்றும் தண்டுகளைத் துளைக்கும் பூச்சியின் புழுக்கள் (Leucinodes orbonalis).'
                                              : disease.disease_name === 'Little Leaf Disease' ? 'இலை தத்துப்பூச்சிகளால் பரவும் பைட்டோபிளாஸ்மா நோய்.'
                                                : disease.disease_name === 'Verticillium Wilt' ? 'மண் மூலம் பரவும் பூஞ்சை தொற்று, வேர்கள் வழியாக தாவரத்திற்குள் நுழைகிறது.'
                                                  : disease.disease_name === 'Downy Mildew' ? 'குளிர்ச்சியான ஈரமான காலநிலையில் வேகமாகப் பரவும் பூஞ்சை தொற்று.'
                                                    : 'அசுவினிகள் மற்றும் இயந்திர தொடுதல் மூலம் பரவும் வைரஸ் தொற்று.'))}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <Link
                      to={`/treatment/${disease.id}`}
                      className="btn-primary flex-1 text-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t('symptoms') === 'Symptoms' ? 'View Treatment' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ප්‍රතිකාර බලන්න' : 'சிகிச்சையைக் காட்டு')}
                    </Link>
                    <Link to={`/detect`} className="btn-secondary">
                      <Leaf className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 card p-6 bg-primary-50 border border-primary-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('symptoms') === 'Symptoms' ? 'Need Expert Advice?' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'විශේෂඥ උපදෙස් අවශ්‍යද?' : 'நிபுணர் ஆலோசனை தேவையா?')}
              </h3>
              <p className="text-gray-700 mb-4">
                {t('help_desc')}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white px-4 py-2 rounded-lg">
                  <span className="font-medium">{t('symptoms') === 'Symptoms' ? 'Hotline:' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ක්ෂණික ඇමතුම:' : 'அவசர எண்:')}{' '}</span> 1920
                </div>
                <div className="bg-white px-4 py-2 rounded-lg">
                  <span className="font-medium">{t('symptoms') === 'Symptoms' ? 'Website:' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'වෙබ් අඩවිය:' : 'இணையதளம்:')}{' '}</span> doa.gov.lk
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
