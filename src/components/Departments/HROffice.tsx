import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  Award, 
  Flame, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  Activity,
  HeartHandshake
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { DepartmentId } from '../../types';

export const HROffice: React.FC = () => {
  const { 
    agents, 
    hireAgent, 
    fireAgent, 
    boostAgentMorale, 
    vault, 
    language,
    currentRolePermission 
  } = useEnterprise();

  const [showHireModal, setShowHireModal] = useState(false);
  const [name, setName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [department, setDepartment] = useState<DepartmentId>('engineering');
  const [hourlyCost, setHourlyCost] = useState(40);
  const [skills, setSkills] = useState('Deep Learning, Rust, Zero-Knowledge');

  const isHindi = language === 'hi';
  const hrAgent = agents.find(a => a.department === 'hr') || agents[1];

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !roleTitle) return;

    hireAgent({
      name,
      hindiName: `${name} (AI)`,
      roleTitle,
      department,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'idle',
      currentTask: 'Awaiting autonomous pipeline assignment from Victor Chen',
      hourlyCost,
      skills: skills.split(',').map(s => s.trim()),
    });

    setShowHireModal(false);
    setName('');
    setRoleTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-950/40 via-slate-900 to-purple-950/40 border border-pink-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-pink-500/50 shadow-lg shrink-0">
            <img src={hrAgent.avatar} alt={hrAgent.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">{isHindi ? hrAgent.hindiName : hrAgent.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[10px] font-bold uppercase">
                {isHindi ? 'मानव संसाधन व टैलेंट डायरेक्टर' : 'Director of Autonomous Talent'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi 
                ? 'स्वायत्त एआई मॉडल भर्ती, ऑटो पेरोल गणना, कार्यबल संतुष्टि व न्यूरल ऑप्टिमाइजेशन' 
                : 'Automated neural talent provisioning, real-time compute payroll, and agent health optimization'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowHireModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-600/20 transition-all hover:scale-[1.02]"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isHindi ? '+ नया एआई कर्मचारी जोड़ें' : '+ Hire AI Agent'}</span>
        </button>
      </div>

      {/* HR Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 uppercase tracking-wider">{isHindi ? 'सक्रिय एआई कार्यबल' : 'Active Autonomous Workforce'}</div>
          <div className="text-2xl font-bold font-mono text-white">{agents.length} Agents</div>
          <div className="text-[11px] text-pink-400">100% Fully Self-Operating</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 uppercase tracking-wider">{isHindi ? 'औसत कार्यबल मोराल' : 'Average Morale Index'}</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">97.8%</div>
          <div className="text-[11px] text-slate-400">Zero Burnout Detected</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 uppercase tracking-wider">{isHindi ? 'कुल पेरोल भुगतान' : 'Total Compute Payroll Disbursed'}</div>
          <div className="text-2xl font-bold font-mono text-purple-300">${vault.totalPayrollPaid.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">Auto-cleared to GPU clusters</div>
        </div>
      </div>

      {/* Workforce Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-pink-400" />
            <span>{isHindi ? 'कर्मचारी रोस्टर व प्रदर्शन' : 'Agent Performance Roster'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {agents.length} {isHindi ? 'सक्रिय एजेंट' : 'Agents Active'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'एजेंट नाम' : 'Agent'}</th>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'विभाग' : 'Department'}</th>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'स्थिति' : 'Status'}</th>
                <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'अर्जित राजस्व' : 'Revenue Earned'}</th>
                <th className="py-3 px-4 font-semibold text-center">{isHindi ? 'मोराल' : 'Morale'}</th>
                <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'कार्यवाही' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {agents.map(agent => (
                <tr key={agent.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-lg object-cover border border-slate-700" />
                      <div>
                        <div className="font-bold text-white">{isHindi ? agent.hindiName : agent.name}</div>
                        <div className="text-[11px] text-slate-400">{agent.roleTitle}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {agent.department}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="capitalize font-medium text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{agent.status}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                    ${agent.earnedRevenue.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 text-center font-mono font-semibold text-amber-300">
                    {agent.morale}%
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => boostAgentMorale(agent.id)}
                        className="px-2.5 py-1 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 font-semibold"
                        title="Boost Morale"
                      >
                        {isHindi ? 'बूस्ट' : 'Boost'}
                      </button>

                      {agent.department === 'engineering' && currentRolePermission.canHireFire && (
                        <button
                          onClick={() => fireAgent(agent.id)}
                          className="p-1 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                          title="Decommission Agent"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hire Modal */}
      {showHireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-pink-400" />
              <span>{isHindi ? 'नया ऑटोनॉमस एआई विशेषज्ञ नियुक्त करें' : 'Provision New AI Specialist'}</span>
            </h3>

            <form onSubmit={handleHireSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'एजेंट का नाम' : 'Agent Identifier / Name'}</label>
                <input 
                  type="text"
                  placeholder="e.g. Liam Vance AI"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'भूमिका का शीर्षक' : 'Role Title'}</label>
                <input 
                  type="text"
                  placeholder="e.g. Principal Zero-Knowledge Cryptographer"
                  value={roleTitle}
                  onChange={e => setRoleTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'विभाग' : 'Department'}</label>
                  <select 
                    value={department}
                    onChange={e => setDepartment(e.target.value as DepartmentId)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="engineering">Engineering & Production</option>
                    <option value="operations">Operations & Delivery</option>
                    <option value="hr">Human Resources</option>
                    <option value="security">Cyber Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'प्रति घंटा कंप्यूट लागत ($)' : 'Hourly Compute Cost ($)'}</label>
                  <input 
                    type="number"
                    value={hourlyCost}
                    onChange={e => setHourlyCost(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">{isHindi ? 'कौशल (कॉमा से अलग करें)' : 'Skills (Comma separated)'}</label>
                <input 
                  type="text"
                  value={skills}
                  onChange={e => setSkills(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowHireModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-md"
                >
                  {isHindi ? 'नियुक्ति पक्की करें' : 'Deploy Agent'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
