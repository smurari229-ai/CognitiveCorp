import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  FileText, 
  Building2, 
  Smartphone, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  Printer, 
  Clock, 
  TrendingUp,
  Receipt
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';

export const FinanceDashboard: React.FC = () => {
  const { 
    vault, 
    transactions, 
    invoices, 
    openBankingModal, 
    openInvoiceModal, 
    language,
    currentRolePermission 
  } = useEnterprise();

  const [activeTab, setActiveTab] = useState<'invoices' | 'transactions'>('invoices');
  const isHindi = language === 'hi';

  return (
    <div className="space-y-6">
      {/* Treasury Master Vault Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>{isHindi ? '256-बिट एन्क्रिप्टेड ट्रेज़री वॉल्ट' : '256-Bit Encrypted Treasury Vault'}</span>
          </div>

          <div>
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              {isHindi ? 'उपलब्ध कुल बैंक व वॉल्ट बैलेंस (Liquid Balance)' : 'Total Liquid Vault Balance'}
            </div>
            <div className="text-3xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight mt-1">
              ${vault.balance.toLocaleString()}
            </div>
          </div>

          <p className="text-xs text-slate-400">
            {isHindi 
              ? 'एआई कर्मचारियों द्वारा अर्जित आय सीधे इस वॉल्ट में जमा होती है। मालिक किसी भी समय बैंक या यूपीआई में विड्रॉल कर सकता है।' 
              : 'Autonomous earnings from all completed contracts settle here. Instant disbursements to verified bank accounts & UPI.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => openBankingModal('deposit')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>{isHindi ? 'फंड्स जमा करें (Deposit)' : 'Deposit Funds'}</span>
          </button>

          <button
            onClick={() => openBankingModal('withdraw')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.02] ${
              currentRolePermission.canWithdraw 
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20' 
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>{isHindi ? 'मुनाफा निकालें (Withdraw)' : 'Withdraw Profits'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">{isHindi ? 'कुल संचित कमाई' : 'Gross Career Earned'}</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white">${vault.totalRevenueEarned.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-semibold">{isHindi ? '100% एआई जनरेटेड' : 'From AI contracts'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">{isHindi ? 'कुल निकाली गई राशि' : 'Total Withdrawn'}</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">${vault.totalWithdrawn.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400">{isHindi ? 'मालिक के खातों में' : 'Paid to Owner'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">{isHindi ? 'कुल डिपॉजिट टॉप-अप' : 'Total Deposited'}</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">${vault.totalDeposited.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400">{isHindi ? 'कैपिटल इनफ्लो' : 'Capital Injections'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">{isHindi ? 'पेरोल व कंप्यूट व्यय' : 'Compute & Payroll'}</div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300">${vault.totalPayrollPaid.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400">{isHindi ? 'ऑटोमेटेड डिस्ट्रीब्यूशन' : 'Auto Disbursed'}</div>
        </div>
      </div>

      {/* Switch between Invoices and Transactions Ledger */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'invoices' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{isHindi ? `ऑटोमेटेड इनवॉइस (${invoices.length})` : `Automated Invoices (${invoices.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'transactions' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>{isHindi ? `लेन-देन लेजर (${transactions.length})` : `Transaction Ledger (${transactions.length})`}</span>
            </button>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {isHindi ? 'सेंटिनल द्वारा सभी लेन-देन सत्यापित' : 'All records signed via SHA-256'}
          </span>
        </div>

        {/* Content: Invoices Table */}
        {activeTab === 'invoices' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'इनवॉइस संख्या' : 'Invoice Number'}</th>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'क्लाइंट नाम' : 'Client Organization'}</th>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'दिनांक' : 'Issued Date'}</th>
                  <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'मूल राशि' : 'Subtotal'}</th>
                  <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'कुल राशि (टैक्स सहित)' : 'Total Paid'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isHindi ? 'स्थिति' : 'Status'}</th>
                  <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'दस्तावेज़' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {invoice.invoiceNumber}
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {invoice.clientName}
                    </td>

                    <td className="py-3 px-4 text-slate-400">
                      {invoice.issuedDate}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-slate-300">
                      ${invoice.subtotal.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                      ${invoice.total.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PAID</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openInvoiceModal(invoice)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isHindi ? 'देखें / प्रिंट' : 'View / Print'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Content: Transactions Ledger */}
        {activeTab === 'transactions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'प्रकार' : 'Type'}</th>
                  <th className="py-3 px-4 font-semibold text-right">{isHindi ? 'राशि ($)' : 'Amount ($)'}</th>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'भुगतान चैनल' : 'Channel'}</th>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'भेजने वाला / पाने वाला' : 'Party Involved'}</th>
                  <th className="py-3 px-4 font-semibold">{isHindi ? 'रेफरेंस कोड' : 'Reference'}</th>
                  <th className="py-3 px-4 font-semibold text-center">{isHindi ? 'सुरक्षा सत्यापन' : 'Security Clearance'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                {transactions.map(tx => {
                  const isCredit = tx.type === 'revenue' || tx.type === 'deposit';

                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${
                            isCredit 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {isCredit ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="font-bold capitalize text-white">{tx.type}</div>
                            <div className="text-[10px] text-slate-400">{tx.category}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-sm">
                        <span className={isCredit ? 'text-emerald-400' : 'text-amber-400'}>
                          {isCredit ? '+' : '-'}${tx.amount.toLocaleString()}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                          {tx.paymentMethod}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-300">
                        <div className="font-medium truncate max-w-xs">{isCredit ? tx.sender : tx.recipient}</div>
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                        {tx.referenceNumber}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>CLEARED</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
