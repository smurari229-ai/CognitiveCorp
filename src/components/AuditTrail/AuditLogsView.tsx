import React, { useState } from 'react';
import { 
  FileCheck2, 
  Search, 
  ShieldCheck, 
  Filter, 
  Hash, 
  Clock, 
  User, 
  Server,
  Lock
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

export const AuditLogsView: React.FC = () => {
  const { auditLogs, language, currentRolePermission } = useEnterprise();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  const isHindi = language === 'hi';

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = deptFilter === 'all' || log.department.toLowerCase().includes(deptFilter.toLowerCase());

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>{isHindi ? 'अपरिवर्तनीय क्रिप्टोग्राफिक ऑडिट ट्रेल' : 'Immutable Cryptographic Audit Trail'}</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            {isHindi ? 'उपयोगकर्ता व सिस्टम गतिविधि ऑडिट लॉग्स' : 'User Activity & System Operations Logs'}
          </h2>
          <p className="text-xs text-slate-400">
            {isHindi 
              ? 'प्रणाली के प्रत्येक निर्णय, वित्तीय लेन-देन, भूमिका परिवर्तन और सुरक्षा घटना का SHA-256 सुरक्षित रिकॉर्ड' 
              : 'Every access attempt, transaction signature, contract milestone, and policy change is cryptographically anchored.'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>MERKLE ROOT VERIFIED</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder={isHindi ? 'एक्शन, यूजर या विवरण खोजें...' : 'Search action, actor, or details...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline">{isHindi ? 'विभाग:' : 'Dept:'}</span>
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Departments</option>
            <option value="Treasury">Treasury</option>
            <option value="Operations">Operations</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Governance">Governance</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'समय' : 'Timestamp'}</th>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'कर्ता व भूमिका' : 'Actor & Role'}</th>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'विभाग' : 'Department'}</th>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'एक्शन कोड' : 'Action Code'}</th>
                <th className="py-3 px-4 font-semibold">{isHindi ? 'विवरण' : 'Details'}</th>
                <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'क्रिप्टो हैश' : 'SHA-256 Hash'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{log.actor}</div>
                    <div className="text-[10px] text-indigo-400">{log.role}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {log.department}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    {log.action}
                  </td>

                  <td className="py-3 px-4 text-slate-300 max-w-md">
                    {log.details}
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-[10px] text-slate-500 truncate max-w-[140px]">
                    {log.tamperProofHash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
