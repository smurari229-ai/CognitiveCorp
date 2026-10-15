import React from 'react';
import { 
  Building2, 
  Crown, 
  Briefcase, 
  Users, 
  Code, 
  ShieldCheck, 
  Wallet, 
  ArrowRight, 
  TrendingUp, 
  Activity, 
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { DepartmentId } from '../../types';

interface DepartmentOverviewProps {
  setActiveTab: (tab: string) => void;
}

export const DepartmentOverview: React.FC<DepartmentOverviewProps> = ({ setActiveTab }) => {
  const { 
    agents, 
    contracts, 
    vault, 
    threats, 
    errors, 
    language,
    currentRolePermission 
  } = useEnterprise();

  const isHindi = language === 'hi';

  const depts = [
    {
      id: 'executive',
      title: isHindi ? 'कार्यकारी कार्यालय व बोर्डरूम (CEO & Owner Suite)' : 'Executive Boardroom (CEO & Owner)',
      role: 'Dr. Sophia Vance (CEO) & Sahil Murari (Owner)',
      tagline: isHindi ? 'सामरिक निर्णय, वैश्विक अनुबंध और पूंजी प्रबंधन' : 'Strategic Governance & Capital Decisions',
      icon: <Crown className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500/10 via-slate-900 to-slate-950 border-amber-500/30 text-amber-300',
      revenue: vault.totalRevenueEarned,
      metrics: [
        { label: isHindi ? 'कॉर्पोरेट वैल्यूएशन' : 'Valuation', val: '$24.5M' },
        { label: isHindi ? 'सक्रिय रणनीति' : 'Strategy', val: 'Global B2B AI Expansion' }
      ],
      tabTarget: 'executive',
      agentCount: agents.filter(a => a.department === 'executive').length
    },
    {
      id: 'operations',
      title: isHindi ? 'ऑपरेशन्स व डिलीवरी सूट (Operations & Pipeline)' : 'Operations & Project Management',
      role: 'Victor Chen (Ops Manager AI)',
      tagline: isHindi ? 'क्लाइंट इनटेक, कार्य आवंटन, समय सीमा व डिलीवरी' : 'Client Inbound, Task Routing & SLAs',
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500/10 via-slate-900 to-slate-950 border-blue-500/30 text-blue-300',
      revenue: contracts.reduce((acc, c) => acc + (c.status === 'completed' ? c.budget : 0), 0),
      metrics: [
        { label: isHindi ? 'सक्रिय क्लाइंट्स' : 'Active Pipeline', val: `${contracts.filter(c => c.status !== 'completed').length} Contracts` },
        { label: isHindi ? 'डिलीवरी सफलता' : 'On-Time Rate', val: '99.4%' }
      ],
      tabTarget: 'operations',
      agentCount: agents.filter(a => a.department === 'operations').length
    },
    {
      id: 'workforce',
      title: isHindi ? 'एआई कार्यबल व इंजीनियरिंग लैब (Engineering & AI Workers)' : 'AI Engineering & Production Lab',
      role: 'David Sterling (Lead Dev), Marcus Kane (Fintech), Elena (Marketing)',
      tagline: isHindi ? 'स्वायत्त कोड जनरेशन, फिनटेक आर्बिट्राज, मार्केटिंग' : 'Autonomous Code Generation, Quantitative Yield & Sales',
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/10 via-slate-900 to-slate-950 border-emerald-500/30 text-emerald-300',
      revenue: agents.filter(a => a.department === 'engineering').reduce((acc, a) => acc + a.earnedRevenue, 0),
      metrics: [
        { label: isHindi ? 'कार्यरत एआई' : 'Specialist AIs', val: '3 Prime Agents' },
        { label: isHindi ? 'कोड निष्पादन दर' : 'Throughput', val: '4,200 loc/min' }
      ],
      tabTarget: 'workforce',
      agentCount: agents.filter(a => a.department === 'engineering').length
    },
    {
      id: 'hr',
      title: isHindi ? 'मानव संसाधन व टैलेंट हब (HR Department)' : 'Human Resources & Autonomous Talent',
      role: 'Maya Sharma (Director of Autonomous Talent)',
      tagline: isHindi ? 'एआई मॉडल हायरिंग, वेतन पेरोल, मोराल व टैलेंट इवैल्यूएशन' : 'Agent Deployment, Morale Tuning & Auto-Payroll',
      icon: <Users className="w-6 h-6 text-pink-400" />,
      color: 'from-pink-500/10 via-slate-900 to-slate-950 border-pink-500/30 text-pink-300',
      revenue: vault.totalPayrollPaid,
      metrics: [
        { label: isHindi ? 'कार्यबल संतुष्टि' : 'Morale Index', val: '98% Optimal' },
        { label: isHindi ? 'कुल पेरोल भुगतान' : 'Total Payroll', val: `$${vault.totalPayrollPaid.toLocaleString()}` }
      ],
      tabTarget: 'hr',
      agentCount: agents.filter(a => a.department === 'hr').length
    },
    {
      id: 'security',
      title: isHindi ? 'साइबर सेंटिनल व सिक्यूरिटी गार्ड (Security Sentinel)' : 'Cyber Sentinel & Security Guard Post',
      role: 'Aegis Sentinel (Chief Cyber Security Guard AI)',
      tagline: isHindi ? '24/7 फायरवॉल गार्ड, हमलावर ब्लॉकिंग, डेटा सुरक्षा व सेल्फ-हीलिंग' : 'Zero-Trust Gatekeeper, WAF, Threat Neutralization & Error Healing',
      icon: <ShieldCheck className="w-6 h-6 text-rose-400" />,
      color: 'from-rose-500/10 via-slate-900 to-slate-950 border-rose-500/30 text-rose-300',
      revenue: threats.length,
      metrics: [
        { label: isHindi ? 'हमले रोके गए' : 'Attacks Blocked', val: `${threats.length} Interceptions` },
        { label: isHindi ? 'सुरक्षा स्थिति' : 'Shield Integrity', val: '100% Zero Breaches' }
      ],
      tabTarget: 'security',
      agentCount: agents.filter(a => a.department === 'security').length
    },
    {
      id: 'finance',
      title: isHindi ? 'ट्रेज़री खजाना व बैंकिंग वॉल्ट (Treasury & Finance Vault)' : 'Treasury Vault & Payment Gateway',
      role: isHindi ? 'एआई समर्थित स्मार्ट बैंक वॉल्ट' : 'Autonomous 256-Bit Financial Engine',
      tagline: isHindi ? 'बैंक ट्रांसफर, यूपीआई वॉलेट्स, स्वचालित इनवॉइस व मुनाफा निकासी' : 'Wire Transfers, UPI Wallets, Crypto & Automatic Invoicing',
      icon: <Wallet className="w-6 h-6 text-teal-400" />,
      color: 'from-teal-500/10 via-slate-900 to-slate-950 border-teal-500/30 text-teal-300',
      revenue: vault.balance,
      metrics: [
        { label: isHindi ? 'तरल खजाना' : 'Liquid Vault', val: `$${vault.balance.toLocaleString()}` },
        { label: isHindi ? 'कुल निकासी' : 'Withdrawn', val: `$${vault.totalWithdrawn.toLocaleString()}` }
      ],
      tabTarget: 'finance',
      agentCount: 1
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner with Corporate Blueprint */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>{isHindi ? 'पूर्णतः स्वचालित एआई कॉर्पोरेट इकोसिस्टम' : '100% Fully Autonomous AI Enterprise Organization'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {isHindi 
              ? 'बड़ी कम्पनी की तरह संचालित, जहाँ हर विभाग और कर्मचारी स्वयं कमाते हैं' 
              : 'Autonomous Corporate Architecture where every AI Department executes & earns self-reliantly'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isHindi 
              ? 'यहाँ ओनर, सीईओ, एचआर, प्रोजेक्ट मैनेजर, एआई वर्कर और सिक्यूरिटी गार्ड—सभी ऑटोनॉमस एआई हैं। वे नए क्लाइंट्स लाते हैं, काम पूरा करते हैं, इनवॉइस बनाते हैं और पैसे सीधे कम्पनी के खजाने में जमा करते हैं।'
              : 'Owner, CEO, HR, Manager, Engineers, and Sentinel Guard operate autonomously 24/7. They source Fortune 500 contracts, synthesize deliverables, invoice clients, and deposit profits straight into the corporate treasury.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('operations')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <span>{isHindi ? 'सक्रिय क्लाइंट्स व काम देखें' : 'View Live Contracts Pipeline'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isHindi ? 'सिक्यूरिटी गार्ड स्टेशन' : 'Inspect Security Guard'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Department Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>{isHindi ? 'कंपनी के 6 मुख्य विभाग (Corporate Floor Matrix)' : 'Autonomous Enterprise Departments'}</span>
            </h2>
            <p className="text-xs text-slate-400">
              {isHindi ? 'हर विभाग में कार्यरत एआई एजेंट्स, उनकी कमाई और सक्रिय जिम्मेदारियाँ' : 'Operational status, revenue generated, and live agent roster per department'}
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            {isHindi ? 'सभी विभाग 100% सक्रिय' : 'All Departments 100% Operational'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {depts.map(dept => (
            <div
              key={dept.id}
              className={`p-5 rounded-2xl bg-gradient-to-br ${dept.color} border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                    {dept.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    {dept.agentCount} {isHindi ? 'एआई एजेंट' : 'Agents'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-white">{dept.title}</h3>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">{dept.role}</div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{dept.tagline}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  {dept.metrics.map((m, i) => (
                    <div key={i} className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{m.label}</div>
                      <div className="text-xs font-bold text-white font-mono mt-0.5 truncate">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">{isHindi ? 'विभाग प्रभाव' : 'Output / Funds'}</span>
                  <div className="text-sm font-bold font-mono text-emerald-400">
                    {dept.id === 'security' 
                      ? `${threats.length} ${isHindi ? 'हमले निष्फल' : 'Threats Deflected'}` 
                      : `$${dept.revenue.toLocaleString()}`}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab(dept.tabTarget)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <span>{isHindi ? 'विभाग खोलें' : 'Open Dept'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
