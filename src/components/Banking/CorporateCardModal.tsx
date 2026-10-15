import React, { useState } from 'react';
import { 
  CreditCard, 
  X, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  QrCode, 
  Smartphone, 
  ShieldCheck, 
  ArrowDownLeft, 
  CheckCircle2,
  Printer,
  Sparkles
} from 'lucide-react';
import { useEnterprise } from '../../context/EnterpriseContext';
import { sounds } from '../../utils/soundEffects';

interface CorporateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorporateCardModal: React.FC<CorporateCardModalProps> = ({ isOpen, onClose }) => {
  const { vault, userSession, depositFunds, language } = useEnterprise();
  const isHindi = language === 'hi';

  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState(100000);
  const [qrAmount, setQrAmount] = useState(25000);
  const [scanStatus, setScanStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScanAndPay = () => {
    sounds.playCash();
    setScanStatus('scanning');

    setTimeout(() => {
      depositFunds(qrAmount, 'upi_wallet', {
        accountOrId: 'gpay.owner@okhdfcbank',
        senderName: 'Supreme Owner Mobile UPI',
        notes: `Instant UPI QR settlement into Treasury Vault ($${qrAmount.toLocaleString()})`
      });

      setScanStatus('success');
      setTimeout(() => {
        setScanStatus(null);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{isHindi ? 'कॉर्पोरेट ब्लैक मेटल कार्ड व यूपीआई स्कैनर' : 'Corporate Metal Card & UPI QR Passbook'}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {isHindi 
                  ? 'मालिक का असीमित कॉर्पोरेट खर्च कार्ड और यूपीआई क्यूआर कोड से तत्काल फंड जमा' 
                  : 'Exclusive corporate liquidity access and instant merchant QR clearing'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Top: The Luxurious Virtual Corporate Black Metal Card */}
          <div className="relative w-full max-w-md mx-auto aspect-[1.586] rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 p-6 sm:p-7 border border-slate-700/80 shadow-2xl flex flex-col justify-between overflow-hidden group">
            {/* Hologram metallic shimmer */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top row of card */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wider bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
                  CognitiveCorp
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  BLACK METAL
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-mono tracking-widest">WORLD ELITE</span>
              </div>
            </div>

            {/* Chip & Contactless */}
            <div className="flex items-center gap-3 z-10 my-1">
              <div className="w-10 h-7 rounded-md bg-gradient-to-r from-amber-400 to-amber-200 border border-amber-600/50 shadow-inner flex items-center justify-center">
                <div className="w-6 h-4 border border-amber-800/40 rounded-sm" />
              </div>
              <div className="text-slate-400 text-xs">
                <span className="font-mono text-sm tracking-widest text-slate-400">)))</span>
              </div>
            </div>

            {/* Card Number */}
            <div className="z-10">
              <div className="font-mono text-base sm:text-lg tracking-[0.25em] font-bold text-slate-100">
                {showDetails ? '5412 8892 4921 7842' : '•••• •••• •••• 7842'}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-end justify-between z-10 text-xs">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{isHindi ? 'कार्ड धारक' : 'CARDHOLDER'}</div>
                <div className="font-bold tracking-wider text-white font-mono uppercase">{userSession.name}</div>
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">{isHindi ? 'वैधता' : 'EXPIRES'}</div>
                <div className="font-mono font-bold text-slate-200">{showDetails ? '10/31' : '••/••'}</div>
              </div>

              <div>
                <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">CVV</div>
                <div className="font-mono font-bold text-amber-300">{showDetails ? '982' : '•••'}</div>
              </div>
            </div>

            {/* Frozen Overlay if Card is locked */}
            {isFrozen && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-2">
                <Lock className="w-8 h-8 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  {isHindi ? 'कार्ड अस्थायी रूप से फ्रोजन है' : 'Card Temporarily Frozen'}
                </span>
              </div>
            )}
          </div>

          {/* Card Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2 text-xs font-semibold text-slate-200 transition-colors"
            >
              {showDetails ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
              <span>{showDetails ? (isHindi ? 'विवरण छुपाएं' : 'Hide Card') : (isHindi ? 'कार्ड नंबर देखें' : 'Reveal Details')}</span>
            </button>

            <button
              onClick={() => setIsFrozen(!isFrozen)}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${
                isFrozen 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-slate-950/80 border-slate-800 text-slate-200'
              }`}
            >
              {isFrozen ? <Unlock className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-slate-400" />}
              <span>{isFrozen ? (isHindi ? 'अनफ्रीज करें' : 'Unfreeze') : (isHindi ? 'कार्ड फ्रीज करें' : 'Freeze Card')}</span>
            </button>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-center">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                <span>{isHindi ? 'खर्च सीमा' : 'Spend Limit'}</span>
                <span className="text-emerald-400 font-mono">${spendingLimit.toLocaleString()}</span>
              </div>
              <input 
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={spendingLimit}
                onChange={e => setSpendingLimit(Number(e.target.value))}
                className="accent-emerald-500 mt-1 cursor-pointer"
              />
            </div>
          </div>

          {/* UPI QR Code Scanner Section */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {isHindi ? 'तत्काल यूपीआई क्यूआर कोड डिपॉजिट (Instant UPI QR)' : 'Instant UPI Merchant QR Deposit'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {isHindi ? 'Google Pay, PhonePe, Paytm, BHIM या किसी भी बैंकिंग ऐप से स्कैन करें' : 'Supports all Indian UPI & Global Instant Wallets'}
                  </p>
                </div>
              </div>
              <div className="font-mono text-xs text-cyan-300 font-bold bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20">
                VPA: treasury@cognitivecorp.ai
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2">
              {/* Visual Simulated QR Code Box */}
              <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center shrink-0 border-4 border-slate-700">
                <div className="w-40 h-40 bg-slate-950 rounded-xl p-2 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white rounded-md flex items-center justify-center">
                      <div className="w-4 h-4 bg-white" />
                    </div>
                    <div className="w-10 h-10 border-4 border-white rounded-md flex items-center justify-center">
                      <div className="w-4 h-4 bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                      UPI
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-white rounded-md flex items-center justify-center">
                      <div className="w-4 h-4 bg-white" />
                    </div>
                    <div className="w-10 h-10 grid grid-cols-2 gap-1 p-1">
                      <div className="bg-white rounded-xs" />
                      <div className="bg-white rounded-xs" />
                      <div className="bg-white rounded-xs" />
                      <div className="bg-white rounded-xs" />
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-900 mt-2 font-mono">
                  SCAN WITH ANY UPI APP
                </span>
              </div>

              {/* QR Amount & Simulate Scan Button */}
              <div className="space-y-4 max-w-xs w-full text-center sm:text-left">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {isHindi ? 'क्यूआर डिपॉजिट राशि ($ USD):' : 'Deposit Amount ($ USD):'}
                  </label>
                  <div className="flex gap-1.5 justify-center sm:justify-start">
                    {[10000, 25000, 50000].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setQrAmount(amt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors ${
                          qrAmount === amt 
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        ${amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSimulateScanAndPay}
                  disabled={scanStatus === 'scanning'}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  {scanStatus === 'scanning' ? (
                    <>
                      <Smartphone className="w-4 h-4 animate-bounce" />
                      <span>{isHindi ? 'मोबाइल ऐप से पुष्टि हो रही है...' : 'Verifying via Mobile UPI...'}</span>
                    </>
                  ) : scanStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>{isHindi ? 'जमा सफल रहा!' : 'Payment Received!'}</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>{isHindi ? `स्कैन व पे टेस्ट ($${qrAmount.toLocaleString()})` : `Simulate Scan & Pay ($${qrAmount.toLocaleString()})`}</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500">
                  {isHindi ? '0% शुल्क • तत्काल खजाने में क्रेडिट' : 'Zero transaction fees • Instant Treasury Enclave settlement'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
