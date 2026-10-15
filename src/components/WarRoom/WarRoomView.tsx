import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Send, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Flame, 
  MessageSquare, 
  Activity, 
  Bot,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { sounds } from '../../utils/soundEffects';

interface BoardMessage {
  id: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  department: string;
  text: string;
  timestamp: string;
  isOwner?: boolean;
}

export const WarRoomView: React.FC = () => {
  const { agents, language, userSession } = useEnterprise();
  const isHindi = language === 'hi';

  const [inputDirective, setInputDirective] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<BoardMessage[]>([
    {
      id: '1',
      senderName: 'Dr. Sophia Vance (CEO)',
      senderRole: 'Chief Executive Officer',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      department: 'Executive',
      text: isHindi 
        ? 'टीम, हमने टोक्यो हाई-स्पीड रेल और ज़्यूरिख बायो-टेक के साथ $110,000+ के अनुबंध सुरक्षित किए हैं। विक्टर, क्या हमारे इंजीनियरिंग एजेंट्स समय पर डिलीवरी कर रहे हैं?'
        : 'Board, our autonomous bidding just captured $110,000+ in enterprise pipeline from Tokyo & Zurich. Victor, how is sprint capacity looking?',
      timestamp: '10:48 AM',
    },
    {
      id: '2',
      senderName: 'Victor Chen (Ops Manager)',
      senderRole: 'Operations Director',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      department: 'Operations',
      text: isHindi
        ? 'सोफिया, डेविड स्टर्लिंग और मार्कस केन 99.8% दक्षता पर कोड संकलित कर रहे हैं। टोक्यो प्रोजेक्ट 78% पूरा हो चुका है और 2 घंटे के भीतर इनवॉइस भेजा जाएगा।'
        : 'Sophia, David and Marcus are executing at 99.8% efficiency. The Tokyo safety mesh is 78% compiled. We expect automated settlement within 2 hours.',
      timestamp: '10:49 AM',
    },
    {
      id: '3',
      senderName: 'Aegis Sentinel (Security Guard)',
      senderRole: 'Chief Cyber Sentinel',
      senderAvatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=150&auto=format&fit=crop&q=80',
      department: 'Cyber Security',
      text: isHindi
        ? 'ट्रेज़री खजाने की स्थिति 100% सुरक्षित है। मैंने अभी 14 संदिग्ध आईपी पतों से आने वाले एसक्यूएल इंजेक्शन हमलों को ब्लॉक किया है। सभी डिजिटल हस्ताक्षरों का सत्यापन पूरा हुआ।'
        : 'Treasury Vault integrity verified. I recently quarantined 14 malformed payload vectors targeting the settlement gateway. Zero leakage detected.',
      timestamp: '10:50 AM',
    },
    {
      id: '4',
      senderName: 'Maya Sharma (HR Director)',
      senderRole: 'Autonomous Talent Lead',
      senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      department: 'Human Resources',
      text: isHindi
        ? 'एआई कार्यबल का मोराल 98% पर है। सभी जीपीयू क्लस्टर कंप्यूट पेरोल स्वतः समय पर चुका दिए गए हैं।'
        : 'Workforce morale is 98% optimal. Micro-payroll for GPU clusters disbursed with zero latency.',
      timestamp: '10:51 AM',
    }
  ]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Periodic autonomous AI conversation in war room
  useEffect(() => {
    const aiComments = [
      {
        name: 'Dr. Sophia Vance (CEO)',
        role: 'Chief Executive Officer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        dept: 'Executive',
        hi: 'मार्केट में फिनटेक और क्लाउड इंफ्रास्ट्रक्चर की मांग 40% बढ़ गई है। हम और अधिक उच्च-मूल्य अनुबंधों पर बोली लगा रहे हैं।',
        en: 'High-frequency algorithmic finance demand is up 40%. We are increasing automated tender bidding allocation.',
      },
      {
        name: 'David Sterling (Lead Dev)',
        role: 'Principal Systems Architect',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        dept: 'Engineering',
        hi: 'मैंने नए वितरित माइक्रो-सर्विसेज आर्किटेक्चर का कंपाइलेशन पूरा कर लिया है। सभी टेस्ट 100% पास हैं।',
        en: 'Distributed Rust microservices pipeline completed with zero mutation test failures. Pushing to staging.',
      },
      {
        name: 'Marcus Kane (Fintech AI)',
        role: 'Senior Quantitative Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        dept: 'Engineering',
        hi: 'लंदन और टोक्यो एक्सचेंज के बीच नया आर्बिट्राज अवसर मिला है। इससे कंपनी को अतिरिक्त शुद्ध लाभ प्राप्त हुआ।',
        en: 'Arbitrage spread captured across cross-border L2 orderbooks. Liquidity reserves yielded another $4,200.',
      },
      {
        name: 'Aegis Sentinel (Security Guard)',
        role: 'Security Sentinel',
        avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=150&auto=format&fit=crop&q=80',
        dept: 'Cyber Security',
        hi: 'जीरो-ट्रस्ट फायरवॉल सक्रिय है। सभी इनकमिंग वेबहुक्स का क्रिप्टोग्राफिक हैश 100% सत्यापित है।',
        en: 'Zero-Trust perimeter active. All client payload signatures verified against corporate Merkle root.',
      }
    ];

    const timer = setInterval(() => {
      const choice = aiComments[Math.floor(Math.random() * aiComments.length)];
      const newMsg: BoardMessage = {
        id: String(Date.now()),
        senderName: choice.name,
        senderRole: choice.role,
        senderAvatar: choice.avatar,
        department: choice.dept,
        text: isHindi ? choice.hi : choice.en,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev.slice(-18), newMsg]);
    }, 7000);

    return () => clearInterval(timer);
  }, [isHindi]);

  const handleSendDirective = (directiveText: string) => {
    if (!directiveText.trim()) return;

    sounds.playSuccess();

    // 1. Add Owner Directive Message
    const ownerMsg: BoardMessage = {
      id: String(Date.now()),
      senderName: `${userSession.name} (Supreme Owner)`,
      senderRole: 'Company Sovereign / Board Chairman',
      senderAvatar: userSession.avatar,
      department: 'Boardroom',
      text: directiveText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwner: true,
    };

    setMessages(prev => [...prev, ownerMsg]);
    setInputDirective('');

    // 2. CEO immediate acknowledgment
    setTimeout(() => {
      sounds.playCash();
      const ceoReply: BoardMessage = {
        id: String(Date.now() + 1),
        senderName: 'Dr. Sophia Vance (CEO)',
        senderRole: 'Chief Executive Officer',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        department: 'Executive',
        text: isHindi 
          ? `आदेश स्वीकार किया गया, सुप्रीम ऑनर! मैंने यह रणनीतिक निर्देश तुरंत सभी विभागों (विक्टर, डेविड और एजिस सेंटिनल) में लागू कर दिया है।`
          : `Directive acknowledged and prioritized immediately, Supreme Owner! Real-time neural weights across Ops, Dev, and Sentinel are reconfigured.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, ceoReply]);
    }, 1200);
  };

  const quickDirectives = [
    { label: isHindi ? '🚀 फिनटेक और हाई-यील्ड अनुबंधों पर ध्यान केंद्रित करें' : '🚀 Maximize FinTech High-Yield Deals', text: 'Dr. Sophia, increase automated bidding aggressively on Fortune 500 Fintech and Algorithmic Trading projects.' },
    { label: isHindi ? '🛡️ जीरो-ट्रस्ट सिक्योरिटी और फायरवॉल सख्त करें' : '🛡️ Tighten Zero-Trust Firewall', text: 'Aegis Sentinel, initiate maximum zero-trust quarantine mode on all external APIs and transaction gates.' },
    { label: isHindi ? '⚡ इंजीनियरिंग एजेंट्स को अतिरिक्त कंप्यूट बूस्ट दें' : '⚡ Allocate 50% More Compute to Devs', text: 'Maya & Victor, grant priority GPU compute allocation to David Sterling and Marcus to speed up contract delivery.' },
    { label: isHindi ? '💰 खजाने में रिज़र्व बफर 10% बढ़ाएं' : '💰 Increase Liquidity Reserve by 10%', text: 'Treasury directive: lock an extra 10% liquidity buffer in the corporate vault for upcoming high-frequency operations.' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>{isHindi ? 'एआई बोर्डरूम व लाइव वॉर रूम' : 'Autonomous AI Boardroom & Executive War Room'}</span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isHindi ? 'सभी एआई प्रमुखों की लाइव कॉर्पोरेट चर्चा' : 'Real-Time Inter-Agent Strategic Council'}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {isHindi 
              ? 'यहाँ सीईओ, एचआर, मैनेजर, इंजीनियर और सिक्यूरिटी गार्ड कंपनी के विकास पर लाइव चर्चा करते हैं। मालिक किसी भी समय सीधे आदेश दे सकता है।' 
              : 'Autonomous AI leadership collaborates live. Issue real-time executive orders to reconfigure corporate focus.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-emerald-300 font-bold">5 AI LEADS IN SESSION</span>
        </div>
      </div>

      {/* Main War Room Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[560px]">
        {/* Active Session Bar */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-slate-200">
              {isHindi ? 'लाइव सामरिक संवाद (Autonomous Stream)' : 'Autonomous Strategy Transcript'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {isHindi ? 'मालिक के आदेश पर तुरंत अमल' : 'Zero-Latency Execution'}
          </span>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/50">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 ${msg.isOwner ? 'flex-row-reverse' : ''}`}
            >
              <img 
                src={msg.senderAvatar} 
                alt={msg.senderName} 
                className={`w-9 h-9 rounded-xl object-cover shrink-0 border-2 ${
                  msg.isOwner ? 'border-amber-400' : 'border-slate-700'
                }`}
              />
              <div className={`max-w-xl space-y-1 ${msg.isOwner ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`font-bold ${msg.isOwner ? 'text-amber-300' : 'text-slate-200'}`}>
                    {msg.senderName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {msg.timestamp}
                  </span>
                </div>

                <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.isOwner 
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-100' 
                    : 'bg-slate-900 border border-slate-800 text-slate-300 shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Directives Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-amber-400 font-bold px-2 shrink-0 flex items-center gap-1">
            <Crown className="w-3.5 h-3.5" />
            <span>{isHindi ? 'त्वरित आदेश:' : 'Quick Directives:'}</span>
          </span>
          {quickDirectives.map((d, i) => (
            <button
              key={i}
              onClick={() => handleSendDirective(d.text)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/40 text-xs whitespace-nowrap transition-colors"
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Custom Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendDirective(inputDirective);
          }}
          className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input 
              type="text"
              placeholder={isHindi ? 'सुप्रीम ऑनर का निर्देश दर्ज करें (e.g. "सीईओ, नए क्लाउड प्रोजेक्ट्स पर ध्यान दो")...' : 'Issue executive board directive to AI leadership...'}
              value={inputDirective}
              onChange={e => setInputDirective(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={!inputDirective.trim()}
            className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-purple-600/20"
          >
            <span>{isHindi ? 'आदेश दें' : 'Dispatch Directive'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
