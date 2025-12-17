import { useState } from 'react';
import { FileText, CheckCircle, Download, Upload, PenTool } from 'lucide-react';

const DigitalCheck = () => {
  const [formData, setFormData] = useState({
    payeeName: '',
    amount: '',
    accountNumber: '',
    ifscCode: '',
    date: new Date().toISOString().split('T')[0],
    memo: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.payeeName.trim()) {
      newErrors.payeeName = 'Payee name is required';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!formData.accountNumber || formData.accountNumber.length < 10) {
      newErrors.accountNumber = 'Valid account number is required';
    }
    if (!formData.ifscCode || formData.ifscCode.length !== 11) {
      newErrors.ifscCode = 'Valid IFSC code is required (11 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <FileText className="mr-3" />
          Digital Check Transaction
        </h1>

        {!isSubmitted ? (
          <div className="card">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-tata-blue mb-2">Fill Check Details</h2>
              <p className="text-gray-600">
                Transfer money digitally without manually filling physical checks. 
                Avoid mistakes and process transactions instantly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">
                    Payee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.payeeName}
                    onChange={(e) => handleInputChange('payeeName', e.target.value)}
                    className={`input-field ${errors.payeeName ? 'border-red-500' : ''}`}
                    placeholder="Enter payee name"
                  />
                  {errors.payeeName && (
                    <p className="text-red-500 text-sm mt-1">{errors.payeeName}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Amount (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className={`input-field ${errors.amount ? 'border-red-500' : ''}`}
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                    className={`input-field ${errors.accountNumber ? 'border-red-500' : ''}`}
                    placeholder="Enter account number"
                    maxLength={18}
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                    className={`input-field ${errors.ifscCode ? 'border-red-500' : ''}`}
                    placeholder="TATA0001234"
                    maxLength={11}
                  />
                  {errors.ifscCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Memo (Optional)</label>
                  <input
                    type="text"
                    value={formData.memo}
                    onChange={(e) => handleInputChange('memo', e.target.value)}
                    className="input-field"
                    placeholder="Payment for..."
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Benefits:</strong> Digital checks eliminate manual errors, process instantly, 
                  and provide digital records. Perfect for when the bank is busy!
                </p>
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  <CheckCircle className="inline mr-2" />
                  Process Check
                </button>
                <button type="button" className="btn-secondary">
                  <Download className="inline mr-2" />
                  Download Form
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="card text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-tata-blue mb-4">Check Processed Successfully!</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payee:</span>
                  <span className="font-semibold">{formData.payeeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-green-600">₹{parseFloat(formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-semibold">****{formData.accountNumber.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IFSC Code:</span>
                  <span className="font-semibold">{formData.ifscCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{formData.date}</span>
                </div>
                {formData.memo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memo:</span>
                    <span className="font-semibold">{formData.memo}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-semibold text-tata-blue">TATA{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Your digital check has been processed. The amount will be transferred within 24 hours.
            </p>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    payeeName: '',
                    amount: '',
                    accountNumber: '',
                    ifscCode: '',
                    date: new Date().toISOString().split('T')[0],
                    memo: '',
                  });
                }}
                className="btn-primary"
              >
                Create Another Check
              </button>
              <button className="btn-secondary">
                <Download className="inline mr-2" />
                Download Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalCheck;

