import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Terminal, 
  Zap, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Cpu, 
  DollarSign, 
  Flame, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

interface WorkforceFloorProps {
  onOpenCodeInspector?: () => void;
}

export const WorkforceFloor: React.FC<WorkforceFloorProps> = ({ onOpenCodeInspector }) => {
  const { agents, boostAgentMorale, language } = useEnterprise();
  const isHindi = language === 'hi';

  const workerAgents = agents.filter(a => a.department === 'engineering');

  // Simulated live execution logs for terminal
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[WORKER-04] David Sterling: Compiling Rust zero-allocation async event loop for Zenith BioTech...',
    '[WORKER-05] Marcus Kane: Calculating arbitrage spread across Tokyo & London L2 books: +$3,840 captured.',
    '[WORKER-06] Elena Rostova: Auto-negotiated SLA with Zurich BioLogics (Agreement signed via 256-bit token).',
    '[SENTINEL-07] Aegis Sentinel: Scanned AST binary for memory safety vulnerabilities. Integrity: 100%.',
  ]);

  useEffect(() => {
    const logs = [
      '[WORKER-04] David Sterling: Deployed eBPF micro-telemetry daemon with zero CPU penalty.',
      '[WORKER-05] Marcus Kane: Executed optimal liquidity swap routing. Saved $1,240 in slippage.',
      '[WORKER-06] Elena Rostova: Sent customized enterprise proposals to 18 Fortune 500 decision makers.',
      '[WORKER-04] David Sterling: Synthesized unit tests with 100% mutation branch coverage.',
      '[WORKER-05] Marcus Kane: Treasury yield model rebalanced to 8.4% APY risk-free equivalent.',
    ];

    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setTerminalLogs(prev => [randomLog, ...prev.slice(0, 12)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span>{isHindi ? 'स्वायत्त उत्पादन व इंजीनियरिंग कार्यबल' : 'Autonomous AI Worker Mesh'}</span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isHindi ? 'एआई कर्मचारी: जो खुद से कोड, मार्केटिंग और कमाई करते हैं' : 'Autonomous Production Agents'}</span>
          </h2>
          <p className="text-xs text-slate-400">
            {isHindi 
              ? 'बिना किसी मानवीय हस्तक्षेप के, ये एआई एजेंट्स सीधे सॉफ्टवेयर बनाते हैं, क्लाइंट्स को डिलीवर करते हैं और कंपनी के लिए रेवेन्यू कमाते हैं।' 
              : 'Direct producers of enterprise value: synthesis, distributed execution, yield generation, and automated revenue capture.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">{isHindi ? 'कार्यबल कुल कमाई' : 'Total Workforce Earnings'}</div>
            <div className="text-lg font-mono font-bold text-emerald-400">
              ${workerAgents.reduce((acc, a) => acc + a.earnedRevenue, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Agents Roster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workerAgents.map(agent => (
          <div 
            key={agent.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 relative">
                    <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{isHindi ? agent.hindiName : agent.name}</h4>
                    <div className="text-[11px] text-emerald-400 font-medium">{agent.roleTitle}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{isHindi ? 'कार्यक्षमता' : 'Efficiency'}</span>
                  <div className="text-xs font-mono font-bold text-white">{agent.efficiencyRating}%</div>
                </div>
              </div>

              {/* Current Task */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>{isHindi ? 'वर्तमान सक्रिय कार्य (Live Task):' : 'Current Task:'}</span>
                </div>
                <div className="text-slate-200 font-medium line-clamp-2 leading-relaxed">
                  {agent.currentTask}
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {agent.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Earnings & Boost */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{isHindi ? 'कंपनी के लिए अर्जित राजस्व:' : 'Total Earned for Firm:'}</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${agent.earnedRevenue.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'एआई मोराल:' : 'Morale:'}</span>
                </span>
                <span className="font-mono font-bold text-amber-300">{agent.morale}%</span>
              </div>

              <button
                onClick={() => boostAgentMorale(agent.id)}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isHindi ? 'कंप्यूट बूस्ट लागू करें' : 'Dispatch Compute Booster'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Code & Output Synthesis Terminal */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">
              {isHindi ? 'एआई वर्कर निष्पादन लाइव टर्मिनल (Live Work Execution Stream)' : 'Autonomous Worker Live Synthesis Stream'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenCodeInspector && (
              <button
                onClick={onOpenCodeInspector}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold transition-colors"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{isHindi ? 'सोर्स कोड देखें (View Code)' : 'Inspect Synthesized Code'}</span>
              </button>
            )}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono hidden sm:inline">100% CPU/GPU MESH</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 font-mono text-xs text-emerald-400/90 space-y-2 max-h-64 overflow-y-auto">
          {terminalLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-2 hover:bg-slate-900/50 p-1 rounded transition-colors">
              <span className="text-slate-600 select-none">&gt;</span>
              <span className="text-slate-300">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
