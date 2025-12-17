import { useState } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, TrendingUp, Shield, Heart } from 'lucide-react';

const UpsellBot = () => {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: 'Personal Loan Top-up',
      description: 'Get additional ₹2,00,000 on your existing loan at 8.5% interest',
      benefit: 'Lowest interest rate in market',
      price: '₹2,00,000',
      category: 'Loan',
      feedback: null,
    },
    {
      id: 2,
      title: 'Health Insurance Premium',
      description: 'Protect your family with comprehensive health coverage',
      benefit: 'Coverage up to ₹10,00,000',
      price: '₹12,000/year',
      category: 'Insurance',
      feedback: null,
    },
    {
      id: 3,
      title: 'Life Insurance Policy',
      description: 'Secure your family\'s future with term life insurance',
      benefit: 'Tax benefits under Section 80C',
      price: '₹15,000/year',
      category: 'Insurance',
      feedback: null,
    },
    {
      id: 4,
      title: 'Credit Card Upgrade',
      description: 'Upgrade to TATA Premium Card with exclusive benefits',
      benefit: '5% cashback on all purchases',
      price: 'Free',
      category: 'Credit Card',
      feedback: null,
    },
  ]);

  const handleFeedback = (id: number, liked: boolean) => {
    setRecommendations(prev =>
      prev.map(rec => rec.id === id ? { ...rec, feedback: liked } : rec)
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Loan':
        return <TrendingUp className="w-6 h-6" />;
      case 'Insurance':
        return <Shield className="w-6 h-6" />;
      case 'Credit Card':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Heart className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <Sparkles className="mr-3" />
          Smart Upsell & Cross-Sell Recommendations
        </h1>

        <div className="card mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center space-x-4">
            <Sparkles className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">AI-Powered Recommendations</h3>
              <p className="mt-2 opacity-90">
                Based on your financial profile and spending patterns, we've identified personalized offers 
                that can enhance your financial security and savings.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="card hover:shadow-2xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-tata-blue bg-opacity-10 rounded-lg text-tata-blue">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-tata-blue">{rec.title}</h3>
                    <span className="text-sm text-gray-500">{rec.category}</span>
                  </div>
                </div>
                {rec.feedback !== null && (
                  <div className={`p-2 rounded-full ${
                    rec.feedback ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {rec.feedback ? <ThumbsUp className="w-5 h-5" /> : <ThumbsDown className="w-5 h-5" />}
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-4">{rec.description}</p>

              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-semibold text-tata-blue">Key Benefit:</p>
                <p className="text-sm text-gray-700">{rec.benefit}</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-tata-blue">{rec.price}</p>
                </div>
                <button className="btn-primary">Learn More</button>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t">
                <span className="text-sm text-gray-600">Was this helpful?</span>
                <button
                  onClick={() => handleFeedback(rec.id, true)}
                  className={`p-2 rounded-lg transition-colors ${
                    rec.feedback === true
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-green-100 text-gray-600'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleFeedback(rec.id, false)}
                  className={`p-2 rounded-lg transition-colors ${
                    rec.feedback === false
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-red-100 text-gray-600'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card mt-8 bg-gradient-to-r from-tata-blue to-tata-teal text-white">
          <h3 className="text-2xl font-bold mb-4">Why Choose TATA Financial Products?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">💰 Best Rates</h4>
              <p className="text-sm opacity-90">Competitive interest rates and premiums</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🛡️ Trusted Brand</h4>
              <p className="text-sm opacity-90">Part of the prestigious TATA Group</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ Quick Processing</h4>
              <p className="text-sm opacity-90">Fast approval and instant activation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpsellBot;

