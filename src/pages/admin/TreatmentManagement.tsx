import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Treatment, Disease } from '../../types';
import Navbar from '../../components/Navbar';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Save,
  Loader2,
  Leaf,
} from 'lucide-react';

export default function TreatmentManagement() {
  const [treatments, setTreatments] = useState<(Treatment & { disease_name?: string })[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    disease_id: '',
    organic_treatment: '',
    chemical_treatment: '',
    dosage: '',
    application_method: '',
    sri_lankan_availability: '',
    precautions: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: diseasesData } = await supabase
        .from('diseases')
        .select('id, disease_name')
        .order('disease_name');
      if (diseasesData) setDiseases(diseasesData as Disease[]);

      const { data: treatmentsData } = await supabase
        .from('treatments')
        .select('*, diseases(disease_name)')
        .order('created_at', { ascending: false });

      if (treatmentsData) {
        setTreatments(
          treatmentsData.map((t: Record<string, unknown>) => ({
            ...t,
            disease_name: (t.diseases as { disease_name: string })?.disease_name,
          })) as (Treatment & { disease_name: string })[]
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (treatment?: Treatment) => {
    if (treatment) {
      setEditingTreatment(treatment);
      setFormData({
        disease_id: treatment.disease_id,
        organic_treatment: treatment.organic_treatment || '',
        chemical_treatment: treatment.chemical_treatment || '',
        dosage: treatment.dosage || '',
        application_method: treatment.application_method || '',
        sri_lankan_availability: treatment.sri_lankan_availability || '',
        precautions: treatment.precautions || '',
      });
    } else {
      setEditingTreatment(null);
      setFormData({
        disease_id: diseases[0]?.id || '',
        organic_treatment: '',
        chemical_treatment: '',
        dosage: '',
        application_method: '',
        sri_lankan_availability: '',
        precautions: '',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTreatment(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingTreatment) {
        const { error } = await supabase
          .from('treatments')
          .update({
            disease_id: formData.disease_id,
            organic_treatment: formData.organic_treatment || null,
            chemical_treatment: formData.chemical_treatment || null,
            dosage: formData.dosage || null,
            application_method: formData.application_method || null,
            sri_lankan_availability: formData.sri_lankan_availability || null,
            precautions: formData.precautions || null,
          })
          .eq('id', editingTreatment.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('treatments').insert({
          disease_id: formData.disease_id,
          organic_treatment: formData.organic_treatment || null,
          chemical_treatment: formData.chemical_treatment || null,
          dosage: formData.dosage || null,
          application_method: formData.application_method || null,
          sri_lankan_availability: formData.sri_lankan_availability || null,
          precautions: formData.precautions || null,
        });

        if (error) throw error;
      }

      await fetchData();
      closeModal();
    } catch (error) {
      console.error('Error saving treatment:', error);
      alert('Failed to save treatment');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this treatment?')) return;

    try {
      const { error } = await supabase.from('treatments').delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error deleting treatment:', error);
      alert('Failed to delete treatment');
    }
  };

  const filteredTreatments = treatments.filter((t) =>
    t.disease_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
              Treatment Management
            </h1>
            <p className="text-gray-600 mt-1">Manage treatment recommendations</p>
          </div>
          <button onClick={() => openModal()} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Treatment
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by disease name..."
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
          <div className="grid gap-4">
            {filteredTreatments.map((treatment) => (
              <div key={treatment.id} className="card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-primary-600" />
                      <h3 className="font-semibold text-gray-900">
                        {treatment.disease_name}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {treatment.organic_treatment && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="font-medium text-green-800 mb-1">Organic Treatment</p>
                          <p className="text-green-700 line-clamp-2">
                            {treatment.organic_treatment}
                          </p>
                        </div>
                      )}
                      {treatment.chemical_treatment && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="font-medium text-blue-800 mb-1">Chemical Treatment</p>
                          <p className="text-blue-700 line-clamp-2">
                            {treatment.chemical_treatment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => openModal(treatment)}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(treatment.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-poppins">
                  {editingTreatment ? 'Edit Treatment' : 'Add Treatment'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Disease</label>
                <select
                  value={formData.disease_id}
                  onChange={(e) => setFormData({ ...formData, disease_id: e.target.value })}
                  className="input"
                  required
                >
                  <option value="">Select a disease</option>
                  {diseases.map((disease) => (
                    <option key={disease.id} value={disease.id}>
                      {disease.disease_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Organic Treatment</label>
                <textarea
                  value={formData.organic_treatment}
                  onChange={(e) => setFormData({ ...formData, organic_treatment: e.target.value })}
                  className="input min-h-[80px]"
                  placeholder="Describe organic treatment options..."
                />
              </div>

              <div>
                <label className="label">Chemical Treatment</label>
                <textarea
                  value={formData.chemical_treatment}
                  onChange={(e) => setFormData({ ...formData, chemical_treatment: e.target.value })}
                  className="input min-h-[80px]"
                  placeholder="Describe chemical treatment options..."
                />
              </div>

              <div>
                <label className="label">Dosage</label>
                <input
                  type="text"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="input"
                  placeholder="e.g., 2-3g per liter of water"
                />
              </div>

              <div>
                <label className="label">Application Method</label>
                <textarea
                  value={formData.application_method}
                  onChange={(e) => setFormData({ ...formData, application_method: e.target.value })}
                  className="input min-h-[60px]"
                  placeholder="How to apply the treatment..."
                />
              </div>

              <div>
                <label className="label">Sri Lankan Availability</label>
                <textarea
                  value={formData.sri_lankan_availability}
                  onChange={(e) => setFormData({ ...formData, sri_lankan_availability: e.target.value })}
                  className="input min-h-[60px]"
                  placeholder="Where to buy in Sri Lanka..."
                />
              </div>

              <div>
                <label className="label">Precautions</label>
                <textarea
                  value={formData.precautions}
                  onChange={(e) => setFormData({ ...formData, precautions: e.target.value })}
                  className="input min-h-[60px]"
                  placeholder="Safety precautions..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {editingTreatment ? 'Update Treatment' : 'Add Treatment'}
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
