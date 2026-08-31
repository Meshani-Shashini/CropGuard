import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from 'lucide-react';
import { SRI_LANKAN_DISTRICTS } from '../types';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { profile, updateProfile, user } = useAuth();
  const { t } = useLanguage();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullname || '');
      setPhone(profile.phone || '');
      setDistrict(profile.district || '');
      setPreviewUrl(profile.image_url || '');
    }
  }, [profile]);

  // Keep local form state in sync with the fetched profile
  useEffect(() => {
    if (profile) {
      setFullName(profile.fullname || '');
      setPhone(profile.phone || '');
      setDistrict(profile.district || '');
    }
  }, [profile]);

  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);
  setLoading(true);

  // Upload selected image if any
  let imageUrl = previewUrl || null;
  if (selectedFile) {
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
    const filePath = fileName;
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, selectedFile);
    if (uploadError) {
      setError(uploadError.message);
      setLoading(false);
      return;
    }
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    imageUrl = data.publicUrl;
  }

  const { error } = await updateProfile({
    fullname: fullName,
    phone: phone || undefined,
    district,
    image_url: imageUrl,
  });

  if (error) {
    setError(error.message || 'Failed to update profile');
  } else {
    setSuccess(t('symptoms') === 'Symptoms' ? 'Profile updated successfully!' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ප්‍රොෆයිලය සාර්ථකව යාවත්කාලීන කරන ලදී!' : 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!'));
    setEditing(false);
  }

  setLoading(false);
};

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError(t('symptoms') === 'Symptoms' ? 'New passwords do not match' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'නව මුරපද ගැලපෙන්නේ නැත' : 'புதிய கடவுச்சொற்கள் பொருந்தவில்லை'));
      return;
    }

    if (newPassword.length < 6) {
      setError(t('symptoms') === 'Symptoms' ? 'Password must be at least 6 characters' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'මුරපදය අවම වශයෙන් අක්ෂර 6ක් විය යුතුය' : 'கடவுச்சொல் குறைந்தது 6 எழுத்துக்களைக் கொண்டிருக்க வேண்டும்'));
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setError(error.message || 'Failed to change password');
    } else {
      setSuccess(t('symptoms') === 'Symptoms' ? 'Password changed successfully!' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'මුරපදය සාර්ථකව වෙනස් කරන ලදී!' : 'கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது!'));
      setChangingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('symptoms') === 'Symptoms' ? 'Back to Dashboard' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'නැවත දත්ත පුවරුවට' : 'மீண்டும் தகவல் பலகைக்கு')}
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins mb-8">
          {t('profile_settings')}
        </h1>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Profile Section */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('personal_info')}</h2>
            {!editing && (
              <button onClick={() => setEditing(true)} className="btn-ghost">
                <Edit2 className="w-4 h-4 mr-2" />
                {t('symptoms') === 'Symptoms' ? 'Edit' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'සංස්කරණය' : 'தொகு')}
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex flex-col space-y-6">
                  {/* Public Profile Image Section */}
                  <div className="pb-6 border-b border-gray-100 dark:border-slate-700/50">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 font-poppins">
                      {t('symptoms') === 'Symptoms' ? 'Public profile' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ප්‍රසිද්ධ ප්‍රොෆයිලය' : 'பொது சுயவிவரம்')}
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md flex-shrink-0 bg-gray-100 dark:bg-slate-700 transition-shadow hover:shadow-lg flex items-center justify-center">
                        {previewUrl ? (
                          <img src={previewUrl} alt="Profile" className="object-cover w-full h-full" />
                        ) : (
                          <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2.5 bg-[#1e1b4b] hover:bg-[#2d2962] dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e1b4b] text-center"
                        >
                          {t('symptoms') === 'Symptoms' ? 'Change picture' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඡායාරූපය වෙනස් කරන්න' : 'படத்தை மாற்றவும்')}
                        </button>
                        {previewUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null);
                              setPreviewUrl('');
                            }}
                            className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-600 dark:text-gray-200 rounded-lg transition-colors text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 text-center"
                          >
                            {t('symptoms') === 'Symptoms' ? 'Delete picture' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'ඡායාරූපය මකන්න' : 'படத்தை நீக்கவும்')}
                          </button>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full Name Section */}
                  <div>
                    <label className="label">{t('full_name_label')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="input pl-12"
                        required
                      />
                    </div>
                  </div>
                </div>

              <div>
                <label className="label">{t('email_label')}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="input pl-12 bg-gray-100"
                    disabled
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{t('symptoms') === 'Symptoms' ? 'Email cannot be changed' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'විද්‍යුත් තැපෑල වෙනස් කළ නොහැක' : 'மின்னஞ்சலை மாற்ற முடியாது')}</p>
              </div>

              <div>
                <label className="label">{t('phone_label')}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input pl-12"
                    placeholder="077 123 4567"
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
                    className="input pl-12"
                  >
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

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {t('save_changes')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFullName(profile?.fullname || '');
                    setPhone(profile?.phone || '');
                    setDistrict(profile?.district || '');
                    setPreviewUrl(profile?.image_url || '');
                    setSelectedFile(null);
                  }}
                  className="btn-ghost"
                >
                  {t('cancel_btn')}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-6 pb-4 border-b border-gray-100 dark:border-slate-700/50">
<div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md bg-gray-100 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center">
  {profile?.image_url ? (
    <img src={profile.image_url} alt="Profile" className="object-cover w-full h-full" />
  ) : (
    <User className="w-10 h-10 text-gray-400 dark:text-gray-500" />
  )}
  <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    className="absolute bottom-0 right-0 p-2 bg-[#1e1b4b] hover:bg-[#2d2962] text-white rounded-full"
    aria-label="Change picture"
  >
    <Plus className="w-4 h-4" />
  </button>
  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
</div>
                <div>
                  <p className="text-xs text-gray-500">{t('full_name_label')}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">{profile?.fullname}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">{t('email_label')}</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">{t('phone_label')}</p>
                  <p className="font-medium text-gray-900">{profile?.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">{t('district_label')}</p>
                  <p className="font-medium text-gray-900">
                    {t('symptoms') === 'Symptoms' ? profile?.district : (t('symptoms') === 'රෝග ලක්ෂණ'
                      ? (profile?.district === 'Ampara' ? 'අම්පාර' : profile?.district === 'Anuradhapura' ? 'අනුරාධපුරය' : profile?.district === 'Badulla' ? 'බදුල්ල' : profile?.district === 'Batticaloa' ? 'මඩකලපුව' : profile?.district === 'Colombo' ? 'කොළඹ' : profile?.district === 'Galle' ? 'ගාල්ල' : profile?.district === 'Gampaha' ? 'ගම්පහ' : profile?.district === 'Hambantota' ? 'හම්බන්තොට' : profile?.district === 'Jaffna' ? 'යාපනය' : profile?.district === 'Kalutara' ? 'කළුතර' : profile?.district === 'Kandy' ? 'මහනුවර' : profile?.district === 'Kegalle' ? 'කෑගල්ල' : profile?.district === 'Kilinochchi' ? 'කිලිනොච්චිය' : profile?.district === 'Kurunegala' ? 'කුරුණෑගල' : profile?.district === 'Mannar' ? 'මන්නාරම' : profile?.district === 'Matale' ? 'මාතලේ' : profile?.district === 'Matara' ? 'මාතර' : profile?.district === 'Monaragala' ? 'මොනරාගල' : profile?.district === 'Mullaitivu' ? 'මුලතිව්' : profile?.district === 'Nuwara Eliya' ? 'නුවරඑළිය' : profile?.district === 'Polonnaruwa' ? 'පොළොන්නරුව' : profile?.district === 'Puttalam' ? 'පුත්තලම' : profile?.district === 'Ratnapura' ? 'රත්නපුරය' : profile?.district === 'Trincomalee' ? 'ත්‍රිකුණාමලය' : 'වවුනියාව')
                      : (profile?.district === 'Ampara' ? 'அம்பாறை' : profile?.district === 'Anuradhapura' ? 'அனுராதபுரம்' : profile?.district === 'Badulla' ? 'பதுளை' : profile?.district === 'Batticaloa' ? 'மட்டக்களப்பு' : profile?.district === 'Colombo' ? 'கொழும்பு' : profile?.district === 'Galle' ? 'காலி' : profile?.district === 'Gampaha' ? 'கம்பஹா' : profile?.district === 'Hambantota' ? 'அம்பாந்தோட்டை' : profile?.district === 'Jaffna' ? 'யாழ்ப்பாணம்' : profile?.district === 'Kalutara' ? 'களுத்துறை' : profile?.district === 'Kandy' ? 'கண்டி' : profile?.district === 'Kegalle' ? 'கேகாலை' : profile?.district === 'Kilinochchi' ? 'கிளிநொச்சி' : profile?.district === 'Kurunegala' ? 'குருணாகல்' : profile?.district === 'Mannar' ? 'மன்னார்' : profile?.district === 'Matale' ? 'மாத்தளை' : profile?.district === 'Matara' ? 'மாத்தறை' : profile?.district === 'Monaragala' ? 'மொனராகலை' : profile?.district === 'Mullaitivu' ? 'முல்லைத்தீவு' : profile?.district === 'Nuwara Eliya' ? 'நுவரெலியா' : profile?.district === 'Polonnaruwa' ? 'பொலன்னறுவை' : profile?.district === 'Puttalam' ? 'புத்தளம்' : profile?.district === 'Ratnapura' ? 'இரத்தினபுரி' : profile?.district === 'Trincomalee' ? 'திருகோணமலை' : 'வவுனியா'))}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">{t('change_password')}</h2>
            {!changingPassword && (
              <button onClick={() => setChangingPassword(true)} className="btn-ghost">
                <Lock className="w-4 h-4 mr-2" />
                {t('symptoms') === 'Symptoms' ? 'Change' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'වෙනස් කරන්න' : 'மாற்று')}
              </button>
            )}
          </div>

          {changingPassword ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="label">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input pl-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input pl-12"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {t('update_password')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChangingPassword(false);
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="btn-ghost"
                >
                  {t('cancel_btn')}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-600">
              {t('password_security_desc')}
            </p>
          )}
        </div>

        {/* Account Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            {t('account_created_on')}:{' '}
            {new Date(profile?.created_at || '').toLocaleDateString(t('symptoms') === 'Symptoms' ? 'en-LK' : (t('symptoms') === 'රෝග ලක්ෂණ' ? 'si-LK' : 'ta-LK'), {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </main>
    </div>
  );
}
