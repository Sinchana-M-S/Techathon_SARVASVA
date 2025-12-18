import { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    encryptData: true,
    storeConfidential: false,
    shareAnalytics: false,
    biometricAuth: true,
    twoFactorAuth: true,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<string | null>(null);

  const handleToggle = (key: keyof typeof settings, requiresConfirmation = false) => {
    if (requiresConfirmation && !settings[key]) {
      setConfirmationType(key);
      setShowConfirmation(true);
    } else {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleConfirm = (confirm: boolean) => {
    if (confirm && confirmationType) {
      setSettings(prev => ({ ...prev, [confirmationType]: true }));
    }
    setShowConfirmation(false);
    setConfirmationType(null);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <Shield className="mr-3" />
          Privacy-Aware AI Settings
        </h1>

        <div className="card mb-8 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center space-x-4">
            <Lock className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">Your Data is Encrypted</h3>
              <p className="mt-2 opacity-90">
                All your confidential information is encrypted using bank-level security. 
                We never store sensitive data without your explicit consent.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-tata-blue">Data Encryption</h3>
                  <p className="text-sm text-gray-600">All data is encrypted by default</p>
                </div>
              </div>
              <div className={`w-14 h-8 rounded-full p-1 transition-colors ${
                settings.encryptData ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.encryptData ? 'translate-x-6' : ''
                }`} />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              ✓ Enabled by default - Your data is always encrypted using AES-256 encryption
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-tata-blue">Store Confidential Information</h3>
                  <p className="text-sm text-gray-600">Allow storing sensitive data (requires confirmation)</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('storeConfidential', true)}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  settings.storeConfidential ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.storeConfidential ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {settings.storeConfidential 
                ? '⚠️ Confidential data storage is enabled. Your sensitive information will be stored securely.'
                : '✓ Disabled by default - We will ask for confirmation before storing any confidential data'}
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-tata-blue">Share Analytics Data</h3>
                  <p className="text-sm text-gray-600">Help improve services (anonymized data only)</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('shareAnalytics')}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  settings.shareAnalytics ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.shareAnalytics ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-tata-blue">Biometric Authentication</h3>
                  <p className="text-sm text-gray-600">Use fingerprint or face recognition</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('biometricAuth')}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  settings.biometricAuth ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.biometricAuth ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-teal-100 rounded-lg text-teal-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-tata-blue">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Extra layer of security</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${
                  settings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card max-w-md mx-4 bg-white">
              <div className="text-center">
                <Shield className="w-16 h-16 text-tata-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-tata-blue mb-4">Confirm Storage</h3>
                <p className="text-gray-600 mb-6">
                  Do you want to allow storing confidential information? 
                  This data will be encrypted and stored securely.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleConfirm(false)}
                    className="flex-1 btn-secondary bg-gray-500 hover:bg-gray-600"
                  >
                    <XCircle className="inline mr-2" />
                    Don't Store
                  </button>
                  <button
                    onClick={() => handleConfirm(true)}
                    className="flex-1 btn-primary"
                  >
                    <CheckCircle className="inline mr-2" />
                    Allow Storage
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card mt-8 bg-blue-50 border border-blue-200">
          <h3 className="text-lg font-semibold text-tata-blue mb-2">Privacy Summary</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              All data is encrypted by default
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Confidential data requires explicit consent
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              You have full control over your data
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No data is shared without permission
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;

