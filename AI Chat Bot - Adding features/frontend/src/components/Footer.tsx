import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Links */}
        <div className="grid md:grid-cols-6 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Company Overview</Link></li>
              <li><Link to="/" className="hover:text-white">Leadership</Link></li>
              <li><Link to="/" className="hover:text-white">Awards & Recognition</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Careers</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Job Openings</Link></li>
              <li><Link to="/" className="hover:text-white">Life at TATA</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Media Center</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Press Releases</Link></li>
              <li><Link to="/" className="hover:text-white">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Blog</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white">Financial Insights</Link></li>
              <li><Link to="/" className="hover:text-white">Tips & Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/support" className="hover:text-white">Support</Link></li>
              <li><Link to="/appointment" className="hover:text-white">Branch Locator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-white">Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* App Downloads */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Sarvasva</h4>
              <div className="flex space-x-4">
                <button className="p-2 border border-gray-700 rounded hover:border-white transition-colors">
                  <span className="text-xs">📱 Google Play</span>
                </button>
                <button className="p-2 border border-gray-700 rounded hover:border-white transition-colors">
                  <span className="text-xs">🍎 App Store</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Moneyfy by Sarvasva</h4>
              <div className="flex space-x-4">
                <button className="p-2 border border-gray-700 rounded hover:border-white transition-colors">
                  <span className="text-xs">📱 Google Play</span>
                </button>
                <button className="p-2 border border-gray-700 rounded hover:border-white transition-colors">
                  <span className="text-xs">🍎 App Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="font-semibold mb-4">Follow us</h4>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-tata-blue transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-tata-blue transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-tata-blue transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-tata-blue transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-tata-blue transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-400">
            <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
              <Link to="/" className="hover:text-white">Legal Disclaimer</Link>
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/" className="hover:text-white">Fiscal Advisory</Link>
              <Link to="/" className="hover:text-white">Site Map</Link>
            </div>
            <p>© 2024 Sarvasva Banking Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

