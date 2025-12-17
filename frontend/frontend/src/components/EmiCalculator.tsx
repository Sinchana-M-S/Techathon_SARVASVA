import { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowRight, Info } from 'lucide-react';

type TenureMode = 'Y' | 'M';

const COLORS = ['#2563EB', '#FACC15']; // principal blue, interest yellow

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

type LoanTypeKey = 'personal' | 'home' | 'business' | 'car' | 'twoWheeler';

type LoanTypeConfig = {
  label: string;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  maxYears: number;
};

const LOAN_TYPES: Record<LoanTypeKey, LoanTypeConfig> = {
  personal: {
    label: 'Personal Loan',
    minAmount: 40000,
    maxAmount: 3500000,
    defaultAmount: 100000,
    minRate: 10.99,
    maxRate: 24,
    defaultRate: 10.99,
    maxYears: 6,
  },
  home: {
    label: 'Home Loan',
    minAmount: 500000,
    maxAmount: 20000000,
    defaultAmount: 2500000,
    minRate: 8.25,
    maxRate: 12,
    defaultRate: 8.5,
    maxYears: 30,
  },
  business: {
    label: 'Business Loan',
    minAmount: 100000,
    maxAmount: 5000000,
    defaultAmount: 500000,
    minRate: 11,
    maxRate: 24,
    defaultRate: 12.5,
    maxYears: 8,
  },
  car: {
    label: 'Car Loan',
    minAmount: 100000,
    maxAmount: 2000000,
    defaultAmount: 600000,
    minRate: 8.5,
    maxRate: 14,
    defaultRate: 9.25,
    maxYears: 7,
  },
  twoWheeler: {
    label: 'Two Wheeler Loan',
    minAmount: 30000,
    maxAmount: 300000,
    defaultAmount: 90000,
    minRate: 9.5,
    maxRate: 20,
    defaultRate: 11.5,
    maxYears: 5,
  },
};

