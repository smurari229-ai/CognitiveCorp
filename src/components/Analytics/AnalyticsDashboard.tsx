import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  Award, 
  DollarSign, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  Download
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

export const AnalyticsDashboard: React.FC = () => {
  const { vault, contracts, agents, threats, errors, language } = useEnterprise();
  const isHindi = language === 'hi';

  const completedContracts = contracts.filter(c => c.status === 'completed');
  const activeContracts = contracts.filter(c => c.status === 'active' || c.status === 'review');

  // Revenue trend mock points
  const points = [
    { day: 'Day 1', val: 180000 },
    { day: 'Day 2', val: 290000 },
    { day: 'Day 3', val: 420000 },
    { day: 'Day 4', val: 680000 },
    { day: 'Day 5', val: 950000 },
    { day: 'Day 6', val: 1280000 },
    { day: 'Today', val: vault.totalRevenueEarned }
  ];

  const maxVal = Math.max(...points.map(p => p.val));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'प्रशासनिक प्रदर्शन मूल्यांकन व डेटा एनालिटिक्स' : 'Real-Time Administrative Evaluation & Analytics'}</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {isHindi ? 'कंपनी का रियल-टाइम वित्तीय व संचालन मूल्यांकन' : 'Corporate Performance Intelligence'}
          </h2>
          <p className="text-xs text-slate-400">
            {isHindi 
              ? 'सभी विभागों, एआई कर्मचारियों के टर्नअराउंड, राजस्व वृद्धि और प्रशासनिक क्षमता का निष्पक्ष डेटा विश्लेषण' 
              : 'Objective algorithmic evaluation of autonomous departments, profit margins, and security resilience'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>{isHindi ? 'रिपोर्ट डाउनलोड करें' : 'Export Executive Report'}</span>
        </button>
      </div>

      {/* Administrative Performance Evaluation Scorecard */}
      <div>
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{isHindi ? 'प्रशासनिक प्रदर्शन मूल्यांकन स्कोरकार्ड (Evaluation Scorecard)' : 'Administrative Performance Scorecard'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{isHindi ? 'सीईओ रणनीति सफलता दर' : 'CEO Strategy Win Rate'}</span>
              <span className="font-mono text-emerald-400 font-bold">99.4%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.4%' }} />
            </div>
            <div className="text-[11px] text-slate-400">
              {isHindi ? 'फॉर्च्यून 500 बोली सफलता: 42/43 सौदे जीते' : '42 of 43 enterprise bids converted'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{isHindi ? 'ऑपरेशन्स समय पर डिलीवरी (SLA)' : 'Operations Delivery SLA'}</span>
              <span className="font-mono text-blue-400 font-bold">99.1%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '99.1%' }} />
            </div>
            <div className="text-[11px] text-slate-400">
              {isHindi ? 'औसत टर्नअराउंड: 3.4 मिनट प्रति स्प्रिंट' : 'Average sprint turnaround: 3.4 mins'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{isHindi ? 'कार्यबल संतुष्टि व न्यूरल मोराल' : 'Workforce Neural Morale'}</span>
              <span className="font-mono text-pink-400 font-bold">98.2%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full" style={{ width: '98.2%' }} />
            </div>
            <div className="text-[11px] text-slate-400">
              {isHindi ? '0% न्यूरल डिग्रेडेशन या थकावट' : 'Zero compute bottlenecks'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{isHindi ? 'सेंटिनल साइबर सुरक्षा शील्ड' : 'Cyber Security Shield'}</span>
              <span className="font-mono text-cyan-400 font-bold">100.0%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <div className="text-[11px] text-slate-400">
              {isHindi ? '0% अनधिकृत घुसपैठ या डेटा लीक' : 'Zero breaches / 100% WAF uptime'}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Revenue Growth SVG Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'संचित ग्रॉस राजस्व वृद्धि ट्रेंड ($ USD)' : 'Cumulative Gross Revenue Trend ($ USD)'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi ? 'एआई एजेंट्स द्वारा अर्जित आय की दैनिक प्रगति' : 'Real-time trajectory of corporate capital inflow'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">{isHindi ? 'वर्तमान कुल आय:' : 'Current Total:'}</span>
            <span className="font-mono font-bold text-emerald-400 text-lg ml-2">
              ${vault.totalRevenueEarned.toLocaleString()}
            </span>
          </div>
        </div>

        {/* SVG Curve */}
        <div className="h-56 w-full pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="100" x2="700" y2="100" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
            <line x1="0" y1="160" x2="700" y2="160" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />

            {/* Area fill */}
            <path
              d={`M 0,200 ${points.map((p, i) => {
                const x = (i / (points.length - 1)) * 700;
                const y = 190 - (p.val / maxVal) * 160;
                return `L ${x},${y}`;
              }).join(' ')} L 700,200 Z`}
              fill="url(#revenueGrad)"
            />

            {/* Line stroke */}
            <path
              d={`M ${points.map((p, i) => {
                const x = (i / (points.length - 1)) * 700;
                const y = 190 - (p.val / maxVal) * 160;
                return `${i === 0 ? '' : 'L '}${x},${y}`;
              }).join(' ')}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Point circles */}
            {points.map((p, i) => {
              const x = (i / (points.length - 1)) * 700;
              const y = 190 - (p.val / maxVal) * 160;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="5" fill="#047857" stroke="#10b981" strokeWidth="2.5" />
                  <text x={x} y={y - 12} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="Fira Code">
                    ${(p.val / 1000).toFixed(0)}k
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          {points.map((p, i) => (
            <span key={i}>{p.day}</span>
          ))}
        </div>
      </div>

      {/* Two Columns: Payment Channels & Revenue by Department */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Gateway Distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-cyan-400" />
            <span>{isHindi ? 'भुगतान चैनल वितरण (Payment Gateways)' : 'Payment Gateway Volume Share'}</span>
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{isHindi ? 'बैंक वायर (Bank Wire / IMPS / SWIFT)' : 'Bank Wire / SWIFT'}</span>
                <span className="font-mono text-emerald-400 font-bold">58% ($958,160)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '58%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">{isHindi ? 'यूपीआई व डिजिटल वॉलेट्स (UPI / Wallets)' : 'UPI & Digital Wallets'}</span>
                <span className="font-mono text-cyan-400 font-bold">24% ($396,480)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Crypto Web3 (USDC / USDT)</span>
                <span className="font-mono text-amber-400 font-bold">18% ($297,360)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            {isHindi 
              ? 'सभी भुगतान चैनलों में तत्काल समाशोधन (Instant Settlement) और शून्य डिफ़ॉल्ट दर है।' 
              : 'All settlement channels maintain 0.0% chargeback rate and instant ledger attestation.'}
          </div>
        </div>

        {/* Operating Margin & Net Profit */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'लाभ मार्जिन व परिचालन लागत' : 'Operating Efficiency & Margin'}</span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{isHindi ? 'शुद्ध लाभ मार्जिन (Net Margin):' : 'Net Profit Margin:'}</span>
                <span className="text-xl font-bold font-mono text-emerald-400">94.2%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isHindi 
                  ? 'पारंपरिक कंपनियों में 70% खर्च इंसानी कर्मचारियों पर होता है। यहाँ 100% ऑटोनॉमस एआई होने के कारण 94.2% शुद्ध मुनाफा मालिक को प्राप्त होता है।' 
                  : 'Zero human payroll bloat: corporate overhead is limited purely to GPU compute costs and zero-trust bandwidth.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">{isHindi ? 'दैनिक औसत रेवेन्यू' : 'Daily Run Rate'}</div>
              <div className="font-mono font-bold text-slate-200 mt-1">$55,000 / day</div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">{isHindi ? 'प्रति एआई औसतन उत्पादकता' : 'Revenue Per Agent'}</div>
              <div className="font-mono font-bold text-emerald-400 mt-1">
                ${Math.round(vault.totalRevenueEarned / agents.length).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
