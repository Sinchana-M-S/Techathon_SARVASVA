import { useState } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [scenario, setScenario] = useState('optimistic');

  const scenarios = {
    optimistic: {
      name: 'Optimistic',
      data: [
        { month: 'Jan', current: 50000, optimized: 50000 },
        { month: 'Feb', current: 52000, optimized: 55000 },
        { month: 'Mar', current: 54000, optimized: 60000 },
        { month: 'Apr', current: 56000, optimized: 65000 },
        { month: 'May', current: 58000, optimized: 70000 },
        { month: 'Jun', current: 60000, optimized: 75000 },
      ],
      color: '#10B981',
    },
    realistic: {
      name: 'Realistic',
      data: [
        { month: 'Jan', current: 50000, optimized: 50000 },
        { month: 'Feb', current: 52000, optimized: 53000 },
        { month: 'Mar', current: 54000, optimized: 56000 },
        { month: 'Apr', current: 56000, optimized: 59000 },
        { month: 'May', current: 58000, optimized: 62000 },
        { month: 'Jun', current: 60000, optimized: 65000 },
      ],
      color: '#3B82F6',
    },
    conservative: {
      name: 'Conservative',
      data: [
        { month: 'Jan', current: 50000, optimized: 50000 },
        { month: 'Feb', current: 52000, optimized: 52500 },
        { month: 'Mar', current: 54000, optimized: 55000 },
        { month: 'Apr', current: 56000, optimized: 57500 },
        { month: 'May', current: 58000, optimized: 60000 },
        { month: 'Jun', current: 60000, optimized: 62500 },
      ],
      color: '#F59E0B',
    },
  };

  const currentData = scenarios[scenario as keyof typeof scenarios].data;
  const currentValue = currentData[currentData.length - 1].current;
  const optimizedValue = currentData[currentData.length - 1].optimized;
  const difference = optimizedValue - currentValue;
  const percentage = ((difference / currentValue) * 100).toFixed(1);

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8">AI Ghost Transaction Simulator</h1>

        <div className="card mb-8">
          <p className="text-gray-600 mb-6">
            Visualize how your financial decisions could impact your future. Compare current trajectory with AI-optimized scenarios.
          </p>

          <div className="flex items-center space-x-4 mb-6">
            <label className="font-semibold">Scenario:</label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="input-field w-auto"
            >
              <option value="optimistic">Optimistic</option>
              <option value="realistic">Realistic</option>
              <option value="conservative">Conservative</option>
            </select>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`btn-primary ${isRunning ? 'bg-red-500' : 'bg-tata-teal'}`}
            >
              {isRunning ? (
                <>
                  <Pause className="inline mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="inline mr-2" />
                  Simulate
                </>
              )}
            </button>

            <button className="btn-secondary">
              <RotateCcw className="inline mr-2" />
              Reset
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="card bg-blue-50">
              <p className="text-sm text-gray-600 mb-1">Current Projection</p>
              <p className="text-2xl font-bold text-tata-blue">₹{currentValue.toLocaleString()}</p>
            </div>
            <div className="card bg-green-50">
              <p className="text-sm text-gray-600 mb-1">Optimized Projection</p>
              <p className="text-2xl font-bold text-green-600">₹{optimizedValue.toLocaleString()}</p>
            </div>
            <div className="card bg-purple-50">
              <p className="text-sm text-gray-600 mb-1">Potential Gain</p>
              <p className="text-2xl font-bold text-purple-600">
                +₹{difference.toLocaleString()} ({percentage}%)
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={currentData}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="current" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCurrent)" name="Current Path" />
              <Area type="monotone" dataKey="optimized" stroke="#10B981" fillOpacity={1} fill="url(#colorOptimized)" name="AI Optimized Path" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-tata-blue mb-4">Key Insights</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">Smart Investment Opportunities</p>
                  <p className="text-sm text-gray-600">AI identified 3 high-yield investment options</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingDown className="w-5 h-5 text-red-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">Expense Optimization</p>
                  <p className="text-sm text-gray-600">Reduce unnecessary expenses by 15%</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="w-5 h-5 text-blue-500 mr-2 mt-1" />
                <div>
                  <p className="font-semibold">Debt Management</p>
                  <p className="text-sm text-gray-600">Restructure loans to save ₹5,000/month</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-tata-blue mb-4">Recommended Actions</h2>
            <ul className="space-y-3">
              <li className="p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold">Switch to TATA Savings Account</p>
                <p className="text-sm text-gray-600">Get 0.5% higher interest rate</p>
              </li>
              <li className="p-3 bg-green-50 rounded-lg">
                <p className="font-semibold">Invest in TATA Mutual Funds</p>
                <p className="text-sm text-gray-600">Expected 12% annual returns</p>
              </li>
              <li className="p-3 bg-purple-50 rounded-lg">
                <p className="font-semibold">Consolidate Credit Cards</p>
                <p className="text-sm text-gray-600">Save on interest charges</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSimulator;

