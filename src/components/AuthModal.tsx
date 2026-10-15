import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  KeyRound, 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Crown, 
  Briefcase, 
  Users, 
  Code, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';
import { UserRole } from '../types';
import { ROLE_PERMISSIONS } from '../mockData/initialData';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    userSession, 
    login, 
    language 
  } = useEnterprise();

  const [selectedRole, setSelectedRole] = useState<UserRole>(userSession.role);
  const [customName, setCustomName] = useState(userSession.name);
  const [customEmail, setCustomEmail] = useState(userSession.email);
  const [pin, setPin] = useState('2026');

  if (!isAuthModalOpen) return null;

  const isHindi = language === 'hi';

  const roleList: { role: UserRole; icon: React.ReactNode; color: string }[] = [
    { role: 'owner', icon: <Crown className="w-5 h-5 text-amber-400" />, color: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
    { role: 'ceo', icon: <Briefcase className="w-5 h-5 text-purple-400" />, color: 'border-purple-500/40 bg-purple-500/10 text-purple-300' },
    { role: 'hr_manager', icon: <Users className="w-5 h-5 text-pink-400" />, color: 'border-pink-500/40 bg-pink-500/10 text-pink-300' },
    { role: 'ops_manager', icon: <Briefcase className="w-5 h-5 text-blue-400" />, color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
    { role: 'worker', icon: <Code className="w-5 h-5 text-emerald-400" />, color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
    { role: 'security_guard', icon: <ShieldAlert className="w-5 h-5 text-red-400" />, color: 'border-red-500/40 bg-red-500/10 text-red-300' },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, customName, customEmail);
  };

  const handleQuickSwitch = (role: UserRole) => {
    setSelectedRole(role);
    const roleInfo = ROLE_PERMISSIONS[role];
    const defaultName = role === 'owner' ? 'Sahil Murari (Owner)' : roleInfo.title;
    setCustomName(defaultName);
    setCustomEmail(`${role}@cognitivecorp.ai`);
    login(role, defaultName, `${role}@cognitivecorp.ai`);
  };

  const activePerm = ROLE_PERMISSIONS[selectedRole];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{isHindi ? 'रोल-आधारित एक्सेस कंट्रोल (RBAC) व लॉगिन' : 'Role-Based Access Control (RBAC) & Login'}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {isHindi 
                  ? 'कंपनी के प्रत्येक विभाग के अनुसार अपनी भूमिका चुनें और उसके अधिकार देखें' 
                  : 'Select your operational persona to test department-level permissions & security barriers'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Select Personas */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {isHindi ? '1-क्लिक भूमिका का चयन करें (Switch Role)' : '1-Click Persona Switcher'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {roleList.map(item => {
                const perm = ROLE_PERMISSIONS[item.role];
                const isSelected = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleQuickSwitch(item.role)}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      isSelected 
                        ? `${item.color} shadow-lg scale-[1.02]` 
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="p-1.5 rounded-lg bg-slate-900/80">
                        {item.icon}
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {isHindi ? 'सक्रिय' : 'Active'}
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-sm leading-snug text-white">
                      {isHindi ? perm.hindiTitle : perm.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {perm.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Permissions Matrix for Selected Role */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isHindi ? 'सक्रिय भूमिका के अधिकार व अनुमतियाँ' : 'Access Permissions Matrix for'}</span>
                <span className="text-white font-semibold">({isHindi ? activePerm.hindiTitle : activePerm.title})</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                RBAC Level: {selectedRole === 'owner' ? 'L0-Root' : selectedRole === 'ceo' ? 'L1-Executive' : 'L2-Operational'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canWithdraw ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canWithdraw ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'मुनाफा निकासी (Withdraw Funds)' : 'Withdraw Profits'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canDeposit ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canDeposit ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'कैपिटल डिपॉजिट (Deposit Funds)' : 'Deposit Capital'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canManageBudget ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canManageBudget ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'बजट व रणनीति आवंटन' : 'Budget & Strategy'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canHireFire ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canHireFire ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'एआई भर्ती व पेरोल' : 'AI Hiring & Payroll'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canAssignProjects ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canAssignProjects ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'क्लाइंट्स व कॉन्ट्रैक्ट्स आवंटन' : 'Assign Client Projects'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canInspectSecurity ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canInspectSecurity ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'साइबर गार्ड व थ्रेट निरीक्षण' : 'Security Guard & WAF'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canResolveErrors ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canResolveErrors ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'त्रुटि निवारण (Self-Healing)' : 'Error Auto-Healing'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canAccessAuditLogs ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canAccessAuditLogs ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'अपरिवर्तनीय ऑडिट लॉग्स' : 'Cryptographic Audit Trail'}
                </span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                {activePerm.canExecuteWork ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                <span className={activePerm.canExecuteWork ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                  {isHindi ? 'सीधे कोड व कार्य निष्पादन' : 'Direct Production Engine'}
                </span>
              </div>
            </div>
          </div>

          {/* Custom Credentials Form */}
          <form onSubmit={handleLoginSubmit} className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isHindi ? 'कस्टम क्रेडेंशियल्स दर्ज करें' : 'Confirm Login Session'}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">{isHindi ? 'पूरा नाम' : 'Full Name'}</label>
                <input 
                  type="text" 
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">{isHindi ? 'ईमेल एड्रेस' : 'Email Address'}</label>
                <input 
                  type="email" 
                  value={customEmail}
                  onChange={e => setCustomEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">{isHindi ? 'सुरक्षा पिन (डिफ़ॉल्ट: 2026)' : 'Security PIN (Default: 2026)'}</label>
                <input 
                  type="password" 
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeAuthModal}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </button>
              
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
              >
                <span>{isHindi ? 'इस रोल से लॉगिन करें' : 'Apply & Enter System'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
