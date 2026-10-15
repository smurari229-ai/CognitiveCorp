import React, { useState } from 'react';
import { 
  Crown, 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  PieChart,
  Award,
  Globe2
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

export const ExecutiveOffice: React.FC = () => {
  const { 
    agents, 
    contracts, 
    vault, 
    openBankingModal, 
    language, 
    currentRolePermission 
  } = useEnterprise();

  const isHindi = language === 'hi';
  const ceoAgent = agents.find(a => a.id === 'agent-ceo-01') || agents[0];

  const [reserveRatio, setReserveRatio] = useState<number>(25);

  const totalContractValue = contracts.reduce((acc, c) => acc + c.budget, 0);
  const completedContracts = contracts.filter(c => c.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-purple-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-lg shrink-0">
            <img src={ceoAgent.avatar} alt={ceoAgent.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">{isHindi ? ceoAgent.hindiName : ceoAgent.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase">
                {isHindi ? 'चीफ एग्जीक्यूटिव ऑफिसर' : 'Chief Executive Officer (AI)'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi 
                ? 'मालिक (Supreme Owner) के आदेशानुसार कम्पनी का रणनीतिक मार्गदर्शन व विस्तार' 
                : 'Directly accountable to Supreme Owner for autonomous market domination & profit growth'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openBankingModal('withdraw')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all ${
              currentRolePermission.canWithdraw
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>{isHindi ? 'ओनर मुनाफा निकासी' : 'Owner Dividend Payout'}</span>
          </button>
        </div>
      </div>

      {/* CEO Strategic Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{isHindi ? 'कुल कंपनी वैल्यूएशन' : 'Corporate Valuation'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">$24,850,000</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span>▲ +18.4% {isHindi ? 'स्वायत्त विकास दर' : 'autonomous annual growth'}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{isHindi ? 'संचित ग्रॉस रेवेन्यू' : 'Cumulative Gross Inflow'}</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ${vault.totalRevenueEarned.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400">
            {completedContracts} {isHindi ? 'क्लाइंट प्रोजेक्ट्स संपन्न' : 'settled enterprise contracts'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{isHindi ? 'सीईओ लीडरशिप स्कोर' : 'CEO Performance Score'}</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-300">99.4 / 100</div>
          <div className="text-[11px] text-slate-400">
            {isHindi ? '100% स्वायत्त निर्णय दर' : 'Zero manual overrides needed'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>{isHindi ? 'सुरक्षा अनुपालन रेटिंग' : 'Corporate Risk Index'}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300">AAA (Ultra Safe)</div>
          <div className="text-[11px] text-slate-400">
            {isHindi ? 'सेंटिनल सुरक्षा शील्ड द्वारा प्रमाणित' : 'Guaranteed by Sentinel Guard'}
          </div>
        </div>
      </div>

      {/* Strategic Directives & Capital Allocation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Strategic Mandate */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'सीईओ स्वायत्त रणनीतिक फैसले (Live Directives)' : 'Active CEO Strategic Directives'}</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {isHindi ? 'रियल-टाइम एआई अडैप्टेशन' : 'Adaptive AI Execution'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">
                  1. {isHindi ? 'फॉर्च्यून 500 उच्च-मूल्य कॉन्ट्रैक्ट्स पर स्वतः बोली' : 'High-Ticket Enterprise Contract Bidding'}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                  {isHindi ? 'सक्रिय' : 'Executing'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isHindi 
                  ? 'सीईओ डॉ. सोफिया वेंस वैश्विक क्लाइंट्स (जर्मनी, अमेरिका, जापान, स्विट्जरलैंड) के $40,000-$80,000 बजट वाले अनुबंधों को स्वचालित रूप से जीत रही हैं।' 
                  : 'AI autonomously bids on enterprise contracts between $40k-$80k with 98% client win probability.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">
                  2. {isHindi ? 'स्वायत्त नकदी भंडार व आपातकालीन बफर प्रबंधन' : 'Automated Liquidity Cushion Management'}
                </span>
                <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">
                  {isHindi ? 'स्थिर' : 'Guaranteed'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isHindi 
                  ? 'खजाने में कम से कम $100,000 की तरल पूंजी सुरक्षित रखी जाती है, जिससे कंपनी के सर्वर और जीपीयू क्लस्टर बिना रुकावट 24 घंटे चलते रहें।' 
                  : 'Treasury keeps a dedicated $100k capital buffer to guarantee zero-downtime GPU compute and instantaneous payroll.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-white">
                  3. {isHindi ? 'एआई कर्मचारियों के लिए 100% स्वायत्तता व गुणवत्ता नियंत्रण' : 'Zero-Human Production Pipeline'}
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">
                  {isHindi ? 'लागू है' : 'Enforced'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isHindi 
                  ? 'इंजीनियर डेविड और मार्कस सीधे कोड कंपाइल करते हैं, विक्टर काम बांटता है, और एजिस सेंटिनल गार्ड हर लेन-देन को क्रिप्टोग्राफिकली वेरीफाई करता है।' 
                  : 'End-to-end hands-off loop: task decomposition, synthesis, compilation, code quality verification, and instant bank settlement.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Reserve Capital Slider & Owner Treasury Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'मालिक (Owner) खजाना नियंत्रण' : 'Owner Treasury Policy'}</span>
            </h3>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">{isHindi ? 'आपातकालीन रिजर्व अनुपात:' : 'Reserve Allocation Ratio:'}</span>
                <span className="font-mono font-bold text-amber-400">{reserveRatio}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                value={reserveRatio}
                onChange={e => setReserveRatio(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10% (Aggressive Payout)</span>
                <span>50% (High Safety)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">{isHindi ? 'उपलब्ध वितरण योग्य लाभ:' : 'Available Distributable Profit:'}</span>
                <span className="font-mono font-bold text-emerald-400">
                  ${Math.round(vault.balance * (1 - reserveRatio / 100)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">{isHindi ? 'सुरक्षित रिज़र्व पूंजी:' : 'Locked Reserve Buffer:'}</span>
                <span className="font-mono text-slate-300">
                  ${Math.round(vault.balance * (reserveRatio / 100)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openBankingModal('withdraw')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Crown className="w-4 h-4" />
            <span>{isHindi ? 'मालिक के बैंक/वॉलेट में ट्रांसफर करें' : 'Dispatch Profit Dividend'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
