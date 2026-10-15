import React, { useState } from 'react';
import { EnterpriseProvider, useEnterprise } from './context/EnterpriseContext';
import { Header } from './components/Header';
import { AutonomousControlBar } from './components/AutonomousControlBar';
import { DepartmentOverview } from './components/Departments/DepartmentOverview';
import { ExecutiveOffice } from './components/Departments/ExecutiveOffice';
import { OperationsFloor } from './components/Departments/OperationsFloor';
import { WorkforceFloor } from './components/Departments/WorkforceFloor';
import { HROffice } from './components/Departments/HROffice';
import { SecurityGuardStation } from './components/Departments/SecurityGuardStation';
import { FinanceDashboard } from './components/Finance/FinanceDashboard';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import { AuditLogsView } from './components/AuditTrail/AuditLogsView';
import { WarRoomView } from './components/WarRoom/WarRoomView';
import { AuthModal } from './components/AuthModal';
import { BankingModal } from './components/BankingModal';
import { InvoiceModal } from './components/InvoiceModal';
import { CorporateCardModal } from './components/Banking/CorporateCardModal';
import { CodeInspectorModal } from './components/Departments/CodeInspectorModal';
import { NotificationsContainer } from './components/NotificationsContainer';
import { ShieldCheck, Building2, Lock, Terminal, Sparkles } from 'lucide-react';

function EnterpriseContent() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isCodeInspectorOpen, setIsCodeInspectorOpen] = useState(false);
  const { language } = useEnterprise();
  const isHindi = language === 'hi';

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <DepartmentOverview setActiveTab={setActiveTab} />;
      case 'executive':
        return <ExecutiveOffice />;
      case 'warroom':
        return <WarRoomView />;
      case 'operations':
        return <OperationsFloor />;
      case 'workforce':
        return <WorkforceFloor onOpenCodeInspector={() => setIsCodeInspectorOpen(true)} />;
      case 'hr':
        return <HROffice />;
      case 'security':
        return <SecurityGuardStation />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'audit':
        return <AuditLogsView />;
      default:
        return <DepartmentOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenCardModal={() => setIsCardModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Master autonomous control bar at the top */}
        <AutonomousControlBar />

        {/* Dynamic active view */}
        <div className="transition-all duration-300">
          {renderActiveView()}
        </div>
      </main>

      {/* Corporate Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 px-4 sm:px-6 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200">CognitiveCorp AI Enterprise Ltd.</span>
              <p className="text-[11px] text-slate-500">
                {isHindi 
                  ? 'स्वायत्त विकेंद्रीकृत कॉर्पोरेट संगठन • स्व-कमाई, बैंकिंग व सुरक्षा प्रणाली' 
                  : 'Autonomous Enterprise DAO • Self-Operating AI Corporate Architecture'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHindi ? '256-बिट बैंक-ग्रेड सुरक्षा' : '256-Bit Bank Grade Encryption'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Lock className="w-3.5 h-3.5" />
              <span>{isHindi ? 'जीरो-ट्रस्ट सेंटिनल शील्ड' : 'Zero-Trust Sentinel Guard'}</span>
            </span>
            <span>•</span>
            <span className="font-mono text-slate-300">SLA: 99.999% High Availability</span>
          </div>
        </div>
      </footer>

      {/* Modals & Floating Components */}
      <AuthModal />
      <BankingModal />
      <InvoiceModal />
      <CorporateCardModal isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} />
      <CodeInspectorModal isOpen={isCodeInspectorOpen} onClose={() => setIsCodeInspectorOpen(false)} />
      <NotificationsContainer />
    </div>
  );
}

export default function App() {
  return (
    <EnterpriseProvider>
      <EnterpriseContent />
    </EnterpriseProvider>
  );
}
