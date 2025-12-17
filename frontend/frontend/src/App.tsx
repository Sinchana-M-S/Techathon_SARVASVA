import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotPopup from "./components/ChatbotPopup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BankComparison from "./pages/BankComparison";
import CreditTwin from "./pages/CreditTwin";
import TransactionSimulator from "./pages/TransactionSimulator";
import CustomerSupport from "./pages/CustomerSupport";
import UpsellBot from "./pages/UpsellBot";
import PrivacySettings from "./pages/PrivacySettings";
import AppointmentBooking from "./pages/AppointmentBooking";
import MultiAgentViz from "./pages/MultiAgentViz";
import DigitalCheck from "./pages/DigitalCheck";
import DigiWallet from "./pages/DigiWallet";
import Insurance from "./pages/Insurance";
import TataMapPage from "./pages/TataMapPage";
import TataWalletPage from "./pages/TataWalletPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bank-comparison" element={<BankComparison />} />
          <Route path="/credit-twin" element={<CreditTwin />} />
          <Route
            path="/transaction-simulator"
            element={<TransactionSimulator />}
          />
          <Route path="/support" element={<CustomerSupport />} />
          <Route path="/upsell" element={<UpsellBot />} />
          <Route path="/privacy" element={<PrivacySettings />} />
          <Route path="/appointment" element={<AppointmentBooking />} />
          <Route path="/agents" element={<MultiAgentViz />} />
          <Route path="/digital-check" element={<DigitalCheck />} />
          <Route path="/digi-wallet" element={<DigiWallet />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/map" element={<TataMapPage />} />
          <Route path="/wallet" element={<TataWalletPage />} />
        </Routes>
        <ChatbotPopup />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
