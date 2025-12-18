import { useState } from 'react';
import { Bot, CheckCircle, Loader, AlertCircle, User, Shield, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MultiAgentViz = () => {
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [agentStatus, setAgentStatus] = useState<Record<string, 'idle' | 'processing' | 'completed' | 'error'>>({
    kyc: 'idle',
    credit: 'idle',
    fraud: 'idle',
    compliance: 'idle',
  });

  const agents = [
    {
      id: 'kyc',
      name: 'KYC Verification Agent',
      icon: <User className="w-8 h-8" />,
      description: 'Verifies customer identity and documents',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'credit',
      name: 'Credit Score Agent',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Calculates and analyzes credit score',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'fraud',
      name: 'Fraud Detection Agent',
      icon: <Shield className="w-8 h-8" />,
      description: 'Monitors and detects fraudulent activities',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 'compliance',
      name: 'Compliance Agent',
      icon: <CheckCircle className="w-8 h-8" />,
      description: 'Ensures regulatory compliance',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const activateAgent = (agentId: string) => {
    if (!activeAgents.includes(agentId)) {
      setActiveAgents([...activeAgents, agentId]);
      setAgentStatus(prev => ({ ...prev, [agentId]: 'processing' }));

      // Simulate processing
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, [agentId]: 'completed' }));
      }, 3000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader className="w-5 h-5 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Bot className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <Bot className="mr-3" />
          Multi-Agent Collaboration Visualization
        </h1>

        <div className="card mb-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="flex items-center space-x-4">
            <Bot className="w-12 h-12" />
            <div>
              <h3 className="text-2xl font-bold">AI Agents Working Together</h3>
              <p className="mt-2 opacity-90">
                Watch multiple AI agents collaborate in real-time to process your requests. 
                Each agent specializes in a specific task and works simultaneously for faster results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {agents.map((agent) => {
            const status = agentStatus[agent.id];
            const isActive = activeAgents.includes(agent.id);

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card cursor-pointer transition-all ${
                  isActive ? 'ring-4 ring-tata-gold' : ''
                }`}
                onClick={() => activateAgent(agent.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`bg-gradient-to-r ${agent.color} text-white p-6 rounded-t-xl -m-6 mb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {agent.icon}
                      <div>
                        <h3 className="text-xl font-bold">{agent.name}</h3>
                        <p className="text-sm opacity-90">{agent.description}</p>
                      </div>
                    </div>
                    {getStatusIcon(status)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-semibold capitalize ${
                      status === 'completed' ? 'text-green-600' :
                      status === 'processing' ? 'text-blue-600' :
                      status === 'error' ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {status}
                    </span>
                  </div>

                  {status === 'processing' && (
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3 }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">Processing...</p>
                    </div>
                  )}

                  {status === 'completed' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800 font-semibold">✓ Task Completed Successfully</p>
                      <p className="text-xs text-green-600 mt-1">
                        {agent.id === 'kyc' && 'KYC verification passed. All documents verified.'}
                        {agent.id === 'credit' && 'Credit score calculated: 780. Excellent rating!'}
                        {agent.id === 'fraud' && 'No fraudulent activity detected. Account is secure.'}
                        {agent.id === 'compliance' && 'All compliance checks passed. Account approved.'}
                      </p>
                    </div>
                  )}

                  {status === 'idle' && (
                    <button className="w-full btn-secondary">
                      Activate Agent
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Collaboration Visualization */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-tata-blue mb-6">Agent Collaboration Flow</h2>
          <div className="relative">
            <div className="flex justify-around items-center flex-wrap gap-4">
              {agents.map((agent, idx) => {
                const status = agentStatus[agent.id];
                const isActive = activeAgents.includes(agent.id);

                return (
                  <motion.div
                    key={agent.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    className={`relative ${isActive ? 'z-10' : ''}`}
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white ${
                      isActive ? `bg-gradient-to-r ${agent.color}` : 'bg-gray-300'
                    }`}>
                      {agent.icon}
                    </div>
                    {status === 'processing' && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-blue-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                    {status === 'completed' && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <p className="text-xs text-center mt-2 font-semibold">{agent.name.split(' ')[0]}</p>
                  </motion.div>
                );
              })}
            </div>

            {activeAgents.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-sm text-blue-800">
                  <strong>Collaboration Active:</strong> {activeAgents.length} agents are working together to process your request.
                  This parallel processing reduces wait time by up to 70%!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="card mt-8 bg-gradient-to-r from-tata-blue to-tata-teal text-white">
          <h3 className="text-2xl font-bold mb-4">Benefits of Multi-Agent System</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">⚡ Faster Processing</h4>
              <p className="text-sm opacity-90">Multiple agents work simultaneously</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Specialized Expertise</h4>
              <p className="text-sm opacity-90">Each agent is an expert in its domain</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Real-time Updates</h4>
              <p className="text-sm opacity-90">Track progress of each agent live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiAgentViz;

