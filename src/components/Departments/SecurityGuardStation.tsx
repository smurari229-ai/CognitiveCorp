import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Radio, 
  Server, 
  Fingerprint,
  RefreshCw,
  Bug
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

export const SecurityGuardStation: React.FC = () => {
  const { 
    threats, 
    errors, 
    selfHealError, 
    selfHealAllErrors, 
    triggerSimulatedIntrusion, 
    agents, 
    language,
    currentRolePermission 
  } = useEnterprise();

  const isHindi = language === 'hi';
  const sentinelAgent = agents.find(a => a.department === 'security') || agents[agents.length - 1];

  const unresolvedErrors = errors.filter(e => !e.resolved);

  return (
    <div className="space-y-6">
      {/* Sentinel Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-indigo-950/40 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-red-500/50 shadow-lg shrink-0 relative">
            <img src={sentinelAgent.avatar} alt={sentinelAgent.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">{isHindi ? sentinelAgent.hindiName : sentinelAgent.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold uppercase">
                {isHindi ? 'चीफ ऑटोनॉमस सिक्यूरिटी गार्ड' : 'Chief Autonomous Security Sentinel'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isHindi 
                ? '24 घंटे सक्रिय साइबर गार्ड: अनाधिकृत घुसपैठ रोकना, डेटा एन्क्रिप्शन जांचना और त्रुटियों का स्वतः निवारण' 
                : 'Zero-Trust autonomous gatekeeper: real-time DDoS mitigation, cryptographic validation & error self-healing'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerSimulatedIntrusion}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/40 text-red-200 border border-red-500/40 text-xs font-bold transition-all hover:scale-[1.02]"
            title={isHindi ? 'सिक्यूरिटी गार्ड की तत्परता जांचने के लिए टेस्ट हमला भेजें' : 'Trigger simulated threat to verify instant interception'}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{isHindi ? 'टेस्ट हमला (Simulate Threat)' : 'Test Attack Intercept'}</span>
          </button>

          <button
            onClick={selfHealAllErrors}
            disabled={unresolvedErrors.length === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              unresolvedErrors.length > 0
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20 animate-pulse'
                : 'bg-slate-800 text-slate-500 border border-slate-800 cursor-default'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{isHindi ? 'सभी त्रुटियाँ स्वतः ठीक करें' : 'Self-Heal All Errors'}</span>
          </button>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>{isHindi ? 'शील्ड सुरक्षा स्थिति' : 'Shield Integrity'}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">100% SECURE</div>
          <div className="text-[11px] text-slate-400">Zero unauthorized breaches</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>{isHindi ? 'रोके गए कुल हमले' : 'Attacks Intercepted'}</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{threats.length} Threats</div>
          <div className="text-[11px] text-emerald-400">100% Blocked in &lt;12ms</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>{isHindi ? 'सिस्टम त्रुटियाँ (Open/Healed)' : 'Error Healing Rate'}</span>
            <Bug className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {unresolvedErrors.length === 0 ? '0 Open' : `${unresolvedErrors.length} Pending`}
          </div>
          <div className="text-[11px] text-slate-400">
            {errors.filter(e => e.resolved).length} {isHindi ? 'त्रुटियाँ स्वतः ठीक की गईं' : 'errors auto-resolved'}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>{isHindi ? 'एन्क्रिप्शन एन्क्लेव' : 'Encryption Standard'}</span>
            <Lock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">AES-256 GCM</div>
          <div className="text-[11px] text-slate-400">SHA-256 State Merkle Tree</div>
        </div>
      </div>

      {/* Main Grid: Threat Interception Log & Error Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Intercepted Cyber Threats */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>{isHindi ? 'रोके गए साइबर हमले (Threat Log)' : 'Intercepted Attacks Log'}</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                WAF ACTIVE
              </span>
            </div>

            <div className="space-y-3 mt-4 max-h-96 overflow-y-auto pr-1">
              {threats.map(threat => (
                <div key={threat.id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase ${
                        threat.severity === 'critical' 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {threat.threatType}
                      </span>
                      <span className="text-xs font-mono text-slate-300 font-medium">{threat.sourceIp}</span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{threat.status}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{threat.guardRemarks}</p>

                  <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                    <span>🛡️ {threat.defenseMechanism}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{isHindi ? 'सभी संदिग्ध आईपी पते स्वतः ब्लॉक किए जाते हैं' : 'Autonomous IP Quarantine Enforced'}</span>
            <span className="font-mono text-slate-300">Port 443 / TLS 1.3</span>
          </div>
        </div>

        {/* Right: Error Tracking & Autonomous Self-Healing */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Bug className="w-4 h-4 text-amber-400" />
                <span>{isHindi ? 'एरर ट्रैकिंग व स्वतः मरम्मत (Error Tracking & Self-Healing)' : 'Error Tracking & Self-Healing Engine'}</span>
              </h3>
              <span className="text-[11px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                DAEMON WATCH
              </span>
            </div>

            <div className="space-y-3 mt-4 max-h-96 overflow-y-auto pr-1">
              {errors.map(err => (
                <div 
                  key={err.id} 
                  className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                    err.resolved 
                      ? 'bg-slate-950/40 border-slate-800 opacity-80' 
                      : 'bg-amber-950/20 border-amber-500/40 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{err.code}</span>
                      <span className="text-[10px] text-slate-400">({err.service})</span>
                    </div>

                    {err.resolved ? (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isHindi ? 'स्वतः ठीक (Auto-Healed)' : 'Auto-Healed'}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => selfHealError(err.id)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1"
                      >
                        <Wrench className="w-3 h-3" />
                        <span>{isHindi ? 'अभी ठीक करें' : 'Heal Now'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-300">{err.message}</p>

                  {err.autoHealedBy && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      Remediated by: <span className="text-emerald-400">{err.autoHealedBy}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{isHindi ? 'सेल्फ-हीलिंग कर्नल हर 5 सेकंड में सिस्टम स्वास्थ्य जांचता है' : 'Auto-healing cluster continuously recovers failed nodes'}</span>
            <span className="font-mono text-emerald-400">99.999% SLA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
