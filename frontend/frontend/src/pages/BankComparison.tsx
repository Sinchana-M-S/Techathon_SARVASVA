import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TrendingUp, Award, CheckCircle, Star } from 'lucide-react';

const BankComparison = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('100000');
  const [duration, setDuration] = useState('12');

  const banks = [
    {
      name: 'TATA Capital',
      interestRate: 8.5,
      processingFee: 0.5,
      features: ['Lowest Interest Rate', 'Zero Hidden Charges', 'Instant Approval', 'Flexible Repayment'],
      rating: 5,
      highlight: true,
      color: 'from-tata-blue to-tata-teal',
    },
    {
      name: 'HDFC Bank',
      interestRate: 10.2,
      processingFee: 1.0,
      features: ['Standard Rate', 'Quick Processing', 'Good Service'],
      rating: 4,
      highlight: false,
      color: 'from-blue-600 to-blue-700',
    },
    {
      name: 'ICICI Bank',
      interestRate: 10.5,
      processingFee: 1.2,
      features: ['Competitive Rate', 'Wide Network', 'Digital Services'],
      rating: 4,
      highlight: false,
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'SBI Bank',
      interestRate: 9.8,
      processingFee: 0.8,
      features: ['Government Backed', 'Stable', 'Low Risk'],
      rating: 4,
      highlight: false,
      color: 'from-blue-800 to-blue-900',
    },
  ];

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  const principal = parseFloat(amount) || 0;
  const months = parseInt(duration) || 12;

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8">Bank Comparison & Recommendations</h1>

        {/* Input Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-tata-blue mb-6">Personalized Loan Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Loan Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Loan Duration (Months)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="input-field"
                placeholder="Enter duration"
              />
            </div>
          </div>
        </div>

        {/* Emotional Manipulation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 bg-gradient-to-r from-tata-gold to-yellow-400 text-tata-blue"
        >
          <div className="flex items-center space-x-4">
            <Award className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">Why TATA Capital is Your Best Choice</h3>
              <p className="mt-2">
                Join millions of satisfied customers who trust TATA for their financial needs. 
                We've been serving customers for decades with unmatched reliability and the best interest rates in the market.
                Your financial dreams deserve the best - and that's TATA Capital.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bank Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {banks.map((bank, idx) => {
            const emi = calculateEMI(principal, bank.interestRate, months);
            const totalInterest = (emi * months) - principal;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`card ${bank.highlight ? 'ring-4 ring-tata-gold border-4 border-tata-gold' : ''} relative overflow-hidden`}
              >
                {bank.highlight && (
                  <div className="absolute top-0 right-0 bg-tata-gold text-tata-blue px-4 py-1 font-bold rounded-bl-lg">
                    RECOMMENDED
                  </div>
                )}
                
                <div className={`bg-gradient-to-r ${bank.color} text-white p-6 rounded-t-xl -m-6 mb-4`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{bank.name}</h3>
                      <div className="flex items-center mt-2">
                        {[...Array(bank.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                    {bank.highlight && <Award className="w-8 h-8" />}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="text-2xl font-bold text-tata-blue">{bank.interestRate}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-semibold">{bank.processingFee}%</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Monthly EMI:</span>
                      <span className="text-xl font-bold text-green-600">₹{emi.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-semibold text-red-600">₹{totalInterest.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="font-semibold mb-2">Key Features:</p>
                    <ul className="space-y-1">
                      {bank.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className={`w-full btn-primary ${bank.highlight ? 'bg-tata-gold text-tata-blue' : ''}`}>
                    Apply Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why TATA Section */}
        <div className="card mt-8 bg-gradient-to-r from-tata-blue to-tata-teal text-white">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <TrendingUp className="mr-3" />
            Why TATA Capital Leads the Market
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">💰 Lowest Interest Rates</h3>
              <p>Save thousands with our competitive rates. We pass on the benefits directly to you.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">⚡ Instant Approval</h3>
              <p>Get approved in minutes, not days. Our AI-powered system processes applications instantly.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🛡️ Trusted Brand</h3>
              <p>Part of the prestigious TATA Group - a name synonymous with trust and excellence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankComparison;

