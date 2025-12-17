import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CreditTwin = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const spendData = [
    { name: 'Jan', credit: 25000, debit: 18000 },
    { name: 'Feb', credit: 30000, debit: 22000 },
    { name: 'Mar', credit: 28000, debit: 20000 },
    { name: 'Apr', credit: 35000, debit: 25000 },
    { name: 'May', credit: 32000, debit: 23000 },
    { name: 'Jun', credit: 38000, debit: 28000 },
  ];

  const categoryData = [
    { name: 'Food', amount: 12000, color: '#FF6B6B' },
    { name: 'Shopping', amount: 15000, color: '#4ECDC4' },
    { name: 'Bills', amount: 8000, color: '#45B7D1' },
    { name: 'Entertainment', amount: 5000, color: '#FFA07A' },
    { name: 'Transport', amount: 6000, color: '#98D8C8' },
  ];

  const transactions = [
    { type: 'Credit', amount: 5000, desc: 'Salary', date: '2024-01-15', category: 'Income' },
    { type: 'Debit', amount: 2500, desc: 'Grocery Shopping', date: '2024-01-14', category: 'Food' },
    { type: 'Debit', amount: 1500, desc: 'Electricity Bill', date: '2024-01-13', category: 'Bills' },
    { type: 'Credit', amount: 2000, desc: 'Freelance Payment', date: '2024-01-12', category: 'Income' },
    { type: 'Debit', amount: 3000, desc: 'Online Shopping', date: '2024-01-11', category: 'Shopping' },
  ];

  const totalCredit = transactions.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalCredit - totalDebit;

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <CreditCard className="mr-3" />
          Credit Twin - Spend Tracking
        </h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Credit</p>
                <p className="text-3xl font-bold">₹{totalCredit.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Debit</p>
                <p className="text-3xl font-bold">₹{totalDebit.toLocaleString()}</p>
              </div>
              <TrendingDown className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Balance</p>
                <p className="text-3xl font-bold">₹{balance.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 opacity-80" />
            </div>
          </div>
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Savings Rate</p>
                <p className="text-3xl font-bold">{((balance / totalCredit) * 100).toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-12 h-12 opacity-80" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-tata-blue mb-4">Credit vs Debit Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="credit" stroke="#10B981" strokeWidth={2} name="Credit" />
                <Line type="monotone" dataKey="debit" stroke="#EF4444" strokeWidth={2} name="Debit" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-tata-blue mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-tata-blue mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((transaction, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'Credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'Credit' ? (
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{transaction.desc}</p>
                    <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${
                  transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditTwin;

