import { useState } from 'react';
import { Wallet, AlertCircle, CheckCircle, ArrowRight, ArrowLeft, Zap } from 'lucide-react';

const DigiWallet = () => {
  const [balance, setBalance] = useState(5000);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'credit', amount: 5000, desc: 'Wallet Top-up', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'debit', amount: 500, desc: 'Payment to Merchant', date: '2024-01-14', status: 'pending' },
  ]);

  const handleTransaction = (type: 'credit' | 'debit', amount: number) => {
    if (type === 'debit' && amount > balance) {
      alert('Insufficient balance');
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type,
      amount,
      desc: type === 'credit' ? 'Wallet Top-up' : 'Payment',
      date: new Date().toISOString().split('T')[0],
      status: serverStatus === 'offline' ? 'pending' : 'completed',
    };

    setTransactions([...transactions, newTransaction]);
    
    if (serverStatus === 'offline') {
      // Offline transaction - will sync when server is back
      if (type === 'debit') {
        setBalance(balance - amount);
      } else {
        setBalance(balance + amount);
      }
    } else {
      // Online transaction
      if (type === 'debit') {
        setBalance(balance - amount);
      } else {
        setBalance(balance + amount);
      }
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <Wallet className="mr-3" />
          Digi Wallet
        </h1>

        {/* Server Status */}
        <div className={`card mb-8 ${
          serverStatus === 'offline' 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {serverStatus === 'offline' ? (
                <AlertCircle className="w-12 h-12" />
              ) : (
                <CheckCircle className="w-12 h-12" />
              )}
              <div>
                <h3 className="text-2xl font-bold">
                  Bank Server: {serverStatus === 'offline' ? 'OFFLINE' : 'ONLINE'}
                </h3>
                <p className="mt-2 opacity-90">
                  {serverStatus === 'offline' 
                    ? 'Transactions will be processed offline with extra charges. Amount will be deducted when server is back.'
                    : 'All transactions are being processed in real-time.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setServerStatus(serverStatus === 'offline' ? 'online' : 'offline')}
              className="btn-primary bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white"
            >
              Toggle Status
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Wallet Balance */}
          <div className="md:col-span-2 space-y-6">
            <div className="card bg-gradient-to-br from-tata-blue to-tata-teal text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm opacity-90 mb-2">Digi Wallet Balance</p>
                  <p className="text-5xl font-bold">₹{balance.toLocaleString()}</p>
                </div>
                <Wallet className="w-20 h-20 opacity-50" />
              </div>

              {serverStatus === 'offline' && (
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <p className="text-sm">
                    <Zap className="inline w-4 h-4 mr-2" />
                    Offline mode active. Transactions will sync when server is back online.
                    Extra charges: 1% per transaction.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-semibold text-tata-blue mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleTransaction('credit', 1000)}
                  className="p-6 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-all"
                >
                  <ArrowRight className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-600">Add Money</p>
                  <p className="text-sm text-gray-600">₹1,000</p>
                </button>
                <button
                  onClick={() => handleTransaction('debit', 500)}
                  className="p-6 bg-red-50 hover:bg-red-100 rounded-lg border-2 border-red-200 transition-all"
                >
                  <ArrowLeft className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="font-semibold text-red-600">Pay</p>
                  <p className="text-sm text-gray-600">₹500</p>
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  className="input-field"
                  id="customAmount"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const amount = parseFloat((document.getElementById('customAmount') as HTMLInputElement).value);
                      if (amount > 0) handleTransaction('credit', amount);
                    }}
                    className="btn-secondary text-sm"
                  >
                    Add Custom
                  </button>
                  <button
                    onClick={() => {
                      const amount = parseFloat((document.getElementById('customAmount') as HTMLInputElement).value);
                      if (amount > 0) handleTransaction('debit', amount);
                    }}
                    className="btn-primary text-sm bg-red-500 hover:bg-red-600"
                  >
                    Pay Custom
                  </button>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div className="card">
              <h2 className="text-xl font-semibold text-tata-blue mb-4">Transaction History</h2>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowRight className="w-6 h-6 text-green-600" />
                        ) : (
                          <ArrowLeft className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.desc}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.date} • {transaction.status === 'pending' && serverStatus === 'offline' && '⏳ Pending Sync'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                      {transaction.status === 'pending' && serverStatus === 'offline' && (
                        <p className="text-xs text-orange-600">+1% charge</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="card bg-blue-50 border border-blue-200">
              <h3 className="text-lg font-semibold text-tata-blue mb-4">How It Works</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>When bank server is down, transactions work offline</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Extra 1% charge applies for offline transactions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Amount automatically syncs when server is back</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Like FamPay - seamless offline payments</span>
                </li>
              </ul>
            </div>

            <div className="card bg-gradient-to-br from-tata-blue to-tata-teal text-white">
              <h3 className="text-lg font-semibold mb-2">Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Never miss a payment</li>
                <li>✓ Works even when bank is down</li>
                <li>✓ Instant transactions</li>
                <li>✓ Secure and encrypted</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiWallet;

