import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  Filter,
  DollarSign,
  User,
  Globe2,
  ExternalLink
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { ContractStatus, ClientContract } from '../../types';

export const OperationsFloor: React.FC = () => {
  const { 
    contracts, 
    agents, 
    generateAutonomousContract, 
    createManualContract, 
    openInvoiceModal, 
    invoices, 
    language,
    currentRolePermission 
  } = useEnterprise();

  const [filter, setFilter] = useState<'all' | ContractStatus>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Manual contract form
  const [clientName, setClientName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [budget, setBudget] = useState(45000);
  const [industry, setIndustry] = useState('Enterprise Cloud SaaS');
  const [country, setCountry] = useState('Germany');

  const isHindi = language === 'hi';
  const opsAgent = agents.find(a => a.department === 'operations') || agents[2];

  const filteredContracts = contracts.filter(c => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !projectTitle) return;

    createManualContract({
      clientName,
      projectTitle,
      budget,
      industry,
      clientCountry: country,
      deliverables: ['High-Throughput Microservice', 'Automated Verification Suite', 'API Documentation']
    });

    setShowCreateModal(false);
    setClientName('');
    setProjectTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Ops Floor Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500/50 shadow-lg shrink-0">
            <img src={opsAgent.avatar} alt={opsAgent.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">{isHindi ? opsAgent.hindiName : opsAgent.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-bold uppercase">
                {isHindi ? 'ऑपरेशन्स व डिलीवरी डायरेक्टर' : 'Operations & Pipeline Commander'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi 
                ? 'वैश्विक क्लाइंट्स का इनटेक, कार्यों का विभाजन, एआई इंजीनियर्स को आवंटन और समय पर डिलीवरी' 
                : 'Decomposing inbound client contracts into micro-sprints and routing to specialized AI Workers'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={generateAutonomousContract}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            title={isHindi ? 'नया ऑटोमेटेड क्लाइंट टेंडर लाएं' : 'Simulate autonomous client tender'}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isHindi ? '+ स्वायत्त क्लाइंट लाएं' : '+ Inbound Client'}</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>{isHindi ? 'कस्टम प्रोजेक्ट जोड़ें' : 'Manual RFP'}</span>
          </button>
        </div>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{isHindi ? 'फ़िल्टर:' : 'Filter:'}</span>
          </span>
          {(['all', 'active', 'review', 'completed'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
                filter === st 
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st === 'all' 
                ? (isHindi ? 'सभी प्रोजेक्ट्स' : 'All') 
                : st === 'active' 
                ? (isHindi ? 'प्रगति पर (Active)' : 'Active') 
                : st === 'review' 
                ? (isHindi ? 'समीक्षा में (Review)' : 'Under Review') 
                : (isHindi ? 'सफल व भुगतान प्राप्त' : 'Completed & Paid')}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          {filteredContracts.length} {isHindi ? 'अनुबंध प्रदर्शित' : 'Contracts Shown'}
        </div>
      </div>

      {/* Contracts Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContracts.map(contract => {
          const isDone = contract.status === 'completed';
          const matchedInvoice = invoices.find(inv => inv.contractId === contract.id);

          return (
            <div
              key={contract.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isDone 
                  ? 'bg-emerald-950/20 border-emerald-500/30 shadow-lg' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge & Client */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1.5 rounded-xl bg-slate-950 border border-slate-800">{contract.companyLogo}</span>
                    <div>
                      <div className="font-bold text-sm text-white">{contract.clientName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-cyan-400" />
                        <span>{contract.clientCountry} • {contract.industry}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isDone 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : contract.status === 'review' 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  }`}>
                    {isDone 
                      ? (isHindi ? 'सम्पन्न व चुकता' : 'Paid & Settled') 
                      : contract.status === 'review'
                      ? (isHindi ? 'क्यूए जांच जारी' : 'Final QA Review')
                      : (isHindi ? 'कार्य प्रगति पर' : 'Synthesizing')}
                  </span>
                </div>

                {/* Project Title & Description */}
                <div>
                  <h4 className="font-bold text-base text-slate-100">{contract.projectTitle}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{contract.description}</p>
                </div>

                {/* Deliverables tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {contract.deliverables.map((item, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                      ✓ {item}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{isHindi ? 'कार्य प्रगति:' : 'Autonomous Synthesis:'}</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">{contract.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isDone 
                          ? 'bg-emerald-500' 
                          : 'bg-gradient-to-r from-blue-500 to-emerald-400'
                      }`}
                      style={{ width: `${contract.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Footer info */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isHindi ? 'आवंटित एआई इंजीनियर' : 'Assigned AI Specialist'}</div>
                  <div className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{contract.assignedAgentName}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isHindi ? 'अनुबंध मूल्य (Budget)' : 'Contract Budget'}</div>
                  <div className="font-mono font-bold text-base text-emerald-400">
                    ${contract.budget.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* If completed, show invoice button */}
              {isDone && (
                <div className="pt-3 mt-3 border-t border-emerald-500/20 flex items-center justify-between">
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'भुगतान ट्रेज़री में जमा' : 'Settlement Vaulted'}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (matchedInvoice) {
                        openInvoiceModal(matchedInvoice);
                      } else {
                        openInvoiceModal(invoices[0]);
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'इनवॉइस देखें (Invoice)' : 'View Tax Invoice'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Manual RFP Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>{isHindi ? 'नया कस्टम क्लाइंट अनुबंध जोड़ें' : 'Create Custom Client RFP'}</span>
            </h3>

            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'क्लाइंट / कंपनी का नाम' : 'Client Organization Name'}</label>
                <input 
                  type="text"
                  placeholder="e.g. Zurich AI FinTech AG"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'प्रोजेक्ट का शीर्षक' : 'Project Title'}</label>
                <input 
                  type="text"
                  placeholder="e.g. Autonomous Liquidity Hedging Engine"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'बजट ($ USD)' : 'Budget ($ USD)'}</label>
                  <input 
                    type="number"
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'क्लाइंट देश' : 'Country'}</label>
                  <input 
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
                >
                  {isHindi ? 'अनुबंध प्रारंभ करें' : 'Dispatch Contract'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
