import React from 'react';
import { 
  Play, 
  Pause, 
  FastForward, 
  Briefcase, 
  ShieldAlert, 
  Wrench, 
  Activity, 
  CheckCircle2, 
  Zap,
  TrendingUp
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';

export const AutonomousControlBar: React.FC = () => {
  const { 
    isAutonomousRunning, 
    toggleAutonomous, 
    simulationSpeed, 
    setSimulationSpeed, 
    language,
    generateAutonomousContract,
    triggerSimulatedIntrusion,
    selfHealAllErrors,
    contracts,
    agents,
    errors,
    vault,
    currentRolePermission
  } = useEnterprise();

  const isHindi = language === 'hi';
  const activeContracts = contracts.filter(c => c.status === 'active' || c.status === 'review').length;
  const unresolvedErrors = errors.filter(e => !e.resolved).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: Simulation Engine Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={toggleAutonomous}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
              isAutonomousRunning
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
            }`}
          >
            {isAutonomousRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>{isHindi ? 'ऑटोनॉमस रोकें' : 'Pause Auto-Engine'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>{isHindi ? 'ऑटोनॉमस चालू करें' : 'Resume Auto-Engine'}</span>
              </>
            )}
          </button>

          {/* Speed Pills */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 px-2 font-medium flex items-center gap-1 text-[11px]">
              <FastForward className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">{isHindi ? 'गति:' : 'Speed:'}</span>
            </span>
            {[1, 2, 5].map(speed => (
              <button
                key={speed}
                onClick={() => setSimulationSpeed(speed)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  simulationSpeed === speed
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Live Engine Status Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>
              {isHindi ? 'AI क्लाइंट्स, काम और पेमेंट्स स्वतः जारी हैं' : 'AI Agents generating revenue & self-managing'}
            </span>
          </div>
        </div>

        {/* Center/Right: Action Triggers & System Health */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Force New Contract */}
          <button
            onClick={generateAutonomousContract}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            title={isHindi ? 'नया वैश्विक क्लाइंट अनुबंध आकर्षित करें' : 'Simulate new autonomous inbound client deal'}
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isHindi ? '+ नया क्लाइंट (Deal)' : '+ Inbound Client'}</span>
          </button>

          {/* Trigger Intrusion Test */}
          <button
            onClick={triggerSimulatedIntrusion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-200 hover:text-red-300 border border-slate-700 hover:border-red-500/30 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            title={isHindi ? 'साइबर गार्ड की क्षमता परखने के लिए टेस्ट अटैक भेजें' : 'Trigger simulated attack to test Sentinel Guard response'}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>{isHindi ? 'साइबर हमला टेस्ट' : 'Test Threat Intercept'}</span>
          </button>

          {/* Self Heal All Errors */}
          <button
            onClick={selfHealAllErrors}
            disabled={unresolvedErrors === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              unresolvedErrors > 0
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
                : 'bg-slate-800 text-slate-500 border border-slate-800 cursor-default'
            }`}
            title={isHindi ? 'सिस्टम की सभी त्रुटियाँ स्वतः ठीक करें' : 'Self-heal open service issues'}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHindi ? `स्वतः ठीक करें (${unresolvedErrors})` : `Self-Heal (${unresolvedErrors})`}</span>
          </button>
        </div>
      </div>

      {/* Mini Ticker Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              {isHindi ? 'कुल ग्रॉस कमाई' : 'Gross AI Earnings'}
            </div>
            <div className="font-mono font-bold text-slate-200">
              ${vault.totalRevenueEarned.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              {isHindi ? 'सक्रिय प्रोजेक्ट्स' : 'Active Contracts'}
            </div>
            <div className="font-mono font-bold text-slate-200">
              {activeContracts} {isHindi ? 'कार्यरत' : 'In Pipeline'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              {isHindi ? 'स्वायत्त कर्मचारी' : 'Autonomous Agents'}
            </div>
            <div className="font-mono font-bold text-slate-200">
              {agents.length} AI Agents (100% Autonomy)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              {isHindi ? 'सेंटिनल सुरक्षा शील्ड' : 'Zero-Trust Shield'}
            </div>
            <div className="font-mono font-bold text-emerald-400">
              100% (0 Breaches)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
