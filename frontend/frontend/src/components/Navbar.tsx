import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Menu, X, Globe, User, Bell, Search } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  return (
    <nav className="bg-tata-blue text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">Sarvasva</div>
            <div className="text-sm opacity-90">Banking</div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-tata-gold transition-colors">Loans For You</Link>
            <Link to="/bank-comparison" className="hover:text-tata-gold transition-colors">Loans For Business</Link>
            <Link to="/upsell" className="hover:text-tata-gold transition-colors">Wealth & Investments</Link>
            <Link to="/map" className="hover:text-tata-gold transition-colors">Map</Link>
            <Link to="/wallet" className="hover:text-tata-gold transition-colors">Wallet</Link>
            
            <div className="flex items-center space-x-4 ml-4">
              <button className="hover:text-tata-gold transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="hover:text-tata-gold transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="hover:text-tata-gold transition-colors">
                <span className="text-sm font-semibold">G</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-1 hover:text-tata-gold transition-colors text-sm"
                >
                  <span>ENG</span>
                  <span className="text-xs">(IN)</span>
                </button>
                
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full text-left px-4 py-2 hover:bg-tata-blue hover:text-white transition-colors flex items-center space-x-2"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/dashboard" className="btn-primary bg-tata-gold text-tata-blue hover:bg-opacity-90 px-4 py-2 text-sm">
                Login
              </Link>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-tata-blue border-t border-blue-700">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 hover:text-tata-gold">{t('nav.home')}</Link>
            <Link to="/dashboard" className="block py-2 hover:text-tata-gold">{t('nav.dashboard')}</Link>
            <Link to="/bank-comparison" className="block py-2 hover:text-tata-gold">{t('nav.services')}</Link>
            <Link to="/support" className="block py-2 hover:text-tata-gold">{t('nav.support')}</Link>
            <div className="pt-2 border-t border-blue-700">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className="block w-full text-left py-2 hover:text-tata-gold"
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

