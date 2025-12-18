import { useState } from "react";

// URL where your AI chatbot is already running (served by its own backend)
// This will load that exact UI and all its existing functionality inside an iframe.
const CHATBOT_FRONTEND_URL = "http://127.0.0.1:5000/";

const ChatbotPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating launcher button (hidden while chat is open so it doesn't cover the panel) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-tata-blue text-white shadow-2xl px-5 py-3 text-sm font-semibold flex items-center space-x-2 hover:bg-opacity-90 transition-all"
        >
          <span>SARVASVA Chatbot</span>
          <span className="text-lg">💬</span>
        </button>
      )}

      {/* Right-side iframe panel showing the ORIGINAL chatbot UI */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-black/30"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full md:w-[480px] lg:w-1/2 max-w-xl bg-white shadow-2xl h-[calc(100%-2rem)] my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
              <span className="text-sm font-semibold text-gray-800">
                AI Chatbot
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-xl leading-none text-gray-500 hover:text-gray-800"
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
            {/* This iframe loads the exact HTML/CSS/JS from the chatbot folder */}
            <iframe
              title="AI Chatbot"
              src={CHATBOT_FRONTEND_URL}
              className="w-full h-[calc(100%-40px)] border-0"
              // Allow the embedded chatbot page to use microphone and autoplay audio
              allow="microphone; autoplay"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPopup;
