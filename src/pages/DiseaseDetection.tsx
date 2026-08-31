import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import Navbar from '../components/Navbar';
import {
  Upload,
  Camera,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Leaf,
  Image as ImageIcon,
} from 'lucide-react';

// Colab LocalTunnel backend endpoint
const colabUrl = import.meta.env.VITE_COLAB_URL || "https://thin-pandas-wait.loca.lt";
const colabAuth = import.meta.env.VITE_COLAB_AUTH || "";

export default function DiseaseDetection() {

  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropName, setCropName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const crops = ['Tomato', 'Potato', 'Chilli', 'Brinjal', 'Cucumber'];

  const handleFileSelect = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;
    if (!cropName) {
      setError('Please select a crop type from the dropdown above before starting the scan.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!user) {
      setError('Please sign in to save scan results.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload image to Supabase storage
      let imageUrl = null;
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('detection-images')
        .upload(fileName, selectedFile);

      if (!uploadError) {
        const { data } = supabase.storage
          .from('detection-images')
          .getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      // 🚀 Colab Backend එකට Request එක යැවීම
      const formData = new FormData();
      formData.append('image', selectedFile);

      const fetchHeaders: HeadersInit = {
        'ngrok-skip-browser-warning': 'true',
        'Bypass-Tunnel-Reminder': 'true',
      };

      if (colabAuth) {
        fetchHeaders['Authorization'] = `Bearer ${colabAuth}`;
      }

      const response = await fetch(colabUrl, {
        method: 'POST',
        headers: fetchHeaders,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction request failed');
      }

      const result = await response.json();

      // 🛑 Flask එකෙන් එන Confidence එක (උදා: 0.985 හෝ "98.5%") සකසා ගැනීම
      let parsedConfidence = parseFloat(result.confidence) || 0.8;
      if (parsedConfidence <= 1.0) {
        parsedConfidence = parsedConfidence * 100; // Convert 0.985 to 98.5
      }
      const finalConfidence = Math.round(parsedConfidence * 100) / 100;

      // 🛑 Supabase එකට දත්ත ඇතුළත් කිරීම (Flask එකෙන් ලැබෙන අලුත් සිංහල/English බෙහෙත් විස්තරත් එක්කම)
      const { data: detection, error: insertError } = await supabase
        .from('detections')
        .insert({
          user_id: user.id,
          crop_name: cropName,
          disease_name: result.disease_name ?? 'Unknown',
          confidence: finalConfidence,
          severity: 'medium', // Flask එකෙන් දැනට severity එවන්නේ නැති නිසා default 'low' දැම්මා
          image_url: imageUrl,
          scan_date: new Date().toISOString(),
          // 💡 ඔයාගේ Supabase 'detections' table එකේ මේ columns 2 තියෙනවා නම් මේවාටත් දත්ත වැටෙයි:
          sinhala_treatment: result.sinhala_treatment,
          english_treatment: result.english_treatment
        })
        .select()
        .single();

      if (insertError) {
        console.error("Supabase Database Insert Error:", insertError);
        throw insertError;
      }

      navigate(`/result/${detection.id}`);
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error("Full Error Details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            {t('disease_detection_title')}
          </h1>
          <p className="text-gray-600 mt-1">
            {t('disease_detection_desc')}
          </p>
        </div>

        <div className="card p-6 md:p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Crop Selection */}
          <div className="mb-6">
            <label className="label">{t('select_crop_type')}</label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="input"
            >
              <option value="">{t('choose_a_crop')}</option>
              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {t(crop)}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload Area */}
          <div className="mb-6">
            <label className="label">{t('upload_crop_image')}</label>

            {!previewUrl ? (
              <div
                className={`uploadZone ${isDragging ? 'upload-zone-active' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    {isDragging ? (
                      <ImageIcon className="w-8 h-8 text-primary-600" />
                    ) : (
                      <Upload className="w-8 h-8 text-primary-600" />
                    )}
                  </div>
                  <p className="text-gray-700 font-medium mb-1">
                    {isDragging ? t('drag_drop_image') : t('drag_drop_image')}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">{t('or')}</p>
                  <button type="button" className="btn-secondary">
                    <Camera className="w-5 h-5 mr-2" />
                    {t('choose_image')}
                  </button>
                  <p className="text-gray-400 text-xs mt-4">
                    Supports: JPG, PNG, WEBP (Max 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-[400px] object-contain"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {t('ready_for_analysis')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={!selectedFile || loading}
            className="btn-primary w-full py-4 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t('analyzing_image')}
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5 mr-2" />
                {t('start_disease_scan')}
              </>
            )}
          </button>

          {/* Tips */}
          <div className="mt-8 p-4 bg-primary-50 rounded-xl">
            <h3 className="font-semibold text-primary-900 mb-2">{t('tips_title')}</h3>
            <ul className="text-sm text-primary-800 space-y-1">
              <li>{t('tip1')}</li>
              <li>{t('tip2')}</li>
              <li>{t('tip3')}</li>
              <li>{t('tip4')}</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
