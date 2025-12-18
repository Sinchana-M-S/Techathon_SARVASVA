import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  Plus,
  CheckCircle,
  XCircle,
  Loader2,
  Wallet,
  Fingerprint,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/* ================= TYPES ================= */
type Contact = { name: string; phone: string };
type Txn = {
  to: string;
  amount: number;
  time: string;
  status: "Success" | "Failed";
  kind: "PAY" | "ADD";
};

/* ================= PAGE ================= */
export default function TataWalletPage() {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const [txns, setTxns] = useState<Txn[]>([]);
  const [overlay, setOverlay] =
    useState<null | "processing" | "success" | "fail">(null);

  /* PIN */
  const [showPin, setShowPin] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [bioSuccess, setBioSuccess] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    setBalance(Number(localStorage.getItem("wallet_balance")) || 5000);
    setContacts(JSON.parse(localStorage.getItem("wallet_contacts") || "[]"));
    setTxns(JSON.parse(localStorage.getItem("wallet_txns") || "[]"));
  }, []);

  const persist = (b: number, c = contacts, t = txns) => {
    localStorage.setItem("wallet_balance", String(b));
    localStorage.setItem("wallet_contacts", JSON.stringify(c));
    localStorage.setItem("wallet_txns", JSON.stringify(t));
  };

  /* ================= ADD MONEY ================= */
  const addMoney = () => {
    const newBal = balance + 1000;
    const txn: Txn = {
      to: "Self",
      amount: 1000,
      time: new Date().toISOString(),
      status: "Success",
      kind: "ADD",
    };
    const updated = [txn, ...txns];
    setBalance(newBal);
    setTxns(updated);
    persist(newBal, contacts, updated);
  };

  /* ================= PAY ================= */
  const pay = () => {
    if (!amount || (!phone && !selectedContact)) return;
    setShowPin(true);
  };

  const verifyPin = () => {
    if (pin !== "1234") {
      setPinError(true);
      setTimeout(() => {
        setPin("");
        setPinError(false);
        setShowPin(false);
      }, 1200);
      return;
    }

    setBioSuccess(true);

    setTimeout(() => {
      setShowPin(false);
      setPin("");
      setBioSuccess(false);
      processPayment();
    }, 900);
  };

  const processPayment = () => {
    setOverlay("processing");

    setTimeout(() => {
      const amt = Number(amount);
      const to = selectedContact ? selectedContact.name : phone;

      if (amt > balance) {
        const failTxn: Txn = {
          to,
          amount: amt,
          time: new Date().toISOString(),
          status: "Failed",
          kind: "PAY",
        };
        const updated = [failTxn, ...txns];
        setTxns(updated);
        persist(balance, contacts, updated);

        setOverlay("fail");
        setTimeout(() => setOverlay(null), 1400);
        return;
      }

      const newBal = balance - amt;
      const successTxn: Txn = {
        to,
        amount: amt,
        time: new Date().toISOString(),
        status: "Success",
        kind: "PAY",
      };

      const updated = [successTxn, ...txns];
      setBalance(newBal);
      setTxns(updated);
      persist(newBal, contacts, updated);

      setOverlay("success");
      setTimeout(() => setOverlay(null), 1400);
    }, 800);
  };

  /* ================= ANALYTICS ================= */
  const monthly = useMemo(() => {
    const now = new Date();
    let spent = 0;
    let added = 0;

    txns.forEach((t) => {
      const d = new Date(t.time);
      if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
        if (t.status === "Success") {
          if (t.kind === "PAY") spent += t.amount;
          if (t.kind === "ADD") added += t.amount;
        }
      }
    });
    return { spent, added };
  }, [txns]);

  const chartData = {
    labels: ["Added", "Spent"],
    datasets: [
      {
        data: [monthly.added, monthly.spent],
        backgroundColor: ["#2563eb", "#dc2626"],
        borderRadius: 10,
      },
    ],
  };

  /* ================= GROUP TXNS ================= */
  const groupedTxns = useMemo(() => {
    return txns.reduce<Record<string, Txn[]>>((acc, t) => {
      const date = new Date(t.time).toDateString();
      acc[date] = acc[date] || [];
      acc[date].push(t);
      return acc;
    }, {});
  }, [txns]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col lg:flex-row px-4 lg:px-6 py-6 gap-6">
      {/* CONTACTS */}
      <div className="w-full lg:w-72 bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3">Contacts</h3>
        <div className="border rounded max-h-[300px] overflow-y-auto">
          {contacts.map((c) => {
            const active = selectedContact?.phone === c.phone;
            return (
              <button
                key={c.phone}
                onClick={() => {
                  setSelectedContact(active ? null : c);
                  setPhone("");
                }}
                className={`w-full px-3 py-2 text-left ${
                  active ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
              >
                <p className="font-medium">{c.name}</p>
                <p className="text-xs opacity-80">{c.phone}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* PAYMENT */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Wallet Balance</p>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <p className="text-2xl font-bold mb-3">
            {showBalance ? `₹${balance}` : "₹••••"}
          </p>

          <button
            onClick={addMoney}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-4"
          >
            <Wallet size={16} /> Add ₹1000
          </button>

          <input
            placeholder="Phone number"
            disabled={!!selectedContact}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSelectedContact(null);
            }}
            className="w-full border rounded px-3 py-2 mb-2 disabled:bg-gray-100"
          />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
          />

          <button
            onClick={pay}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold"
          >
            Pay
          </button>

          {/* TRANSACTIONS */}
          <h4 className="font-semibold mt-6 mb-2">Transactions</h4>
          <div className="max-h-[260px] overflow-y-auto pr-1">
            {Object.entries(groupedTxns).map(([date, list]) => (
              <div key={date}>
                <p className="text-xs text-gray-500 my-2">{date}</p>
                {list.map((t, i) => (
                  <div key={i} className="border rounded p-2 text-sm mb-2">
                    <p>
                      {t.kind === "ADD"
                        ? `Added ₹${t.amount}`
                        : `Paid ₹${t.amount} to ${t.to}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(t.time).toLocaleTimeString()}
                    </p>
                    <p
                      className={
                        t.status === "Success"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {t.status}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ANALYTICS */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold mb-2">This Month</h4>
            <div className="h-40">
              <Bar
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ADD CONTACT */}
      <div className="w-full lg:w-72 bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Plus size={18} /> Add Contact
        </h3>
        <AddContactForm
          onAdd={(n, p) => {
            const updated = [...contacts, { name: n, phone: p }];
            setContacts(updated);
            persist(balance, updated, txns);
          }}
        />
      </div>

      {/* PIN MODAL */}
      {showPin && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center">
            {bioSuccess ? (
              <>
                <Fingerprint className="mx-auto text-green-600 w-16 h-16 mb-2" />
                <p className="font-semibold">Verified</p>
              </>
            ) : (
              <>
                <h3 className="font-semibold mb-3">Enter UPI PIN</h3>
                <div className="flex justify-center gap-2 mb-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        pin[i] ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3,4,5,6,7,8,9,0].map((n) => (
                    <button
                      key={n}
                      onClick={() => pin.length < 4 && setPin(pin + n)}
                      className="py-3 border rounded font-semibold"
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  onClick={verifyPin}
                  className="w-full bg-blue-600 text-white py-2 rounded mt-4"
                >
                  Verify
                </button>

                {pinError && (
                  <p className="text-red-600 text-sm mt-2">
                    Incorrect PIN
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* PAYMENT STATUS OVERLAY */}
      {overlay && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-white
          ${overlay === "processing" && "bg-blue-600"}
          ${overlay === "success" && "bg-green-600"}
          ${overlay === "fail" && "bg-red-600"}
        `}
        >
          {overlay === "processing" && (
            <>
              <Loader2 className="w-14 h-14 animate-spin mb-4" />
              <p className="text-lg font-semibold">Processing payment</p>
            </>
          )}

          {overlay === "success" && (
            <>
              <CheckCircle className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">Payment successful</p>
            </>
          )}

          {overlay === "fail" && (
            <>
              <XCircle className="w-16 h-16 mb-4" />
              <p className="text-lg font-semibold">Insufficient balance</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ================= ADD CONTACT ================= */
function AddContactForm({ onAdd }: { onAdd: (n: string, p: string) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <input
        placeholder="Name"
        className="w-full border rounded px-3 py-2 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Phone"
        className="w-full border rounded px-3 py-2 mb-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        onClick={() => {
          if (name && phone) onAdd(name, phone);
          setName("");
          setPhone("");
        }}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
      >
        Add
      </button>
    </>
  );
}
