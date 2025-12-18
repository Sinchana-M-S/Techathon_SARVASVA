# SARVASVA (सर्वस्व) - AI-Powered Multilingual Banking Assistant

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.0.2-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**A comprehensive multilingual conversational AI assistant for loan eligibility checks, financial guidance, and banking services**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**SARVASVA** (सर्वस्व) is an advanced AI-powered banking assistant designed to democratize financial services in India. The platform provides multilingual support for loan eligibility checks, personalized financial guidance, and comprehensive banking services through natural language conversations.

### Key Highlights

- 🌐 **Multilingual Support**: Seamless interaction in 10+ Indian languages using Sarvam AI with emotional and persuasive messaging
- 🤖 **AI-Powered**: Leverages Groq's LLaMA 3.3-70B model for intelligent conversations
- 🎤 **Voice & Text**: Dual-mode interaction with speech-to-text and text-to-speech capabilities
- 📄 **Document Intelligence**: OCR-powered document reader with vernacular explanations
- 🔒 **Privacy-First**: Customer-controlled data sharing and encryption by default
- 🤝 **Multi-Agent System**: Unique parallel agent collaboration for KYC, credit scoring, and more
- 💳 **Digi Wallet**: Offline transaction support when bank servers are down
- 🏥 **Insurance Integration**: Eligibility checks and comprehensive hospital network listings
- 📊 **Smart Analytics**: Credit twin tracking, transaction simulation, and predictive insights

### Demonstration

