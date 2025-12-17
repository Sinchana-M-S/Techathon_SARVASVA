import { useState } from 'react';
import { Heart, MapPin, CheckCircle, Search } from 'lucide-react';

const Insurance = () => {
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const insurancePlans = [
    {
      id: 'health',
      name: 'TATA Health Insurance',
      coverage: '₹10,00,000',
      premium: '₹12,000/year',
      features: ['Cashless Treatment', 'Pre & Post Hospitalization', 'Day Care Procedures'],
      eligible: true,
    },
    {
      id: 'life',
      name: 'TATA Life Insurance',
      coverage: '₹50,00,000',
      premium: '₹15,000/year',
      features: ['Term Life Coverage', 'Tax Benefits', 'Family Protection'],
      eligible: true,
    },
    {
      id: 'critical',
      name: 'TATA Critical Illness',
      coverage: '₹25,00,000',
      premium: '₹8,000/year',
      features: ['30+ Critical Illnesses', 'Lump Sum Payout', 'No Medical Tests'],
      eligible: true,
    },
  ];

  const hospitals = [
    { name: 'Apollo Hospitals', location: 'Mumbai', covered: true, distance: '2.5 km' },
    { name: 'Fortis Healthcare', location: 'Delhi', covered: true, distance: '5.1 km' },
    { name: 'Max Super Specialty', location: 'Bangalore', covered: true, distance: '3.8 km' },
    { name: 'AIIMS', location: 'Delhi', covered: true, distance: '8.2 km' },
    { name: 'TATA Memorial Hospital', location: 'Mumbai', covered: true, distance: '1.2 km' },
    { name: 'Narayana Health', location: 'Bangalore', covered: true, distance: '4.5 km' },
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <Heart className="mr-3" />
          Insurance Eligibility & Hospital Network
        </h1>

        {/* Insurance Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {insurancePlans.map((plan) => (
            <div
              key={plan.id}
              className={`card cursor-pointer transition-all ${
                selectedInsurance === plan.id ? 'ring-4 ring-tata-gold' : ''
              }`}
              onClick={() => setSelectedInsurance(plan.id)}
            >
              <div className="bg-gradient-to-r from-tata-blue to-tata-teal text-white p-6 rounded-t-xl -m-6 mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                {plan.eligible && (
                  <span className="inline-block mt-2 px-3 py-1 bg-green-500 rounded-full text-xs font-semibold">
                    ✓ Eligible
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Coverage Amount</p>
                  <p className="text-2xl font-bold text-tata-blue">{plan.coverage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Annual Premium</p>
                  <p className="text-xl font-semibold text-green-600">{plan.premium}</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full btn-primary">Apply Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Hospital Network */}
        {selectedInsurance && (
          <div className="card">
            <h2 className="text-2xl font-semibold text-tata-blue mb-6">
              Network Hospitals for {insurancePlans.find(p => p.id === selectedInsurance)?.name}
            </h2>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search hospitals by name or location..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredHospitals.map((hospital, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-200 rounded-lg hover:border-tata-blue transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hospital.location} • {hospital.distance} away
                      </p>
                    </div>
                    {hospital.covered && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Covered
                      </span>
                    )}
                  </div>
                  <button className="text-sm text-tata-blue font-semibold hover:underline">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TATA Capital Style Banner */}
        <div className="card mt-8 bg-gradient-to-r from-tata-blue to-tata-teal text-white">
          <div className="flex items-center space-x-6">
            <Heart className="w-16 h-16" />
            <div>
              <h3 className="text-3xl font-bold mb-4">Why Choose TATA Insurance?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🏥 Wide Network</h4>
                  <p className="text-sm opacity-90">10,000+ hospitals across India</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💰 Best Premiums</h4>
                  <p className="text-sm opacity-90">Competitive rates with maximum coverage</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚡ Quick Claims</h4>
                  <p className="text-sm opacity-90">Fast claim processing and cashless treatment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;

