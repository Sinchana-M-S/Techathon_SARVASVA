import { MapContainer, TileLayer, CircleMarker, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

/* ================= TYPES ================= */
type LoanType = "car" | "home" | "education" | "personal" | "business";
type Crowd = "low" | "medium" | "high";

type Employee = {
  name: string;
  role: string;
  phone: string;
};

type Branch = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  loans: LoanType[];
  crowd: Crowd;
  employees: Employee[];
};

type Appointment = {
  branchId: number;
  branchName: string;
  time: string; // ISO
};

/* ================= CONSTANTS ================= */
const LOAN_COLORS: Record<LoanType, string> = {
  car: "#2563eb",
  home: "#16a34a",
  education: "#7c3aed",
  personal: "#f97316",
  business: "#dc2626",
};

const CROWD_LABEL: Record<Crowd, string> = {
  low: "🟢 Less crowd",
  medium: "🟡 Medium crowd",
  high: "🔴 Fully crowded",
};

const BRANCHES: Branch[] = [
  {
    id: 1,
    name: "Tata Capital – Kuvempunagar",
    lat: 12.2921,
    lng: 76.6394,
    loans: ["home", "education"],
    crowd: "medium",
    employees: [
      { name: "Ramesh K", role: "Home Loan Officer", phone: "9876543210" },
      { name: "Anita S", role: "Education Advisor", phone: "9876543220" },
    ],
  },
  {
    id: 2,
    name: "Tata Capital – JP Nagar",
    lat: 12.3003,
    lng: 76.6516,
    loans: ["car", "personal"],
    crowd: "low",
    employees: [
      { name: "Suresh M", role: "Car Loan Manager", phone: "9876543230" },
    ],
  },
  {
    id: 3,
    name: "Tata Capital – Vijayanagar",
    lat: 12.3087,
    lng: 76.6024,
    loans: ["personal", "car"],
    crowd: "high",
    employees: [
      { name: "Neha T", role: "Loan Consultant", phone: "9876543240" },
    ],
  },
  {
    id: 4,
    name: "Tata Capital – Hebbal",
    lat: 12.3372,
    lng: 76.6287,
    loans: ["home", "business"],
    crowd: "medium",
    employees: [
      { name: "Kiran V", role: "Relationship Manager", phone: "9876543250" },
    ],
  },
];

const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
  iconSize: [32, 32],
});

/* ================= COMPONENT ================= */
export default function TataMapPage() {
  const [loan, setLoan] = useState<LoanType | "all">("all");
  const [hideCrowded, setHideCrowded] = useState(true);
  const [selected, setSelected] = useState<Branch | null>(null);
  const [slot, setSlot] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userLoc, setUserLoc] = useState<[number, number] | null>(null);

  const reminded = useRef<Set<string>>(new Set());
  const geoRequested = useRef(false);

  /* ---------- LOAD APPOINTMENTS ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  /* ---------- GEOLOCATION ---------- */
  useEffect(() => {
    if (geoRequested.current) return;
    geoRequested.current = true;

    navigator.geolocation.getCurrentPosition(
      (p) => setUserLoc([p.coords.latitude, p.coords.longitude]),
      () => toast("📍 Location not available", { icon: "⚠️" })
    );
  }, []);

  /* ---------- REMINDER (10 MIN) ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();

      appointments.forEach((a) => {
        const diffMin = Math.floor(
          (new Date(a.time).getTime() - now) / 60000
        );

        if (diffMin === 10 && !reminded.current.has(a.time)) {
          reminded.current.add(a.time);
          toast(`⏰ 10 minutes left for ${a.branchName}`, {
            duration: 6000,
          });
        }
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [appointments]);

  /* ---------- FILTER ---------- */
  const visible = BRANCHES.filter((b) => {
    if (hideCrowded && b.crowd === "high") return false;
    if (loan === "all") return true;
    return b.loans.includes(loan);
  });

  /* ---------- BOOK SLOT ---------- */
  const bookSlot = () => {
    if (!selected || !slot) {
      toast.error("Please select a date & time");
      return;
    }

    const isoTime = new Date(slot).toISOString();

    const newApp: Appointment = {
      branchId: selected.id,
      branchName: selected.name,
      time: isoTime,
    };

    const updated = [...appointments, newApp];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    toast.success("Appointment booked successfully");
    setSlot("");
  };

  const deleteAppointment = (idx: number) => {
    const updated = appointments.filter((_, i) => i !== idx);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast.success("Appointment deleted");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Toaster position="top-right" />

      {/* MAP */}
      <div className="h-[55vh] lg:h-full lg:w-2/3">
        <MapContainer
          center={[12.2958, 76.6394]}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLoc && <Marker position={userLoc} icon={userIcon} />}

          {visible.map((b) => {
            const color =
              loan !== "all"
                ? LOAN_COLORS[loan as LoanType]
                : LOAN_COLORS[b.loans[0]];

            return (
              <CircleMarker
                key={b.id}
                center={[b.lat, b.lng]}
                radius={12}
                pathOptions={{ color }}
                eventHandlers={{ click: () => setSelected(b) }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-3">Tata Capital – Mysuru</h2>

        {/* FILTERS */}
        <select
          className="w-full border rounded px-3 py-2 mb-2"
          value={loan}
          onChange={(e) => setLoan(e.target.value as any)}
        >
          <option value="all">All Loans</option>
          <option value="car">Car Loan</option>
          <option value="home">Home Loan</option>
          <option value="education">Education Loan</option>
          <option value="personal">Personal Loan</option>
          <option value="business">Business Loan</option>
        </select>

        <label className="flex gap-2 mb-4">
          <input
            type="checkbox"
            checked={hideCrowded}
            onChange={() => setHideCrowded((v) => !v)}
          />
          Hide overcrowded branches
        </label>

        {/* SELECTED BRANCH */}
        {selected ? (
          <div className="border rounded p-3 mb-4">
            <h3 className="font-semibold">{selected.name}</h3>
            <p>{CROWD_LABEL[selected.crowd]}</p>

            {selected.employees.map((e) => (
              <p key={e.phone} className="text-sm">
                {e.name} – {e.role}{" "}
                <a href={`tel:${e.phone}`} className="text-blue-600">
                  Call
                </a>
              </p>
            ))}

            <input
              type="datetime-local"
              className="w-full border px-2 py-2 mt-3"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
            />

            <button
              onClick={bookSlot}
              disabled={!slot}
              className="w-full bg-blue-600 disabled:bg-gray-300 text-white py-2 rounded mt-2"
            >
              Book Appointment
            </button>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
              target="_blank"
              className="block text-center mt-2 text-blue-600 font-semibold"
            >
              Get Route
            </a>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">
            Select a branch to view details
          </p>
        )}

        {/* APPOINTMENTS */}
        <h4 className="font-semibold">Booked Appointments</h4>

        {appointments.length === 0 && (
          <p className="text-sm text-gray-500">No appointments yet</p>
        )}

        {appointments.map((a, i) => {
          const minsLeft = Math.max(
            0,
            Math.floor(
              (new Date(a.time).getTime() - Date.now()) / 60000
            )
          );

          return (
            <div key={i} className="border rounded p-2 mt-2">
              <p className="font-semibold">{a.branchName}</p>
              <p className="text-sm">
                {new Date(a.time).toLocaleString()}
              </p>
              <p className="text-sm">
                ⏱ {minsLeft > 0 ? `${minsLeft} min left` : "Time passed"}
              </p>
              <button
                onClick={() => deleteAppointment(i)}
                className="text-red-600 text-sm mt-1"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
