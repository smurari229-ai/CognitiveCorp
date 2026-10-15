import React from 'react';
import { 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  ShieldAlert, 
  X 
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';

export const NotificationsContainer: React.FC = () => {
  const { notifications, dismissNotification, language } = useEnterprise();
  const isHindi = language === 'hi';

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map(n => {
        const isSuccess = n.type === 'success';
        const isSecurity = n.type === 'security';
        const isWarning = n.type === 'warning';

        return (
          <div
            key={n.id}
            className={`pointer-events-auto p-3.5 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 flex items-start gap-3 ${
              isSecurity
                ? 'bg-red-950/90 border-red-500/50 text-red-200'
                : isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSecurity ? (
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              ) : isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : isWarning ? (
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              ) : (
                <Info className="w-4 h-4 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold leading-snug">
                {isHindi ? n.hindiTitle : n.title}
              </div>
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed line-clamp-2">
                {n.message}
              </p>
            </div>

            <button
              onClick={() => dismissNotification(n.id)}
              className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
