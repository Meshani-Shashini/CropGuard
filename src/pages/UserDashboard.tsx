import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { Detection, DashboardStats } from '../types';
import {
  Scan,
  History,
  BookOpen,
  Leaf,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    totalScans: 0,
    diseasesFound: 0,
    healthyPlants: 0,
  });
  const [recentDetections, setRecentDetections] = useState<Detection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    // If no profile yet, still stop loading after a short wait
    if (!profile) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }

    try {
      const { data: detections, error } = await supabase
        .from('detections')
        .select('*')
        .eq('user_id', profile.id)
        .order('scan_date', { ascending: false });

      if (error) {
        console.warn('Could not fetch detections (table may not exist yet):', error.message);
      }

      if (detections) {
        const totalScans = detections.length;
        const diseasesFound = detections.filter((d) => d.disease_name !== 'Healthy').length;
        const healthyPlants = detections.filter((d) => d.disease_name === 'Healthy').length;

        setStats({
          totalScans,
          diseasesFound,
          healthyPlants,
          recentDetection: detections[0],
        });

        setRecentDetections(detections.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: t('scan_disease'),
      description: t('symptoms') === 'Symptoms' ? 'Upload an image to detect crop diseases' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'රෝග හඳුනාගැනීම සඳහා ඡායාරූපයක් එක් කරන්න' : 'பயிர் நோய்களைக் கண்டறிய ஒரு படத்தைப் பதிவேற்றவும்'),
      icon: Scan,
      link: '/detect',
      color: 'bg-primary-100 text-primary-600',
    },
    {
      title: t('symptoms') === 'Symptoms' ? 'View History' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඉතිහාසය බලන්න' : 'வரலாற்றைக் காட்டு'),
      description: t('symptoms') === 'Symptoms' ? 'See all your previous scans' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඔබගේ පෙර පරිලෝකන සියල්ල බලන්න' : 'உங்களின் முந்தைய சோதனைகள் அனைத்தையும் பார்க்கவும்'),
      icon: History,
      link: '/history',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('crops'),
      description: t('symptoms') === 'Symptoms' ? 'Learn about crop varieties' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'බෝග වර්ග පිළිබඳව ඉගෙන ගන්න' : 'பயிர் வகைகள் பற்றி அறியவும்'),
      icon: Leaf,
      link: '/crops',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: t('knowledge_base'),
      description: t('symptoms') === 'Symptoms' ? 'Browse disease information' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'බෝග රෝග තොරතුරු පිරික්සන්න' : 'நோய் பற்றிய தகவல்களைப் பார்வையிடவும்'),
      icon: BookOpen,
      link: '/knowledge',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    const isEn = t('symptoms') === 'Symptoms';
    const isSi = t('symptoms') === 'රෝග ලක්ෂණ';
    
    if (hour < 12) {
      return isEn ? 'Good morning' : (isSi ? 'සුභ උදෑසනක්' : 'காலை வணக்கம்');
    }
    if (hour < 17) {
      return isEn ? 'Good afternoon' : (isSi ? 'සුභ පස්වරුවක්' : 'மதிய வணக்கம்');
    }
    return isEn ? 'Good evening' : (isSi ? 'සුභ සැන්දෑවක්' : 'மாலை வணக்கம்');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            {getGreeting()}, {profile?.fullname?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            {t('dashboard_desc')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
              <Scan className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalScans}</p>
            <p className="text-gray-500 text-sm">{t('total_scans')}</p>
          </div>

          <div className="stat-card">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.diseasesFound}</p>
            <p className="text-gray-500 text-sm">{t('diseases_found')}</p>
          </div>

          <div className="stat-card">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.healthyPlants}</p>
            <p className="text-gray-500 text-sm">{t('healthy_plants')}</p>
          </div>

          <div className="stat-card">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3.5xl font-bold text-gray-900">{t('symptoms') === 'Symptoms' ? 'Today' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'අද දින' : 'இன்று')}</p>
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString(t('symptoms') === 'Symptoms' ? 'en-LK' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'si-LK' : 'ta-LK'), { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('symptoms') === 'Symptoms' ? 'Quick Actions' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ක්ෂණික ක්‍රියාමාර්ග' : 'உடனடி நடவடிக்கைகள்')}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="card-hover p-4 flex items-start gap-4 group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color}`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-700">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{t('recent_scans')}</h2>
                <Link to="/history" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {t('view_all')}
                </Link>
              </div>

              {recentDetections.length === 0 ? (
                <div className="text-center py-8">
                  <Scan className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">{t('no_scans')}</p>
                  <Link to="/detect" className="text-primary-600 text-sm font-medium">
                    {t('start_scanning')}
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentDetections.map((detection) => (
                    <div
                      key={detection.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {detection.image_url ? (
                          <img
                            src={detection.image_url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {t(detection.crop_name)}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {t(detection.disease_name)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary-600">
                          {detection.confidence}%
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(detection.scan_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
