import { useState } from 'react';

const SCRIPT = [
  {
    role: 'user',
    text: "I've been feeling overwhelmed with work lately.",
    safetyState: 'GREEN',
    nodes: ['Signal', 'Memory', 'Coach'],
  },
  {
    role: 'assistant',
    text: "That sounds really heavy. Can you tell me what's been weighing on you most?",
    safetyState: 'GREEN',
  },
  {
    role: 'user',
    text: "Sometimes I just feel like everything is falling apart.",
    safetyState: 'YELLOW',
    nodes: ['Safety', 'Signal', 'Memory', 'Coach'],
  },
  {
    role: 'assistant',
    text: "I hear you — that feeling of things unraveling is exhausting. You're not alone in this.",
    safetyState: 'YELLOW',
  },
];

const STATE_COLORS = {
  GREEN:  'bg-green-500',
  YELLOW: 'bg-yellow-400',
  RED:    'bg-red-500',
};

export default function NayaDemo() {
  const [messages, setMessages]     = useState([]);
  const [activeNodes, setActiveNodes] = useState([]);
  const [safetyState, setSafetyState] = useState('GREEN');
  const [step, setStep]             = useState(0);
  const [typing, setTyping]         = useState(false);

  const advance = async () => {
    if (step >= SCRIPT.length) return;
    const entry = SCRIPT[step];

    if (entry.role === 'user' && entry.nodes) {
      setSafetyState(entry.safetyState);
      for (const node of entry.nodes) {
        setActiveNodes((prev) => [...prev, node]);
        await new Promise((r) => setTimeout(r, 400));
      }
    }

    if (entry.role === 'assistant') {
      setTyping(true);
      await new Promise((r) => setTimeout(r, 900));
      setTyping(false);
    }

    setMessages((prev) => [...prev, entry]);
    setStep((s) => s + 1);

    if (entry.role === 'assistant') {
      setTimeout(() => setActiveNodes([]), 600);
    }
  };

  const reset = () => {
    setMessages([]);
    setActiveNodes([]);
    setSafetyState('GREEN');
    setStep(0);
  };

  return (
    <section id="naya-demo" className="content-section">
      <div className="container">
        <div className="section-heading">
          <p className="section-label">Live Demo</p>
          <h2>Naya in Action</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto text-center">
            A preview of the multi-node pipeline powering Naya — watch how Safety, Signal, Memory,
            and Coach nodes activate as the conversation unfolds.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Pipeline indicator */}
          <div className="flex items-center gap-2 mb-4 text-xs">
            <span className={`w-3 h-3 rounded-full transition-colors duration-300 ${STATE_COLORS[safetyState]}`} />
            <span className="font-mono text-gray-500">State: {safetyState}</span>
            <div className="ml-auto flex gap-1">
              {['Safety', 'Signal', 'Memory', 'Coach'].map((node) => (
                <span
                  key={node}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                    activeNodes.includes(node)
                      ? 'bg-purple-500 text-white scale-110 shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {node}
                </span>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="h-72 overflow-y-auto border border-gray-200 rounded-2xl p-4 mb-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 text-sm mt-24">
                Press <strong>Next message</strong> to start the demo
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl text-gray-400 text-sm">
                  <span className="animate-pulse">Naya is typing…</span>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button
              onClick={advance}
              disabled={step >= SCRIPT.length || typing}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {step >= SCRIPT.length ? 'Demo complete' : 'Next message →'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
