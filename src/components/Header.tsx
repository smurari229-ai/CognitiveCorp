import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  UserCheck, 
  LogIn, 
  LogOut, 
  Globe, 
  Sparkles,
  Lock,
  Volume2,
  VolumeX,
  CreditCard,
  Radio
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCardModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCardModal }) => {
  const { 
    userSession, 
    currentRolePermission, 
    vault, 
    language, 
    setLanguage, 
    openBankingModal, 
    openAuthModal, 
    logout,
    isAutonomousRunning
  } = useEnterprise();

  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    sounds.isMuted = !sounds.isMuted;
    setIsMuted(sounds.isMuted);
    if (!sounds.isMuted) {
      sounds.playSuccess();
    }
  };

  const isHindi = language === 'hi';

  const navItems = [
    { id: 'overview', label: isHindi ? '🏢 कम्पनी कॉर्पोरेट' : '🏢 Enterprise Floor' },
    { id: 'executive', label: isHindi ? '👑 CEO व ऑनर' : '👑 CEO & Owner' },
    { id: 'warroom', label: isHindi ? '🎙️ एआई वॉर रूम' : '🎙️ AI War Room' },
    { id: 'operations', label: isHindi ? '💼 क्लाइंट्स व प्रोजेक्ट्स' : '💼 Clients & Contracts' },
    { id: 'workforce', label: isHindi ? '⚡ एआई कर्मचारी' : '⚡ AI Workforce' },
    { id: 'hr', label: isHindi ? '👥 मानव संसाधन (HR)' : '👥 HR & Talent' },
    { id: 'security', label: isHindi ? '🛡️ सिक्यूरिटी गार्ड' : '🛡️ Sentinel Guard' },
    { id: 'analytics', label: isHindi ? '📊 एनालिटिक्स' : '📊 Analytics' },
    { id: 'finance', label: isHindi ? '💰 बैंक व इनवॉइस' : '💰 Banking & Invoices' },
    { id: 'audit', label: isHindi ? '📜 ऑडिट लॉग्स' : '📜 Audit Trail' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: Status & System Security */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-950 to-purple-950/80 border-b border-slate-800/80 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className={`w-2 h-2 rounded-full ${isAutonomousRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isAutonomousRunning ? (isHindi ? 'ऑटोनॉमस सिस्टम सक्रिय (AI कमाई जारी)' : 'AUTONOMOUS AI ENGINE LIVE') : (isHindi ? 'सिस्टम रुका हुआ है' : 'ENGINE PAUSED')}</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isHindi ? 'एजिस सेंटिनल गार्ड: 100% सुरक्षा' : 'Aegis Sentinel: Zero-Trust Active'}</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="hidden md:inline text-slate-400">
            {isHindi ? '256-बिट डेटाबेस एन्क्रिप्शन सुरक्षित' : 'AES-256 Vault Architecture Verified'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1 hover:text-white transition-colors bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60"
            title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-rose-400" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
            <span className="font-semibold text-[11px]">{isMuted ? 'Muted' : 'Audio ON'}</span>
          </button>

          <button 
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1 hover:text-white transition-colors bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60"
            title="Toggle English / Hindi"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span className="font-semibold text-[11px]">{language === 'hi' ? 'English' : 'हिन्दी (Hindi)'}</span>
          </button>
          
          <div className="text-slate-400 text-[11px] hidden lg:block">
            {isHindi ? 'सर्वर समय:' : 'Server Time:'} <span className="font-mono text-slate-200">2026-10-15 UTC</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-600 p-0.5 shadow-lg shadow-emerald-500/10">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CognitiveCorp
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                AI Enterprise
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>{isHindi ? 'स्व-संचालित ऑटोनॉमस कंपनी' : 'Self-Operating Autonomous DAO'}</span>
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            </p>
          </div>
        </div>

        {/* Treasury Vault & Banking Quick Access */}
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-950/80 border border-slate-800 rounded-xl p-1.5 sm:px-3 sm:py-2">
          <div className="flex items-center gap-2 pr-2 sm:pr-3 border-r border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                {isHindi ? 'कम्पनी खजाना' : 'Treasury Balance'}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 leading-none">
                ${vault.balance.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openBankingModal('deposit')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              title={isHindi ? 'कम्पनी में फंड्स जमा करें' : 'Deposit capital into treasury'}
            >
              <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isHindi ? 'डिपॉजिट' : 'Deposit'}</span>
            </button>

            <button
              onClick={() => openBankingModal('withdraw')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${
                currentRolePermission.canWithdraw 
                  ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-pointer'
              }`}
              title={
                currentRolePermission.canWithdraw 
                  ? (isHindi ? 'मालिक का मुनाफा निकालें' : 'Withdraw owner profits') 
                  : (isHindi ? 'केवल मालिक (Owner) को अनुमति है' : 'Restricted to Owner role')
              }
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              <span>{isHindi ? 'विड्रॉल' : 'Withdraw'}</span>
              {!currentRolePermission.canWithdraw && <Lock className="w-2.5 h-2.5 ml-0.5 text-slate-500" />}
            </button>

            {onOpenCardModal && (
              <button
                onClick={onOpenCardModal}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-all"
                title={isHindi ? 'ब्लैक मेटल कार्ड व यूपीआई क्यूआर' : 'Corporate Card & UPI QR'}
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                <span>{isHindi ? 'कार्ड' : 'Card'}</span>
              </button>
            )}
          </div>
        </div>

        {/* User Identity & Role Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={openAuthModal}
            className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 rounded-xl transition-colors text-left"
            title="Switch User Role or View Access Control Matrix"
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-600 flex-shrink-0">
              <img src={userSession.avatar} alt={userSession.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-semibold text-slate-200 leading-tight flex items-center gap-1">
                <span>{userSession.name}</span>
                <UserCheck className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${currentRolePermission.badgeColor}`}>
                  {isHindi ? currentRolePermission.hindiTitle : currentRolePermission.title}
                </span>
              </div>
            </div>
          </button>

          {userSession.isLoggedIn ? (
            <button
              onClick={logout}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30 transition-colors"
              title={isHindi ? 'लॉगआउट करें' : 'Log Out'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isHindi ? 'लॉगिन' : 'Log In'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/50">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 text-xs font-medium whitespace-nowrap rounded-lg transition-all ${
                isActive 
                  ? 'bg-slate-800 text-emerald-300 shadow-sm border border-slate-700/80 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