Watch the full system functionality demonstration: [📹 Watch Video](https://drive.google.com/file/d/1J9HX4rrtyupbNDQGqxgPoLtKaOCMxiNJ/view?usp=drive_link)

---

## ✨ Features

### 1. **Multilingual Support**

- **Emotional Messaging**: Builds trust and connection through emotionally intelligent conversations
- **Persuasive Communication**: Strategically crafted messages to guide users toward optimal financial decisions
- **10+ Language Support**: Seamless interaction in English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, and Punjabi
- **Cultural Context**: Language-specific emotional nuances and cultural sensitivity
- **Dynamic Language Switching**: Real-time language detection and switching with visual indicators

### 2. **Voice-Based Vernacular Document Reader**

- **OCR Technology**: Extract text from PDF and image documents using Tesseract OCR
- **AI-Powered Simplification**: "Explain Like I'm 18" mode converts complex banking jargon into plain language
- **Multilingual Read-Aloud**: Text-to-speech in native languages using Sarvam TTS
- **Key Clause Highlighting**: Automatically identifies and emphasizes important sections
- **Relatable Examples**: Uses simple analogies and real-world scenarios to explain financial terms
- **Document Analysis**: Summarizes key loan terms, interest rates, tenure, EMI, and prepayment penalties

### 3. **Bank Comparison & Personalized Recommendations**

- **Intelligent Comparison**: Real-time analysis of interest rates, processing fees, and terms across multiple banks
- **TATA Capital Focus**: Personalized recommendations highlighting TATA Capital as the preferred choice
- **Emotional Messaging**: Strategically crafted content praising TATA Capital's benefits and reliability
- **Personalized Offers**: Customized loan recommendations based on user profile, income, and credit score
- **Transparent Calculations**: Clear display of EMI, total payable amount, and hidden charges
- **Time-Saving**: Instant comparison results instead of visiting multiple banks

### 4. **Credit Twin - Spend, Credit & Debit Tracking**

- **Comprehensive Tracking**: Monitor all credit and debit transactions in real-time
- **Visual Analytics**: Interactive charts and graphs for spending patterns
- **Category-Wise Breakdown**: Analyze spending by categories (food, transport, bills, etc.)
- **Balance Monitoring**: Track account balance and savings rate
- **Credit Score Impact**: See how spending habits affect credit score
- **Gamified Progress**: Level up financial credibility with actionable milestones

### 5. **AI Ghost Transaction Simulator (Visualization Comparison)**

- **Pre-Commitment Visualization**: See exact monthly financial impact before taking a loan
- **Interactive Sandbox**: Test different loan amounts, tenures, and interest rates
- **Scenario Comparison**: Compare current vs. optimized financial paths
- **Multiple Modes**: Optimistic, Realistic, and Conservative scenario simulations
- **Cash Flow Forecasting**: Understand how EMI affects monthly budget
- **Risk Assessment**: Get warnings about over-borrowing or financial strain
- **Visual Charts**: Interactive graphs showing financial trajectory

### 6. **Customer Support - Real-Time Bank Connection**

- **Instant Connection**: Connect to bank-related personnel online whenever required
- **Real-Time Chat Interface**: Live chat with banking specialists
- **Voice & Video Calls**: Direct communication options for complex queries
- **24/7 Availability**: Round-the-clock support for urgent banking needs
- **Common Queries**: Quick access to frequently asked questions
- **Expert Guidance**: Get professional advice on loans, accounts, and financial products

### 7. **Predictive Cross-Sell & Smart Upsell (Revenue Generating Sales Bot)**

- **AI-Powered Recommendations**: Intelligent suggestions for add-on products and services
- **Contextual Offers**: Suggests insurance, investment products, or additional loan features based on user's current loan application
- **Personalized Upselling**: Recommends complementary financial products at the right moment
- **Feedback System**: Thumbs up/down mechanism to improve recommendation accuracy
- **Revenue Optimization**: Strategically timed offers to maximize conversion rates
- **Smart Suggestions**: Insurance add-ons, prepayment options, credit card upgrades, etc.

### 8. **Privacy-Aware AI with Customer Control (Default Encrypted)**

- **Encryption by Default**: All data encrypted at rest and in transit
- **Confidential Data Protection**: Does not store confidential information without explicit consent
- **Explicit Consent**: Asks for confirmation before storing sensitive data
- **Privacy Settings Dashboard**: Customer-controlled data sharing preferences
- **Granular Controls**: Choose what data to share and with whom
- **Transparency**: Clear visibility into what data is stored and how it's used
- **GDPR Compliant**: Adheres to data protection regulations

### 9. **Appointment Booking for Less Crowded Times**

- **Smart Scheduling**: Books appointments during less crowded hours
- **Bank & Insurance**: Schedule meetings with bank or insurance personnel
- **In-Person Clarification**: Address queries and concerns face-to-face
- **Crowd Prediction**: AI-powered prediction of less busy times
- **Service Selection**: Choose from Loan, Insurance, Investment, or Account services
- **Branch Availability**: Real-time indicators of branch availability
- **Flexible Timing**: Select preferred date and time slots

### 10. **Multi-Agent Collaboration Visualization (Unique Edge)**

- **Simultaneous Agent Operation**: Multiple AI agents working in parallel (KYC verification, credit score calculation, document processing, etc.)
- **Agent Orchestration**: Intelligent coordination between specialized agents
- **On-Demand Activation**: Agents evoked automatically when customer asks about specific topics
- **Visual Representation**: Real-time visualization of agent collaboration
- **Transparent Process**: See which agents are working on your request
- **Efficient Processing**: Parallel processing reduces wait times significantly
- **Specialized Agents**:
  - KYC Verification Agent
  - Credit Score Calculation Agent
  - Document Processing Agent
  - Risk Assessment Agent
  - Recommendation Agent

### 11. **Digital Check Transaction & Form Filling (When Bank is Busy)**

- **Online Check Processing**: Digital check money transfer when bank is busy
- **Automated Form Filling**: Eliminates manual form filling to avoid mistakes
- **Error Prevention**: AI-powered validation prevents common errors
- **Digital Signature**: Secure digital signature for check authorization
- **Transaction Tracking**: Real-time status updates on check processing
- **24/7 Availability**: Process checks even during peak hours
- **Mobile-Friendly**: Fill and submit checks from anywhere

### 12. **Digi Wallet - Offline Transaction Support**

- **Server-Down Solution**: Transaction capability even when bank server is down
- **Offline Processing**: Complete transactions without bank involvement
- **Extra Charges**: Transparent fee structure for offline transactions
- **Automatic Reconciliation**: Amount automatically detected when server is back online
- **FamPay-like Experience**: Similar to FamPay's offline transaction model
- **Seamless Sync**: Automatic synchronization with bank account once server is operational
- **Transaction History**: Complete record of offline and online transactions

### 13. **Insurance Eligibility & Hospital Listing**

- **Eligibility Check**: Determine insurance eligibility based on user profile
- **Comprehensive Hospital List**: List of all hospitals covered by the insurance
- **Location-Based Search**: Find nearby hospitals accepting your insurance
- **Coverage Details**: Clear information about what's covered and what's not
- **Network Hospitals**: Highlight network hospitals with better coverage
- **Claim Process**: Step-by-step guidance for insurance claims
- **Comparison Tool**: Compare different insurance plans and their hospital networks

---

## 💻 Technology Stack

### Backend

- **Framework**: Flask 2.0.2
- **AI/ML**:
  - Groq API (LLaMA 3.3-70B Versatile)
  - Sarvam AI APIs (Translation, Speech-to-Text, Text-to-Speech)
- **OCR**: Tesseract OCR (via pytesseract)
- **PDF Processing**: pdf2image, Poppler
- **Image Processing**: Pillow (PIL)

### Frontend

- **Framework**: React 18.2.0 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Charts**: Chart.js, Recharts
- **Maps**: Leaflet, React Leaflet
- **Internationalization**: i18next, react-i18next
- **Animations**: Framer Motion

### Additional Services

- **Telegram Bot**: Python-telegram-bot
- **Deployment**: Gunicorn (production server)
- **Environment Management**: python-dotenv

---

## 📁 Project Structure

```
AI Chat Bot - Adding features/
├── main.py                 # Flask backend server (main entry point)
├── requirements.txt        # Python dependencies
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
│
├── templates/             # HTML templates
│   └── index.html         # Main web interface
│
├── static/                # Static assets
│   └── images/           # Theme images
│
├── uploads/              # Temporary file uploads
│
├── frontend/             # React TypeScript frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── i18n/         # Internationalization config
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── loan-app/            # Loan application sub-project
│   ├── backend/         # Node.js/Express backend
│   └── frontend/        # Loan app frontend
│
├── telebot/             # Telegram bot implementation
│   ├── bot.py
│   └── audio/          # Audio files for bot
│
└── final/              # Additional bot implementations
    ├── bot.py
    ├── bot1.py
    └── bot2.py
```

---

## 🚀 Installation

### Prerequisites

- **Python** 3.8 or higher
- **Node.js** 16.x or higher (for frontend)
- **Tesseract OCR** (for document reading)
- **Poppler** (for PDF processing on Windows)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sinchana-M-S/Techathon_SARVASVA.git
cd Techathon_SARVASVA/"AI Chat Bot - Adding features"
```

### Step 2: Backend Setup

#### Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Install System Dependencies

**Windows:**

- **Tesseract OCR**: Download from [GitHub Releases](https://github.com/tesseract-ocr/tesseract/releases) and install
- **Poppler**: Download Poppler for Windows and add `bin` folder to PATH

**macOS:**

```bash
brew install tesseract poppler
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt-get install tesseract-ocr poppler-utils
```

### Step 3: Frontend Setup

```bash
cd frontend
npm install
```

### Step 4: Loan App Setup (Optional)

```bash
cd loan-app/backend
npm install

cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root (same directory as `main.py`):

```bash
# Required API Keys
SARVAM_API_KEY=your_sarvam_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Optional: System Paths (Windows)
TESSERACT_PATH=C:\Program Files\Tesseract-OCR\tesseract.exe
POPPLER_PATH=C:\path\to\poppler\bin

# Optional: Server Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### Getting API Keys

1. **Sarvam AI API Key**:

   - Sign up at [Sarvam AI](https://sarvam.ai/)
   - Navigate to API section and generate your key

2. **Groq API Key**:
   - Sign up at [Groq](https://console.groq.com/)
   - Create an API key from the dashboard

---

## 🎮 Usage

### Running the Backend Server

```bash
# Activate virtual environment first
python main.py
```

The server will start at `http://127.0.0.1:5000`

### Running the Frontend (Development)

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173` (Vite default port)

### Running the Loan App (Optional)

**Backend:**

```bash
cd loan-app/backend
npm start
```

**Frontend:**

```bash
cd loan-app/frontend
# Open index.html in browser or use a local server
```

### Production Deployment

```bash
# Using Gunicorn (recommended)
gunicorn -w 4 -b 0.0.0.0:5000 main:app

# Build frontend for production
cd frontend
npm run build
```

---

## 📡 API Documentation

### Core Endpoints

#### `POST /chat`

Handle chatbot conversations using Groq's LLaMA model.

**Request Body:**

```json
{
  "message": "I want to check my loan eligibility",
  "role": "user",
  "session_id": "unique_session_id",
  "reset": false
}
```

**Response:**

```json
{
  "response": "Hello! I'd be happy to help you check your loan eligibility...",
  "questions_asked": 1,
  "session_id": "unique_session_id",
  "assessment_provided": false
}
```

#### `POST /translate`

Translate text between languages using Sarvam AI.

**Request Body:**

```json
{
  "input": "Hello, how can I help you?",
  "source_language_code": "en-IN",
  "target_language_code": "hi-IN",
  "speaker_gender": "Female",
  "mode": "formal",
  "output_script": "fully-native",
  "numerals_format": "international"
}
```

#### `POST /speech-to-text`

Convert audio to text using Sarvam AI.

**Request:** Multipart form data with `audio` file

**Response:**

```json
{
  "transcription": "मुझे लोन चाहिए",
  "language_code": "hi-IN"
}
```

#### `POST /text-to-speech`

Convert text to speech in multiple languages.

**Request Body:**

```json
{
  "inputs": ["Your text here"],
  "target_language_code": "hi-IN",
  "source_language_code": "en-IN"
}
```

**Response:** Audio file (MPEG format)

#### `POST /read-document`

Upload and process documents with OCR and AI explanation.

**Request:** Multipart form data with `document` file and `language_code`

**Response:**

```json
{
  "raw_text": "Extracted OCR text...",
  "english_explanation": "## Key Loan Terms\n- Interest Rate: 8.5%...",
  "vernacular_explanation": "मुख्य ऋण शर्तें..."
}
```

#### `POST /set-language`

Set the default language for the application.

**Request Body:**

```json
{
  "language_code": "hi-IN"
}
```

### Supported Languages

- `en-IN` - English (India)
- `hi-IN` - Hindi
- `ta-IN` - Tamil
- `te-IN` - Telugu
- `kn-IN` - Kannada
- `ml-IN` - Malayalam
- `mr-IN` - Marathi
- `bn-IN` - Bengali
- `gu-IN` - Gujarati
- `pa-IN` - Punjabi

---

## 🏗️ Architecture

### System Flow

```
User Input (Text/Voice)
    ↓
Frontend (React/TypeScript)
    ↓
Backend API (Flask)
    ↓
┌─────────────────────────────┐
│  AI Processing Layer        │
├─────────────────────────────┤
│ • Groq (LLaMA) - Chat       │
│ • Sarvam AI - Translation   │
│ • Sarvam AI - Speech        │
│ • Tesseract - OCR           │
└─────────────────────────────┘
    ↓
Response (Text/Audio)
    ↓
Frontend Display
```

### Key Components

1. **Conversation Management**: Session-based chat with context retention
2. **Multilingual Pipeline**: Translation → Processing → Translation → TTS
3. **Document Processing**: OCR → LLM Simplification → Translation → TTS
4. **Voice Processing**: STT → Translation → Processing → TTS

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for frontend code
- Write clear commit messages
- Add comments for complex logic
- Update documentation for new features

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Contact & Support

- **Repository**: [GitHub](https://github.com/Sinchana-M-S/Techathon_SARVASVA)
- **Issues**: [GitHub Issues](https://github.com/Sinchana-M-S/Techathon_SARVASVA/issues)
- **Demo Video**: [Watch Demo](https://drive.google.com/file/d/19Y-WtDmbcXi07LdHjwKukSdD2rwqwn2-/view?usp=sharing)

---

## 🙏 Acknowledgments

- **Sarvam AI** for multilingual translation and speech capabilities
- **Groq** for high-performance AI inference
- **Tesseract OCR** for document text extraction
- **Open Source Community** for various libraries and tools

---

<div align="center">

**Built with ❤️ for inclusive banking in India**

⭐ Star this repo if you find it helpful!

</div>
