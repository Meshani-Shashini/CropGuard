import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Disease, Crop } from '../../types';
import Navbar from '../../components/Navbar';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2,
} from 'lucide-react';

export default function DiseaseManagement() {
  const [diseases, setDiseases] = useState<(Disease & { crop_name?: string })[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    crop_id: '',
    disease_name: '',
    symptoms: '',
    causes: '',
    prevention: '',
    severity: 'medium' as 'low' | 'medium' | 'high',
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  const openModal = (disease?: Disease) => {
    if (disease) {
      setEditingDisease(disease);
      setFormData({
        crop_id: disease.crop_id,
        disease_name: disease.disease_name,
        symptoms: disease.symptoms,
        causes: disease.causes || '',
        prevention: disease.prevention || '',
        severity: disease.severity,
      });
    } else {
      setEditingDisease(null);
      setFormData({
        crop_id: crops[0]?.id || '',
        disease_name: '',
        symptoms: '',
        causes: '',
        prevention: '',
        severity: 'medium',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDisease(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingDisease) {
        const { error } = await supabase
          .from('diseases')
          .update({
            crop_id: formData.crop_id,
            disease_name: formData.disease_name,
            symptoms: formData.symptoms,
            causes: formData.causes || null,
            prevention: formData.prevention || null,
            severity: formData.severity,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingDisease.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('diseases').insert({
          crop_id: formData.crop_id,
          disease_name: formData.disease_name,
          symptoms: formData.symptoms,
          causes: formData.causes || null,
          prevention: formData.prevention || null,
          severity: formData.severity,
        });

        if (error) throw error;
      }

      await fetchData();
      closeModal();
    } catch (error) {
      console.error('Error saving disease:', error);
      alert('Failed to save disease');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this disease?')) return;

    try {
      const { error } = await supabase.from('diseases').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error deleting disease:', error);
      alert('Failed to delete disease');
    }
  };

  const filteredDiseases = diseases.filter(
    (d) =>
      d.disease_name.toLowerCase().includes(search.toLowerCase()) ||
      d.crop_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
              Disease Management
            </h1>
            <p className="text-gray-600 mt-1">Manage diseases in the database</p>
          </div>
          <button onClick={() => openModal()} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Disease
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search diseases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-12"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600" />
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="table-header">Disease Name</th>
                    <th className="table-header">Crop</th>
                    <th className="table-header">Severity</th>
                    <th className="table-header">Symptoms</th>
                    <th className="table-header w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDiseases.map((disease) => (
                    <tr key={disease.id} className="hover:bg-gray-50">
                      <td className="table-cell font-medium">{disease.disease_name}</td>
                      <td className="table-cell">
                        <span className="badge-green">{disease.crop_name}</span>
                      </td>
                      <td className="table-cell">
                        <span
                          className={`badge ${
                            disease.severity === 'high'
                              ? 'badge-red'
                              : disease.severity === 'medium'
                              ? 'badge-yellow'
                              : 'badge-green'
                          }`}
                        >
                          {disease.severity}
                        </span>
                      </td>
                      <td className="table-cell">
                        <p className="line-clamp-2 text-gray-600">{disease.symptoms}</p>
                      </td>
                      <td className="table-cell">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(disease)}
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(disease.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-poppins">
                  {editingDisease ? 'Edit Disease' : 'Add Disease'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Crop</label>
                <select
                  value={formData.crop_id}
                  onChange={(e) => setFormData({ ...formData, crop_id: e.target.value })}
                  className="input"
                  required
                >
                  {crops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.crop_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Disease Name</label>
                <input
                  type="text"
                  value={formData.disease_name}
                  onChange={(e) => setFormData({ ...formData, disease_name: e.target.value })}
                  className="input"
                  placeholder="e.g., Early Blight"
                  required
                />
              </div>

              <div>
                <label className="label">Symptoms</label>
                <textarea
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="input min-h-[80px]"
                  placeholder="Describe the symptoms..."
                  required
                />
              </div>

              <div>
                <label className="label">Causes</label>
                <textarea
                  value={formData.causes}
                  onChange={(e) => setFormData({ ...formData, causes: e.target.value })}
                  className="input min-h-[60px]"
                  placeholder="What causes this disease..."
                />
              </div>

              <div>
                <label className="label">Prevention</label>
                <textarea
                  value={formData.prevention}
                  onChange={(e) => setFormData({ ...formData, prevention: e.target.value })}
                  className="input min-h-[60px]"
                  placeholder="How to prevent this disease..."
                />
              </div>

              <div>
                <label className="label">Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) =>
                    setFormData({ ...formData, severity: e.target.value as 'low' | 'medium' | 'high' })
                  }
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {editingDisease ? 'Update Disease' : 'Add Disease'}
                </button>
                <button type="button" onClick={closeModal} className="btn-ghost">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
