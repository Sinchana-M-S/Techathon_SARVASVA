import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mic, Volume2, FileText, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleVoiceRead = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript('Document read successfully in your preferred language');
        setIsListening(false);
      }, 2000);
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'mr', name: 'मराठी' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8">Dashboard</h1>

        {/* Voice Document Reader */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-tata-blue flex items-center">
              <Mic className="mr-3" />
              Voice-Based Vernacular Document Reader
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-semibold">Select Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  i18n.changeLanguage(e.target.value);
                }}
                className="input-field w-auto"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleVoiceRead}
                className={`btn-primary ${isListening ? 'bg-red-500' : 'bg-tata-teal'}`}
              >
                {isListening ? (
                  <>
                    <Mic className="inline mr-2 animate-pulse" />
                    Listening...
                  </>
                ) : (
                  <>
                    <Mic className="inline mr-2" />
                    Start Reading Document
                  </>
                )}
              </button>

              <button className="btn-secondary">
                <Volume2 className="inline mr-2" />
                Play Audio
              </button>
            </div>

            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gray-100 rounded-lg"
              >
                <p className="text-gray-700">{transcript}</p>
              </motion.div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>How it works:</strong> Upload your document, select your preferred language, and our AI will read it aloud in your vernacular language. Perfect for understanding complex banking terms!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Account Balance</h3>
            <p className="text-3xl font-bold">₹1,25,000</p>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Credit Score</h3>
            <p className="text-3xl font-bold">780</p>
          </div>
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <h3 className="text-lg font-semibold mb-2">Active Loans</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-tata-blue mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { type: 'Credit', amount: '₹5,000', desc: 'Salary Credit', date: 'Today' },
              { type: 'Debit', amount: '₹2,500', desc: 'EMI Payment', date: 'Yesterday' },
              { type: 'Credit', amount: '₹1,200', desc: 'Interest Credit', date: '2 days ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{activity.desc}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <p className={`font-bold ${activity.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {activity.type === 'Credit' ? '+' : '-'}{activity.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

