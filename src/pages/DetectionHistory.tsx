import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { Detection } from '../types';
import Navbar from '../components/Navbar';
import {
  Search,
  Download,
  Calendar,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Eye,
  Loader2,
  X,
} from 'lucide-react';

export default function DetectionHistory() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [detections, setDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cropFilter, setCropFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const crops = ['Tomato', 'Potato', 'Chilli', 'Rice', 'Cucumber'];
  const severities = ['low', 'medium', 'high'];

  useEffect(() => {
    if (profile) fetchDetections();
  }, [profile, currentPage, cropFilter, severityFilter, search]);

  const fetchDetections = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      let query = supabase
        .from('detections')
        .select('*', { count: 'exact' })
        .eq('user_id', profile.id)
        .order('scan_date', { ascending: false });

      if (cropFilter) {
        query = query.eq('crop_name', cropFilter);
      }

      if (severityFilter) {
        query = query.eq('severity', severityFilter);
      }

      if (search) {
        query = query.ilike('disease_name', `%${search}%`);
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, count } = await query.range(from, to);

      if (data) {
        setDetections(data as Detection[]);
        setTotalPages(Math.ceil((count || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching detections:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setCropFilter('');
    setSeverityFilter('');
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Crop', 'Disease', 'Confidence', 'Severity'];
    const rows = detections.map((d) => [
      new Date(d.scan_date).toLocaleDateString(),
      d.crop_name,
      d.disease_name,
      `${d.confidence}%`,
      d.severity || 'N/A',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-scan-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityBadge = (severity?: string) => {
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
              {t('symptoms') === 'Symptoms' ? 'Detection History' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පරිලෝකන ඉතිහාසය' : 'நோய் கண்டறிதல் வரலாறு')}
            </h1>
            <p className="text-gray-600 mt-1">
              {t('symptoms') === 'Symptoms' ? 'View and manage your scan history' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඔබගේ පෙර පරිලෝකන ඉතිහාසය බලන්න' : 'உங்கள் ஸ்கேன் வரலாற்றைப் பார்த்து நிர்வகிக்கவும்')}
            </p>
          </div>
          <button onClick={exportToCSV} className="btn-secondary">
            <Download className="w-5 h-5 mr-2" />
            {t('symptoms') === 'Symptoms' ? 'Export CSV' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'CSV අපනයනය කරන්න' : 'CSV கோப்பாக மாற்று')}
          </button>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('symptoms') === 'Symptoms' ? 'Search by disease name...' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'රෝගයේ නමින් සොයන්න...' : 'நோயின் பெயர் கொண்டு தேடுக...')}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="input pl-12"
                />
              </div>
            </div>

            <select
              value={cropFilter}
              onChange={(e) => {
                setCropFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="input w-full md:w-40"
            >
              <option value="">{t('symptoms') === 'Symptoms' ? 'All Crops' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'සියලුම බෝග' : 'அனைத்து பயிர்களும்')}</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {t(crop)}
                </option>
              ))}
            </select>

            <select
              value={severityFilter}
              onChange={(e) => {
                setSeverityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="input w-full md:w-40"
            >
              <option value="">{t('symptoms') === 'Symptoms' ? 'All Severity' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'සියලුම දරුණුතා' : 'அனைத்து தீவிரமும்')}</option>
              {severities.map((s) => (
                <option key={s} value={s}>
                  {t(s.charAt(0).toUpperCase() + s.slice(1))}
                </option>
              ))}
            </select>

            {(search || cropFilter || severityFilter) && (
              <button onClick={clearFilters} className="btn-ghost">
                <X className="w-5 h-5 mr-2" />
                {t('symptoms') === 'Symptoms' ? 'Clear' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පිරිසිදු කරන්න' : 'சுத்தம் செய்க')}
              </button>
            )}
          </div>
        </div>

        {/* Results Table */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
            </div>
          ) : detections.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('symptoms') === 'Symptoms' ? 'No detections found' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පරිලෝකන කිසිවක් හමු නොවීය' : 'நோய் கண்டறிதல்கள் எதுவும் காணப்படவில்லை')}
              </h3>
              <p className="text-gray-500 mb-6">
                {search || cropFilter || severityFilter
                  ? (t('symptoms') === 'Symptoms' ? 'Try adjusting your filters' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඔබේ පෙරහන් වෙනස් කර උත්සාහ කරන්න' : 'உங்கள் வடிகட்டிகளை மாற்ற முயற்சிக்கவும்'))
                  : (t('symptoms') === 'Symptoms' ? 'Start scanning crops to see your history' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඔබගේ ඉතිහාසය දැකීමට බෝග පරිලෝකනය කිරීම ආරම්භ කරන්න' : 'உங்கள் வரலாற்றைப் பார்க்க பயிர்களை ஸ்கேன் செய்யத் தொடங்குங்கள்'))}
              </p>
              <Link to="/detect" className="btn-primary">
                <Leaf className="w-5 h-5 mr-2" />
                {t('symptoms') === 'Symptoms' ? 'Start Scanning' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පරිලෝකනය අරඹන්න' : 'ஸ்கேன் செய்யத் தொடங்குங்கள்')}
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="table-header">{t('symptoms') === 'Symptoms' ? 'Date' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'දිනය' : 'தேதி')}</th>
                      <th className="table-header">{t('crop_name')}</th>
                      <th className="table-header">{t('detected_disease')}</th>
                      <th className="table-header">{t('confidence_score')}</th>
                      <th className="table-header">{t('severity')}</th>
                      <th className="table-header">{t('symptoms') === 'Symptoms' ? 'Actions' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ක්‍රියා' : 'செயல்கள்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {detections.map((detection) => (
                      <tr key={detection.id} className="hover:bg-gray-50">
                        <td className="table-cell">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(detection.scan_date).toLocaleDateString(t('symptoms') === 'Symptoms' ? 'en-LK' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'si-LK' : 'ta-LK'), {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="font-medium">{t(detection.crop_name)}</span>
                        </td>
                        <td className="table-cell">
                          <span
                            className={
                              detection.disease_name === 'Healthy'
                                ? 'text-green-700'
                                : 'text-gray-900'
                            }
                          >
                            {t(detection.disease_name)}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span className={`font-medium ${getConfidenceColor(detection.confidence)}`}>
                            {detection.confidence}%
                          </span>
                        </td>
                        <td className="table-cell">{getSeverityBadge(detection.severity)}</td>
                        <td className="table-cell">
                          <Link
                            to={`/result/${detection.id}`}
                            className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            {t('symptoms') === 'Symptoms' ? 'View' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'පෙන්වන්න' : 'காட்டு')}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {t('symptoms') === 'Symptoms' ? `Page ${currentPage} of ${totalPages}` : (t('symptoms') === 'රෝග ලක්ෂණ' ? `පිටුව ${totalPages} න් ${currentPage}` : `பக்கம் ${currentPage} இன் ${totalPages}`)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="btn-ghost px-3 py-2 disabled:opacity-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-ghost px-3 py-2 disabled:opacity-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
