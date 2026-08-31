import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Leaf, Menu, X, LogOut, User, Shield, Globe, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home', key: 'home' },
    { path: '/#features', label: 'Features', key: 'features', isAnchor: true },
    { path: '/#about', label: 'About', key: 'about', isAnchor: true },
    { path: '/forgot-password', label: 'Forgot Password', key: 'forgot_password' },
  ];

  const userLinks = [
    { path: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { path: '/detect', label: 'Scan Disease', key: 'scan_disease' },
    { path: '/crops', label: 'Crops', key: 'crops' },
    { path: '/knowledge', label: 'Knowledge Base', key: 'knowledge_base' },
  ];

  const LanguageSelector = () => (
    <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1 dark:bg-slate-800 dark:border-slate-700">
      <Globe className="w-3.5 h-3.5 text-gray-400 mx-1 hidden sm:inline dark:text-gray-500" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
          language === 'en' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('si')}
        className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
          language === 'si' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        }`}
      >
        සිං
      </button>
      <button
        onClick={() => setLanguage('ta')}
        className={`px-2 py-0.5 text-xs font-semibold rounded transition-colors ${
          language === 'ta' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
        }`}
      >
        தமிழ்
      </button>
    </div>
  );

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 font-poppins dark:text-white">
              CropGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5">
            {!user ? (
              <>
                {publicLinks.map((link) =>
                  link.isAnchor ? (
                    <a
                      key={link.path}
                      href={link.path}
                      className="nav-link"
                    >
                      {t(link.key)}
                    </a>
                  ) : (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
                    >
                      {t(link.key)}
                    </Link>
                  )
                )}
                <LanguageSelector />
                <ThemeToggle />
                <Link to="/login" className="btn-ghost">
                  {t('login')}
                </Link>
                <Link to="/register" className="btn-primary">
                  {t('get_started')}
                </Link>
              </>
            ) : (
              <>
                {userLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`nav-link flex items-center gap-1 ${isActive('/admin') ? 'nav-link-active' : ''}`}
                  >
                    <Shield className="w-4 h-4" />
                    {t('admin')}
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200 dark:border-slate-800">
                  <LanguageSelector />
                  <ThemeToggle />
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    {profile?.image_url ? (
                      <img src={profile.image_url} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-gray-200 dark:border-slate-700" />
                    ) : (
                      <User className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="font-medium">{profile?.fullname}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-500 hover:text-gray-700 p-2 dark:text-gray-400 dark:hover:text-gray-200"
                    title={t('sign_out')}
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu and selector row */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            <button
              className="p-2 text-gray-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-100 dark:border-slate-800 px-4">
          {!user ? (
            <div className="flex flex-col gap-3">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              <hr className="my-2 dark:border-slate-800" />
              <Link
                to="/login"
                className="btn-ghost w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="btn-primary w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('get_started')}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {userLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="nav-link py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Shield className="w-4 h-4" />
                  {t('admin_panel')}
                </Link>
              )}
              <hr className="my-2 dark:border-slate-800" />
              <Link
                to="/profile"
                className="nav-link py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {profile?.image_url ? (
                  <img src={profile.image_url} alt="Profile" className="w-5 h-5 rounded-full object-cover border border-gray-200 dark:border-slate-700" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                {profile?.fullname}
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="nav-link py-2 flex items-center gap-2 text-left"
              >
                <LogOut className="w-4 h-4" />
                {t('sign_out')}
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