const EmiCalculator = () => {
  const [loanType, setLoanType] = useState<LoanTypeKey>('personal');

  // EMI calculator state
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10.99);
  const [tenureMode, setTenureMode] = useState<TenureMode>('Y');
  const [tenureValue, setTenureValue] = useState<number>(2); // years or months depending on mode
  const [extraEmi, setExtraEmi] = useState<number>(0);
  const [stressDeltaRate, setStressDeltaRate] = useState<0 | 1 | 2>(0); // 0, +1%, +2%

  // Tool selector
  const [activeTool, setActiveTool] = useState<'emi' | 'prepay' | 'eligibility'>('emi');

  // Pre‑payment state (Tata-style layout, our own rules)
  const [disbursedDate, setDisbursedDate] = useState<string>('2023-08-11');
  const [prepayDate, setPrepayDate] = useState<string>('2025-06-03');
  const [disbursedAmount, setDisbursedAmount] = useState<number>(354579);
  const [currentPartPayment, setCurrentPartPayment] = useState<number>(4000);
  const [pastPrepayments, setPastPrepayments] = useState<number>(168984);

  // Eligibility state
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [existingEmi, setExistingEmi] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(20000);
  const [employerType, setEmployerType] = useState<string>('Employer Name');

  // UX: audit trail / summary
  const [lastSimulatedAt, setLastSimulatedAt] = useState<string>(
    new Date().toLocaleString(),
  );

  const {
    emi,
    totalPayment,
    totalInterest,
    months,
    emiWithPrepay,
    totalPaymentWithPrepay,
    totalInterestWithPrepay,
  } = useMemo(() => {
    const monthsBase = tenureMode === 'Y' ? tenureValue * 12 : tenureValue;
    const r = interestRate / 12 / 100;
    const n = Math.max(monthsBase, 1);

    const calcEmi = (principal: number) => {
      if (r === 0) return principal / n;
      const pow = Math.pow(1 + r, n);
      return (principal * r * pow) / (pow - 1);
    };

    const baseEmi = calcEmi(loanAmount);
    const baseTotalPayment = baseEmi * n;
    const baseTotalInterest = baseTotalPayment - loanAmount;

    // Simple prepayment model: assume fixed extra EMI every month, re-calc using shorter effective tenure
    let prepayEmi = baseEmi + extraEmi;
    let prepayMonths = 0;
    let balance = loanAmount;
    if (prepayEmi > 0 && r >= 0) {
      while (balance > 0 && prepayMonths < 600) {
        const interestComponent = balance * r;
        const principalComponent = Math.max(prepayEmi - interestComponent, 0);
        balance -= principalComponent;
        prepayMonths += 1;
      }
      const totalPaid = prepayEmi * prepayMonths;
      const interestPaid = totalPaid - loanAmount;
      return {
        emi: baseEmi,
        totalPayment: baseTotalPayment,
        totalInterest: baseTotalInterest,
        months: n,
        emiWithPrepay: prepayEmi,
        totalPaymentWithPrepay: totalPaid,
        totalInterestWithPrepay: interestPaid,
      };
    }

    return {
      emi: baseEmi,
      totalPayment: baseTotalPayment,
      totalInterest: baseTotalInterest,
      months: n,
      emiWithPrepay: 0,
      totalPaymentWithPrepay: 0,
      totalInterestWithPrepay: 0,
    };
  }, [loanAmount, interestRate, tenureMode, tenureValue, extraEmi]);

  const pieData = [
    { name: 'Principal', value: loanAmount },
    { name: 'Interest', value: totalInterest },
  ];

  const savings =
    totalInterestWithPrepay > 0 ? totalInterest - totalInterestWithPrepay : 0;

  // Our own pre‑payment rules (simple & banker‑friendly):
  // - Customer can prepay up to 25% of disbursedAmount in a year with NO charges.
  // - Any amount above that in the current+past prepayments is "chargeable part".
  // - We apply a flat 4.5% charge on the chargeable part.
  const totalPartPrepaid = currentPartPayment + pastPrepayments;
  const noChargeLimit = disbursedAmount * 0.25;
  const chargeablePart = Math.max(0, totalPartPrepaid - noChargeLimit);
  const within25 = totalPartPrepaid <= noChargeLimit;
  const finalChargeRate = chargeablePart > 0 ? 4.5 : 0;
  const finalChargesAmount = (chargeablePart * finalChargeRate) / 100;

  // Simple eligibility: FOIR 40% of income minus existing EMIs
  const foir = 0.4;
  const maxEligibleEmi = Math.max(monthlyIncome * foir - existingEmi, 0);
  const monthsForEligibility =
    tenureMode === 'Y' ? Math.max(1, tenureValue * 12) : Math.max(1, tenureValue);
  const rEligibility = interestRate / 12 / 100;

  const baseEligibleLoanAmount =
    maxEligibleEmi === 0
      ? 0
      : rEligibility === 0
      ? maxEligibleEmi * monthsForEligibility
      : (maxEligibleEmi *
          (Math.pow(1 + rEligibility, monthsForEligibility) - 1)) /
        (rEligibility * Math.pow(1 + rEligibility, monthsForEligibility));

  // Employer-based adjustment
  const employerMultiplier =
    employerType === 'Government / PSU'
      ? 1.1
      : employerType === 'MNC / Listed Company'
      ? 1.08
      : employerType === 'Self Employed'
      ? 0.9
      : 1;

  const eligibleLoanAmount = baseEligibleLoanAmount * employerMultiplier;

  // Healthy EMI band (35–45% of surplus income after expenses)
  const surplusIncome = Math.max(monthlyIncome - monthlyExpenses - existingEmi, 0);
  const safeEmiMin = surplusIncome * 0.35;
  const safeEmiMax = surplusIncome * 0.45;

  // Months used for stress‑test EMI (same tenure as main EMI)
  const monthsForEmi = months || 1;

  // Stress test EMI (rate hike +1% / +2%)
  const stressRate = interestRate + stressDeltaRate;
  const stressMonthlyRate = stressRate / 12 / 100;
  const stressEmi =
    stressMonthlyRate === 0
      ? loanAmount / monthsForEmi
      : (loanAmount *
          stressMonthlyRate *
          Math.pow(1 + stressMonthlyRate, monthsForEmi)) /
        (Math.pow(1 + stressMonthlyRate, monthsForEmi) - 1);

  // Healthy / Aggressive / Risky label based on EMI vs surplus income
  const effectiveIncome = surplusIncome || monthlyIncome;
  const emiRatio = effectiveIncome > 0 ? emi / effectiveIncome : 0;
  let emiRiskLabel: 'Safe' | 'Aggressive' | 'Risky' = 'Safe';
  if (emiRatio > 0.6) {
    emiRiskLabel = 'Risky';
  } else if (emiRatio > 0.4) {
    emiRiskLabel = 'Aggressive';
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
      {/* Loan type selector (dropdown) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Loan type
          </label>
          <select
            value={loanType}
            onChange={(e) => {
              const tKey = e.target.value as LoanTypeKey;
              const cfgNew = LOAN_TYPES[tKey];
              setLoanType(tKey);
              setLoanAmount((prev) =>
                Math.min(Math.max(prev, cfgNew.minAmount), cfgNew.maxAmount),
              );
              setInterestRate((prev) =>
                Math.min(Math.max(prev, cfgNew.minRate), cfgNew.maxRate),
              );
            }}
            className="input-field max-w-xs"
          >
            {Object.entries(LOAN_TYPES).map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="px-4 py-2 rounded-full bg-tata-blue text-white text-xs md:text-sm font-semibold">
          {LOAN_TYPES[loanType].label}
        </span>
        <button
          onClick={() => setActiveTool('emi')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeTool === 'emi'
              ? 'bg-blue-50 text-tata-blue'
              : 'bg-transparent text-gray-500 hover:text-tata-blue'
          }`}
        >
          EMI Calculator
        </button>
        <button
          onClick={() => setActiveTool('prepay')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeTool === 'prepay'
              ? 'bg-blue-50 text-tata-blue'
              : 'bg-transparent text-gray-500 hover:text-tata-blue'
          }`}
        >
          Pre-payment Calculator
        </button>
        <button
          onClick={() => setActiveTool('eligibility')}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            activeTool === 'eligibility'
              ? 'bg-blue-50 text-tata-blue'
              : 'bg-transparent text-gray-500 hover:text-tata-blue'
          }`}
        >
          Eligibility Calculator
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left form */}
        <div className="space-y-6">
          {/* Loan amount (EMI tab only) */}
          {activeTool === 'emi' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan amount
              </label>
              <div className="flex items-center mb-2">
                <span className="px-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  className="input-field rounded-l-none max-w-xs"
                  value={loanAmount}
                  min={LOAN_TYPES[loanType].minAmount}
                  max={LOAN_TYPES[loanType].maxAmount}
                  step={5000}
                  onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                />
              </div>
              <input
                type="range"
                className="w-full accent-[#FFD54F]"
                min={LOAN_TYPES[loanType].minAmount}
                max={LOAN_TYPES[loanType].maxAmount}
                step={10000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatCurrency(LOAN_TYPES[loanType].minAmount)}</span>
                <span>{formatCurrency(LOAN_TYPES[loanType].maxAmount)}</span>
              </div>
            </div>
          )}

          {/* Tenure (EMI + Eligibility) */}
          {activeTool !== 'prepay' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan duration
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="number"
                  className="input-field max-w-[120px]"
                  value={tenureValue}
                  min={1}
                  max={tenureMode === 'Y' ? 6 : 72}
                  onChange={(e) => setTenureValue(Number(e.target.value) || 0)}
                />
                <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setTenureMode('Y')}
                    className={`px-4 py-2 text-sm font-semibold ${
                      tenureMode === 'Y'
                        ? 'bg-tata-blue text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    Yr
                  </button>
                  <button
                    onClick={() => setTenureMode('M')}
                    className={`px-4 py-2 text-sm font-semibold ${
                      tenureMode === 'M'
                        ? 'bg-tata-blue text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    Mo
                  </button>
                </div>
              </div>
              <input
                type="range"
                className="w-full accent-[#FFD54F]"
                min={1}
                max={tenureMode === 'Y' ? 6 : 72}
                value={tenureValue}
                onChange={(e) => setTenureValue(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{tenureMode === 'Y' ? '1 Year' : '1 Month'}</span>
                <span>{tenureMode === 'Y' ? '6 Years' : '72 Months'}</span>
              </div>
            </div>
          )}

          {/* Rate (EMI + Eligibility) */}
          {activeTool !== 'prepay' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rate of interest
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  className="input-field max-w-[140px] rounded-r-none"
                  value={interestRate}
                  min={LOAN_TYPES[loanType].minRate}
                  max={LOAN_TYPES[loanType].maxRate}
                  step={0.1}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                />
                <span className="px-3 py-2 border border-gray-200 rounded-r-lg bg-gray-50 text-sm">
                  %
                </span>
              </div>
              <input
                type="range"
                className="w-full accent-[#FFD54F]"
                min={LOAN_TYPES[loanType].minRate}
                max={LOAN_TYPES[loanType].maxRate}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{LOAN_TYPES[loanType].minRate.toFixed(2)}% p.a</span>
                <span>{LOAN_TYPES[loanType].maxRate.toFixed(2)}% p.a</span>
              </div>
            </div>
          )}

          {/* Extra EMI / prepayment (EMI mode only – interest saving simulator) */}
          {activeTool === 'emi' && (
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Optional: Extra EMI for faster closure
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  className="input-field max-w-[160px]"
                  value={extraEmi}
                  min={0}
                  step={500}
                  onChange={(e) => setExtraEmi(Number(e.target.value) || 0)}
                />
                <span className="text-xs text-gray-500">
                  Add extra amount to see interest saved
                </span>
              </div>
            </div>
          )}

          {/* Pre‑payment inputs (Tata-style) */}
          {activeTool === 'prepay' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Disbursement Date
                </label>
                <input
                  type="date"
                  className="input-field max-w-xs"
                  value={disbursedDate}
                  onChange={(e) => setDisbursedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Disbursed Loan
                </label>
                <div className="flex items-center mb-2">
                  <span className="px-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="input-field rounded-l-none max-w-xs"
                    value={disbursedAmount}
                    min={LOAN_TYPES[loanType].minAmount}
                    max={LOAN_TYPES[loanType].maxAmount}
                    step={5000}
                    onChange={(e) => setDisbursedAmount(Number(e.target.value) || 0)}
                  />
                </div>
                <input
                  type="range"
                  className="w-full accent-[#FFD54F]"
                  min={LOAN_TYPES[loanType].minAmount}
                  max={LOAN_TYPES[loanType].maxAmount}
                  step={10000}
                  value={disbursedAmount}
                  onChange={(e) => setDisbursedAmount(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatCurrency(LOAN_TYPES[loanType].minAmount)}</span>
                  <span>{formatCurrency(LOAN_TYPES[loanType].maxAmount)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Part Prepayment Date
                </label>
                <input
                  type="date"
                  className="input-field max-w-xs"
                  value={prepayDate}
                  onChange={(e) => setPrepayDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Part Payment
                </label>
                <div className="flex items-center mb-2">
                  <span className="px-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="input-field rounded-l-none max-w-xs"
                    value={currentPartPayment}
                    min={0}
                    max={disbursedAmount}
                    step={1000}
                    onChange={(e) => setCurrentPartPayment(Number(e.target.value) || 0)}
                  />
                </div>
                <input
                  type="range"
                  className="w-full accent-[#FFD54F]"
                  min={0}
                  max={disbursedAmount}
                  step={1000}
                  value={currentPartPayment}
                  onChange={(e) => setCurrentPartPayment(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>{formatCurrency(disbursedAmount)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sum of Past Prepayments
                </label>
                <div className="flex items-center mb-2">
                  <span className="px-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="input-field rounded-l-none max-w-xs"
                    value={pastPrepayments}
                    min={0}
                    max={disbursedAmount}
                    step={1000}
                    onChange={(e) => setPastPrepayments(Number(e.target.value) || 0)}
                  />
                </div>
                <input
                  type="range"
                  className="w-full accent-[#FFD54F]"
                  min={0}
                  max={disbursedAmount}
                  step={1000}
                  value={pastPrepayments}
                  onChange={(e) => setPastPrepayments(Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>{formatCurrency(disbursedAmount)}</span>
                </div>
              </div>
            </>
          )}

          {/* Eligibility inputs */}
          {activeTool === 'eligibility' && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Monthly income
                </label>
                <input
                  type="number"
                  className="input-field max-w-xs"
                  value={monthlyIncome}
                  min={0}
                  step={1000}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Existing EMIs (per month)
                </label>
                <input
                  type="number"
                  className="input-field max-w-xs"
                  value={existingEmi}
                  min={0}
                  step={500}
                  onChange={(e) => setExistingEmi(Number(e.target.value) || 0)}
                />
              </div>
              <p className="text-xs text-gray-500">
                We assume a FOIR (Fixed Obligations to Income Ratio) of 40% for eligibility
                calculation.
              </p>
            </div>
          )}
        </div>

        {/* Right result / chart - varies by active tool */}
        <div className="space-y-4">
          {activeTool === 'emi' && (
            <div className="rounded-2xl bg-[#4CAF50] text-white px-6 py-5 text-center shadow-md">
              <p className="text-sm mb-1">Monthly EMI</p>
              <p className="text-3xl md:text-4xl font-bold">
                {formatCurrency(emi || 0)}
                <span className="text-base align-top ml-1">*</span>
              </p>
            </div>
          )}

          {activeTool === 'emi' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Amount Payable</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(totalPayment)}
                    <span className="text-xs align-top ml-1">*</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total Interest Payable</p>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(totalInterest)}
                    <span className="text-xs align-top ml-1">*</span>
                  </p>
                </div>
              </div>

              {extraEmi > 0 && savings > 0 && (
                <div className="mt-2 rounded-lg bg-green-50 border border-green-100 p-3 text-xs flex items-start space-x-2">
                  <Info className="w-4 h-4 text-green-600 mt-0.5" />
                  <p className="text-green-800">
                    With an extra EMI of <strong>{formatCurrency(extraEmi)}</strong> you can save
                    approximately <strong>{formatCurrency(savings)}</strong> in interest and close
                    your loan earlier.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTool === 'prepay' && (
            <>
              <div className="rounded-2xl bg-[#1D4ED8] text-white px-6 py-5 shadow-md space-y-1">
                <p className="text-xs font-semibold">25% of the disbursed amount</p>
                <p className="text-xs opacity-80">(No charges applicable)</p>
                <p className="text-xs mt-1 opacity-90">Within Lock-in Period after 12 months</p>
                <p className="text-3xl font-bold mt-2">
                  {formatCurrency(noChargeLimit)}
                  <span className="text-base align-top ml-1">*</span>
                </p>
              </div>

              <div className="rounded-2xl bg-[#16A34A] text-white px-6 py-5 shadow-md grid md:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-xs font-semibold">
                    Chargeable Part Prepayment Amount
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(chargeablePart)}
                    <span className="text-base align-top ml-1">*</span>
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs font-semibold">
                    Within 25% of Disbursed Loan Amount
                  </p>
                  <p className="text-2xl font-bold mt-2">{within25 ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-green-50 text-green-800 px-6 py-4 border border-green-200 shadow-sm text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span className="font-semibold">Final Part Payment Charges</span>
                </div>
                <div className="md:text-right">
                  <p className="text-lg font-bold">{finalChargeRate.toFixed(1)}%</p>
                  {finalChargeRate > 0 && (
                    <p className="text-xs">
                      Approx. charges: <strong>{formatCurrency(finalChargesAmount)}</strong>
                    </p>
                  )}
                  <p className="text-xs mt-1">
                    You can prepay up to{' '}
                    <strong>{formatCurrency(noChargeLimit)}</strong> this year without any charges.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTool === 'eligibility' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  You are eligible for a <span className="font-semibold">{LOAN_TYPES[loanType].label}</span> up to
                </p>
                {employerMultiplier !== 1 && (
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-tata-blue font-semibold">
                    {employerMultiplier > 1
                      ? 'Preferred employer – +' +
                        Math.round((employerMultiplier - 1) * 100) +
                        '% eligibility'
                      : 'High-risk profile – conservative eligibility'}
                  </span>
                )}
              </div>
              <div className="rounded-2xl bg-emerald-500 text-white py-4 text-center">
                <p className="text-3xl font-bold">
                  {formatCurrency(eligibleLoanAmount)}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Max eligible EMI (40% FOIR)</p>
                  <p className="font-semibold text-tata-blue text-lg">
                    {formatCurrency(maxEligibleEmi)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended EMI band: {formatCurrency(safeEmiMin)} – {formatCurrency(safeEmiMax)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">What if you reduce expenses?</p>
                  <p className="text-xs text-gray-600">
                    If you reduce monthly expenses by ₹5,000, your eligibility increases by{' '}
                    <strong>
                      {formatCurrency(
                        Math.max(
                          baseEligibleLoanAmount * employerMultiplier -
                            (Math.max(monthlyIncome - Math.max(monthlyExpenses - 5000, 0) - existingEmi, 0) *
                              0.4 === 0
                              ? 0
                              : 0),
                        0,
                      ),
                    )}
                    </strong>
                    .
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                * Final eligibility is subject to Sarvasva&apos;s internal credit policies and
                verification.
              </p>
            </div>
          )}

          <button className="btn-primary w-full mt-2 flex items-center justify-center space-x-2 rounded-full">
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;


