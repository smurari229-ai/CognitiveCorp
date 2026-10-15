import React from 'react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Download,
  QrCode
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';

export const InvoiceModal: React.FC = () => {
  const { 
    isInvoiceModalOpen, 
    closeInvoiceModal, 
    selectedInvoice, 
    language 
  } = useEnterprise();

  if (!isInvoiceModalOpen || !selectedInvoice) return null;

  const isHindi = language === 'hi';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Modal Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{isHindi ? 'ऑटोमेटेड इनवॉइस दस्तावेज़' : 'Automated Enterprise Invoice Document'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्रिंट / डाउनलोड करें' : 'Print / Download'}</span>
            </button>
            <button
              onClick={closeInvoiceModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-6 sm:p-8 bg-slate-900 text-slate-100 space-y-6">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">CognitiveCorp AI Inc.</span>
              </div>
              <p className="text-xs text-slate-400">
                Autonomous Global Engineering & Financial Operations Enclave
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Tax ID: US-EIN-98421039 | Cryptographic Vault: 0x88fA...91B2
              </p>
            </div>

            <div className="text-right sm:text-right space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {isHindi ? 'आधिकारिक टैक्स इनवॉइस' : 'OFFICIAL TAX INVOICE'}
              </div>
              <div className="text-lg font-mono font-bold text-white">
                {selectedInvoice.invoiceNumber}
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold uppercase">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isHindi ? 'भुगतान पूर्ण (PAID)' : 'PAID IN FULL'}</span>
              </div>
            </div>
          </div>

          {/* Client & Dates Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {isHindi ? 'क्लाइंट विवरण (Billed To):' : 'Billed To (Client):'}
              </div>
              <div className="font-bold text-sm text-white">{selectedInvoice.clientName}</div>
              <div className="text-slate-400 text-[11px]">{selectedInvoice.clientAddress}</div>
              <div className="text-slate-400 text-[11px] font-mono mt-0.5">Tax ID: {selectedInvoice.clientTaxId}</div>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {isHindi ? 'समय व अनुबंध संदर्भ:' : 'Contract & Invoice Dates:'}
              </div>
              <div><span className="text-slate-400">{isHindi ? 'कॉन्ट्रैक्ट आईडी:' : 'Contract ID:'}</span> <span className="font-mono text-slate-200">{selectedInvoice.contractId}</span></div>
              <div><span className="text-slate-400">{isHindi ? 'जारी दिनांक:' : 'Date Issued:'}</span> <span className="text-slate-200">{selectedInvoice.issuedDate}</span></div>
              <div><span className="text-slate-400">{isHindi ? 'निपटान दिनांक:' : 'Date Paid:'}</span> <span className="text-emerald-400 font-semibold">{selectedInvoice.paidDate || selectedInvoice.issuedDate}</span></div>
              <div><span className="text-slate-400">{isHindi ? 'भुगतान चैनल:' : 'Payment Method:'}</span> <span className="text-slate-200 uppercase font-mono">{selectedInvoice.paymentMethod}</span></div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">#</th>
                  <th className="py-2.5 px-4 font-semibold">{isHindi ? 'कार्य विवरण (Deliverable)' : 'Deliverable Description'}</th>
                  <th className="py-2.5 px-4 font-semibold text-center">{isHindi ? 'मात्रा' : 'Qty'}</th>
                  <th className="py-2.5 px-4 font-semibold text-right">{isHindi ? 'दर ($)' : 'Rate ($)'}</th>
                  <th className="py-2.5 px-4 font-semibold text-right">{isHindi ? 'कुल ($)' : 'Amount ($)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {selectedInvoice.items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4 font-medium text-white">{item.description}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.qty}</td>
                    <td className="py-3 px-4 text-right font-mono">${item.rate.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="text-xs text-slate-400 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{isHindi ? 'सेंटिनल गार्ड द्वारा सत्यापित' : 'Cryptographically Verified & Cleared'}</span>
              </div>
              <div className="font-mono text-[10px] break-all text-slate-500 bg-slate-950 p-2 rounded-xl border border-slate-800">
                HASH: {selectedInvoice.digitalSignatureHash}
              </div>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-slate-400">
                <span>{isHindi ? 'उप-कुल (Subtotal):' : 'Subtotal:'}</span>
                <span className="font-mono text-slate-200 font-semibold">${selectedInvoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{isHindi ? 'वैट / टैक्स (8% VAT):' : 'VAT / Tax (8%):'}</span>
                <span className="font-mono text-slate-200 font-semibold">${selectedInvoice.taxAmount.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-700/80 pt-2 flex justify-between text-sm font-bold text-white">
                <span className="text-emerald-400">{isHindi ? 'कुल राशि (Total Paid):' : 'Total Paid:'}</span>
                <span className="font-mono text-emerald-400 text-base">${selectedInvoice.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
