import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Navbar from '../../components/Navbar';
import {
  Users,
  Scan,
  Leaf,
  AlertTriangle,
  TrendingUp,
  Loader2,
  BarChart3,
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalScans: number;
  totalDiseases: number;
  mostDetectedDisease: string;
  recentUsers: number;
  healthyPercent: number;
}

interface MonthlyData {
  month: string;
  scans: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalScans: 0,
    totalDiseases: 0,
    mostDetectedDisease: 'N/A',
    recentUsers: 0,
    healthyPercent: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [diseaseDistribution, setDiseaseDistribution] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: totalScans } = await supabase
        .from('detections')
        .select('*', { count: 'exact', head: true });

      const { count: totalDiseases } = await supabase
        .from('diseases')
        .select('*', { count: 'exact', head: true });

      const { data: detections } = await supabase
        .from('detections')
        .select('disease_name')
        .order('scan_date', { ascending: false })
        .limit(100);

      let mostDetectedDisease = 'N/A';
      let healthyCount = 0;

      if (detections && detections.length > 0) {
        const diseaseCounts: Record<string, number> = {};
        detections.forEach((d) => {
          diseaseCounts[d.disease_name] = (diseaseCounts[d.disease_name] || 0) + 1;
          if (d.disease_name === 'Healthy') healthyCount++;
        });

        const sorted = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1]);
        if (sorted.length > 0) {
          mostDetectedDisease = sorted[0][0];
        }

        const healthyPercent = detections.length > 0
          ? Math.round((healthyCount / detections.length) * 100)
          : 0;

        const topDiseases = sorted.slice(0, 5).map(([name, count]) => ({ name, count }));
        setDiseaseDistribution(topDiseases);

        setStats({
          totalUsers: totalUsers || 0,
          totalScans: totalScans || 0,
          totalDiseases: totalDiseases || 0,
          mostDetectedDisease,
          recentUsers: 0,
          healthyPercent,
        });
      }

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const simulatedMonthlyData = months.map((month, index) => ({
        month,
        scans: Math.floor(Math.random() * 50) + 10 + index * 5,
      }));
      setMonthlyData(simulatedMonthlyData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    {
      title: 'Manage Diseases',
      description: 'Add, edit, or remove diseases',
      icon: AlertTriangle,
      link: '/admin/diseases',
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'Manage Treatments',
      description: 'Update treatment recommendations',
      icon: Leaf,
      link: '/admin/treatments',
      color: 'bg-primary-100 text-primary-600',
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      link: '/admin/users',
      color: 'bg-blue-100 text-blue-600',
    },
  ];

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">System overview and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            <p className="text-gray-500 text-sm">Total Users</p>
          </div>

          <div className="stat-card">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-3">
              <Scan className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalScans}</p>
            <p className="text-gray-500 text-sm">Total Scans</p>
          </div>

          <div className="stat-card">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalDiseases}</p>
            <p className="text-gray-500 text-sm">Diseases in DB</p>
          </div>

          <div className="stat-card">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.healthyPercent}%</p>
            <p className="text-gray-500 text-sm">Healthy Rate</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Management</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className="card-hover p-4 flex items-start gap-3 group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${link.color}`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary-700">
                        {link.title}
                      </h3>
                      <p className="text-xs text-gray-500">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Monthly Scans Chart */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                Monthly Scans
              </h2>
              <div className="flex items-end gap-2 h-40">
                {monthlyData.map((data, index) => {
                  const maxScans = Math.max(...monthlyData.map((d) => d.scans));
                  const height = (data.scans / maxScans) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary-500 rounded-t-md transition-all hover:bg-primary-600"
                        style={{ height: `${height}%` }}
                      ></div>
                      <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                      <p className="text-xs font-medium text-gray-700">{data.scans}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Most Detected Disease */}
            <div className="card p-6 bg-primary-50 border border-primary-100">
              <h2 className="text-lg font-semibold text-primary-900 mb-4">
                Most Detected Disease
              </h2>
              <p className="text-2xl font-bold text-primary-700">
                {stats.mostDetectedDisease}
              </p>
            </div>

            {/* Disease Distribution */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Disease Distribution
              </h2>
              <div className="space-y-3">
                {diseaseDistribution.map((disease, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 truncate">
                      {disease.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {disease.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/detect" className="btn-primary w-full">
                  Test Detection
                </Link>
                <Link to="/knowledge" className="btn-ghost w-full">
                  Browse Knowledge Base
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
