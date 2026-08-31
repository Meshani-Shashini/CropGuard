import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Leaf,
  Scan,
  MapPin,
  BookOpen,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle,
  BarChart3,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Scan,
      title: t('feature_ai_detection_title'),
      description: t('feature_ai_detection_desc'),
    },
    {
      icon: MapPin,
      title: t('feature_localized_treatment_title'),
      description: t('feature_localized_treatment_desc'),
    },
    {
      icon: BookOpen,
      title: t('feature_prevention_tips_title'),
      description: t('feature_prevention_tips_desc'),
    },
    {
      icon: BarChart3,
      title: t('feature_history_tracking_title'),
      description: t('feature_history_tracking_desc'),
    },
  ];

  const crops = [
    { name: 'Tomato', image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg' },
    { name: 'Potato', image: 'https://images.pexels.com/photos/15428958/pexels-photo-15428958.jpeg' },
    { name: 'Chilli', image: 'https://images.pexels.com/photos/10899475/pexels-photo-10899475.jpeg' },
    { name: 'Rice', image: 'https://images.pexels.com/photos/31737301/pexels-photo-31737301.jpeg' },
    { name: 'Cucumber', image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg' },
  ];

  const benefits = [
    t('benefit1'),
    t('benefit2'),
    t('benefit3'),
    t('benefit4'),
    t('benefit5'),
    t('benefit6'),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyRTdEMzIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                {t('made_for_sl')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight mb-6">
                {t('hero_title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                {t('hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  {t('get_started_free')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  {t('learn_more')}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/37321079/pexels-photo-37321079.jpeg"
                  alt="Farmer using CropGuard app"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                      <Scan className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{t('disease_detected')}</p>
                      <p className="text-sm text-white/80">{t('Tomato')} {t('Early Blight')} - 96%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">{t('accuracy_title')}</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium">{t('diseases_covered_title')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-4">
              {t('why_choose')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-hover p-6 group"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-4">
              {t('how_it_works')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('how_it_works_sub')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: t('step1_title'),
                description: t('step1_desc'),
                icon: Smartphone,
              },
              {
                step: '2',
                title: t('step2_title'),
                description: t('step2_desc'),
                icon: Scan,
              },
              {
                step: '3',
                title: t('step3_title'),
                description: t('step3_desc'),
                icon: MapPin,
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <item.icon className="w-10 h-10 text-white" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-4 border-primary-600 flex items-center justify-center text-primary-600 font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Crops */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-4">
              {t('supported_crops')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('supported_crops_sub')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {crops.map((crop, index) => (
              <div
                key={index}
                className="relative w-40 h-40 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-white font-semibold">
                  {t(crop.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-6">
                {t('why_choose')}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-200 flex-shrink-0" />
                    <span className="text-white text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-white mb-2">15+</p>
                <p className="text-primary-100">{t('diseases_covered_title')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-white mb-2">5</p>
                <p className="text-primary-100">{t('major_crops')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-white mb-2">98%</p>
                <p className="text-primary-100">{t('accuracy_rate')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-white mb-2">25</p>
                <p className="text-primary-100">{t('districts_covered')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('cta_desc')}
          </p>
          <Link to="/register" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
            {t('create_free_account')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
