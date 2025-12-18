import { useState } from 'react';
import { MessageCircle, Phone, Video, Send, Bot, User } from 'lucide-react';

const CustomerSupport = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot', time: '10:00 AM' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Thank you for your message. Let me connect you with a banking specialist.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <MessageCircle className="mr-3" />
          Customer Support
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="card h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-tata-teal rounded-full flex items-center justify-center text-white">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarvasva Banking Support</p>
                    <p className="text-sm text-gray-500">
                      {isConnected ? 'Connected to specialist' : 'AI Assistant'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    <Video className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-tata-blue text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && (
                          <Bot className="w-5 h-5 mt-1 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="w-5 h-5 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p>{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="input-field flex-1"
                />
                <button onClick={handleSend} className="btn-primary">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-tata-blue mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsConnected(!isConnected)}
                  className={`w-full btn-primary ${isConnected ? 'bg-green-500' : ''}`}
                >
                  {isConnected ? 'Disconnect' : 'Connect to Specialist'}
                </button>
                <button className="w-full btn-secondary">
                  <Phone className="inline mr-2" />
                  Call Support
                </button>
                <button className="w-full btn-secondary">
                  <Video className="inline mr-2" />
                  Video Call
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-tata-blue mb-4">Common Queries</h3>
              <div className="space-y-2">
                {[
                  'Account Balance',
                  'Transaction History',
                  'Loan Status',
                  'Credit Card',
                  'Investment Options',
                ].map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputMessage(query)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            <div className="card bg-gradient-to-br from-tata-blue to-tata-teal text-white">
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm opacity-90">
                Our banking specialists are available round the clock to assist you with any queries or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;

