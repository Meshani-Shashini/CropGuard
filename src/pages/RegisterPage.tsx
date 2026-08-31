import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { SRI_LANKAN_DISTRICTS } from '../types';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const passwordStrength = () => {
    if (password.length < 6) return { level: t('symptoms') === 'Symptoms' ? 'weak' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'දුර්වල' : 'பலவீனமானது'), color: 'text-red-500', width: 'w-1/3' };
    if (password.length < 8) return { level: t('symptoms') === 'Symptoms' ? 'medium' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'මධ්‍යම' : 'நடுத்தரமானது'), color: 'text-yellow-500', width: 'w-2/3' };
    return { level: t('symptoms') === 'Symptoms' ? 'strong' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ශක්තිමත්' : 'வலிமையானது'), color: 'text-green-500', width: 'w-full' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(t('symptoms') === 'Symptoms' ? 'Passwords do not match' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'මුරපද එකිනෙකට නොගැලපේ' : 'கடவுச்சொற்கள் பொருந்தவில்லை'));
      return;
    }

    if (password.length < 6) {
      setError(t('symptoms') === 'Symptoms' ? 'Password must be at least 6 characters' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'මුරපදය අවම වශයෙන් අක්ෂර 6ක් විය යුතුය' : 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களைக் கொண்டிருக்க வேண்டும்'));
      return;
    }

    if (!district) {
      setError(t('symptoms') === 'Symptoms' ? 'Please select your district' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'කරුණාකර ඔබගේ දිස්ත්‍රික්කය තෝරන්න' : 'தயவுசெய்து உங்கள் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்'));
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password, fullName, district, phone);

    if (error) {
      setError(error.message || 'Failed to create account');
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-4">
        <div className="card p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-2">
            {t('symptoms') === 'Symptoms' ? 'Account Created!' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ගිණුම සාදන ලදී!' : 'கணக்கு உருவாக்கப்பட்டது!')}
          </h2>
          <p className="text-gray-600">
            {t('symptoms') === 'Symptoms' ? 'Redirecting you to login...' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඇතුල් වීමේ පිටුවට යොමු කරමින්...' : 'உள்நுழைவு பக்கத்திற்கு திருப்பி விடப்படுகிறது...')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 font-poppins">
              CropGuard
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">
            {t('create_account')}
          </h1>
          <p className="text-gray-600 mt-2">
            {t('join_farmers')}
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">{t('full_name_label')}</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">{t('email_label')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">{t('phone_label')}</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="077 123 4567"
                  className="input pl-12"
                />
              </div>
            </div>

            <div>
              <label className="label">{t('district_label')}</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="input pl-12 appearance-none"
                  required
                >
                  <option value="">{t('symptoms') === 'Symptoms' ? 'Select your district' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'දිස්ත්‍රික්කය තෝරන්න' : 'மாவட்டம் தேர்ந்தெடுக்கவும்')}</option>
                  {SRI_LANKAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {t('symptoms') === 'Symptoms' ? d : (t('symptoms') === 'රෝග ලක්ෂණ'
                        ? (d === 'Ampara' ? 'අම්පාර' : d === 'Anuradhapura' ? 'අනුරාධපුරය' : d === 'Badulla' ? 'බදුල්ල' : d === 'Batticaloa' ? 'මඩකලපුව' : d === 'Colombo' ? 'කොළඹ' : d === 'Galle' ? 'ගාල්ල' : d === 'Gampaha' ? 'ගම්පහ' : d === 'Hambantota' ? 'හම්බන්තොට' : d === 'Jaffna' ? 'යාපනය' : d === 'Kalutara' ? 'කළුතර' : d === 'Kandy' ? 'මහනුවර' : d === 'Kegalle' ? 'කෑගල්ල' : d === 'Kilinochchi' ? 'කිලිනොච්චිය' : d === 'Kurunegala' ? 'කුරුණෑගල' : d === 'Mannar' ? 'මන්නාරම' : d === 'Matale' ? 'මාතලේ' : d === 'Matara' ? 'මාතර' : d === 'Monaragala' ? 'මොනරාගල' : d === 'Mullaitivu' ? 'මුලතිව්' : d === 'Nuwara Eliya' ? 'නුවරඑළිය' : d === 'Polonnaruwa' ? 'පොළොන්නරුව' : d === 'Puttalam' ? 'පුත්තලම' : d === 'Ratnapura' ? 'රත්නපුරය' : d === 'Trincomalee' ? 'ත්‍රිකුණාමලය' : 'වවුනියාව')
                        : (d === 'Ampara' ? 'அம்பாறை' : d === 'Anuradhapura' ? 'அனுராதபுரம்' : d === 'Badulla' ? 'பதுளை' : d === 'Batticaloa' ? 'மட்டக்களப்பு' : d === 'Colombo' ? 'கொழும்பு' : d === 'Galle' ? 'காலி' : d === 'Gampaha' ? 'கம்பஹா' : d === 'Hambantota' ? 'அம்பாந்தோட்டை' : d === 'Jaffna' ? 'யாழ்ப்பாணம்' : d === 'Kalutara' ? 'களுத்துறை' : d === 'Kandy' ? 'கண்டி' : d === 'Kegalle' ? 'கேகாலை' : d === 'Kilinochchi' ? 'கிளிநொச்சி' : d === 'Kurunegala' ? 'குருணாகல்' : d === 'Mannar' ? 'மன்னார்' : d === 'Matale' ? 'மாத்தளை' : d === 'Matara' ? 'மாத்தறை' : d === 'Monaragala' ? 'மொனராகலை' : d === 'Mullaitivu' ? 'முல்லைத்தீவு' : d === 'Nuwara Eliya' ? 'நுவரெலியா' : d === 'Polonnaruwa' ? 'பொலன்னறுவை' : d === 'Puttalam' ? 'புத்தளம்' : d === 'Ratnapura' ? 'இரத்தினபுரி' : d === 'Trincomalee' ? 'திருகோணமலை' : 'வவுனியா'))}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">{t('password_label')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="input pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full bg-primary-600 ${passwordStrength().width} transition-all`}></div>
                  </div>
                  <p className={`text-xs mt-1 ${passwordStrength().color}`}>
                    {t('symptoms') === 'Symptoms' ? 'Password strength' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'මුරපද ශක්තිමත්භාවය' : 'கடவுச்சொல் வலிமை')}: {passwordStrength().level}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="label">{t('confirm_password_label')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="input pl-12"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg"
            >
              {loading ? t('creating_account') : t('create_account_btn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('already_have_account')}{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                {t('sign_in_link')}
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          {t('agree_terms_register')}
        </p>
      </div>
    </div>
  );
}
