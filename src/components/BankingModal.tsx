import React, { useState } from 'react';
import { 
  X, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Building2, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  QrCode,
  DollarSign
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';
import { PaymentMethodType } from '../types';

export const BankingModal: React.FC = () => {
  const { 
    isBankingModalOpen, 
    bankingModalMode, 
    closeBankingModal, 
    vault, 
    depositFunds, 
    withdrawFunds, 
    currentRolePermission,
    switchRole,
    language 
  } = useEnterprise();

  const [mode, setMode] = useState<'deposit' | 'withdraw'>(bankingModalMode || 'deposit');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('bank_wire');
  const [amount, setAmount] = useState<number>(25000);
  const [accountOrId, setAccountOrId] = useState<string>('HDFC-CORP-9923847291');
  const [partyName, setPartyName] = useState<string>('Sahil Murari (Owner Holding)');
  const [otpPin, setOtpPin] = useState<string>('2026');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isBankingModalOpen) return null;

  const isHindi = language === 'hi';
  const quickAmounts = [5000, 15000, 25000, 50000, 100000];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const res = depositFunds(amount, selectedMethod, {
      accountOrId,
      senderName: partyName,
      notes: `Capital injection via ${selectedMethod}`
    });

    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setTimeout(() => {
        closeBankingModal();
        setFeedback(null);
      }, 1600);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const res = withdrawFunds(amount, selectedMethod, {
      accountOrId,
      recipientName: partyName,
      otpPin
    });

    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setTimeout(() => {
        closeBankingModal();
        setFeedback(null);
      }, 1600);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const paymentMethods: { id: PaymentMethodType; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'bank_wire',
      label: isHindi ? 'बैंक ट्रांसफर (Wire / IMPS / SWIFT)' : 'Bank Wire / IMPS',
      icon: <Building2 className="w-4 h-4 text-emerald-400" />,
      desc: isHindi ? 'सभी प्रमुख अंतरराष्ट्रीय व भारतीय बैंक' : 'Global Swift, SEPA, ACH & IMPS/RTGS'
    },
    {
      id: 'upi_wallet',
      label: isHindi ? 'यूपीआई व वॉलेट (UPI / PhonePe / GPay)' : 'UPI & Digital Wallets',
      icon: <Smartphone className="w-4 h-4 text-cyan-400" />,
      desc: isHindi ? 'UPI ID, Google Pay, PhonePe, Paytm' : 'Instant 0% fee peer settlement'
    },
    {
      id: 'paypal',
      label: 'PayPal & Global Cards',
      icon: <CreditCard className="w-4 h-4 text-indigo-400" />,
      desc: isHindi ? 'क्रेडिट/डेबिट कार्ड व वैश्विक वॉलेट' : 'Multi-currency merchant checkout'
    },
    {
      id: 'crypto_usdc',
      label: 'Crypto Web3 (USDC / USDT)',
      icon: <DollarSign className="w-4 h-4 text-amber-400" />,
      desc: isHindi ? 'स्मार्ट कॉन्ट्रैक्ट तत्काल समाशोधन' : 'Zero-counterparty on-chain settlement'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{isHindi ? 'ट्रेज़री डेमो (असली भुगतान जुड़ा नहीं है)' : 'Treasury Demo (No Live Payments Connected)'}</span>
              </h2>
              <p className="text-xs text-slate-400">
                {isHindi 
                  ? 'यह स्क्रीन केवल नमूना डेटा दिखाती है; असली पैसा ट्रांसफर नहीं होता।' 
                  : 'Demo only: this screen does not transfer real money.'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeBankingModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs (Deposit vs Withdraw) */}
        <div className="grid grid-cols-2 p-2 bg-slate-950 border-b border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('deposit'); setFeedback(null); }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'deposit'
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
            <span>{isHindi ? 'कम्पनी में फंड्स जमा करें (Deposit)' : 'Deposit Capital'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode('withdraw'); setFeedback(null); }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'withdraw'
                ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-amber-400" />
            <span>{isHindi ? 'मुनाफा निकासी करें (Withdraw)' : 'Withdraw Profits'}</span>
            {!currentRolePermission.canWithdraw && <Lock className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>

        {/* Vault balance snapshot */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            {isHindi ? 'नमूना बैलेंस (असली पैसा नहीं):' : 'Simulated demo balance (not real funds):'}
          </span>
          <span className="font-mono text-base font-bold text-emerald-400">
            ${vault.balance.toLocaleString()}
          </span>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div className={`mx-6 mt-4 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Withdrawal Restriction Notice if not Owner */}
        {mode === 'withdraw' && !currentRolePermission.canWithdraw && (
          <div className="m-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>{isHindi ? 'अधिकार प्रतिबंध: केवल सुप्रीम ऑनर अनुमति प्राप्त है' : 'Access Restricted: Owner Permission Required'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isHindi 
                ? 'सिस्टम सुरक्षा नियमों के अनुसार, कंपनी के खजाने से मुनाफा केवल कंपनी मालिक (Supreme Owner) ही निकाल सकता है। कृपया नीचे दिए बटन से ऑनर रोल में स्विच करें।'
                : 'In accordance with corporate governance protocols, company treasury disbursements can only be initiated by the Supreme Owner.'}
            </p>
            <button
              onClick={() => switchRole('owner')}
              className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
            >
              {isHindi ? 'डेमो रोल बदलें' : 'Switch demo role'}
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={mode === 'deposit' ? handleDeposit : handleWithdraw} className="p-6 space-y-5">
          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {isHindi ? 'भुगतान माध्यम चुनें (Payment Channel)' : 'Select Payment Gateway Channel'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {paymentMethods.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(item.id);
                    if (item.id === 'bank_wire') {
                      setAccountOrId('HDFC-CORP-9923847291 (IFSC: HDFC0001923)');
                    } else if (item.id === 'upi_wallet') {
                      setAccountOrId('owner@okhdfcbank');
                    } else if (item.id === 'crypto_usdc') {
                      setAccountOrId('0x71C...8B3A (USDC ERC20)');
                    } else {
                      setAccountOrId('finance@cognitivecorp.ai');
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    selectedMethod === item.id
                      ? 'bg-slate-800 border-emerald-500/50 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input & Quick Buttons */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isHindi ? 'राशि दर्ज करें ($ USD)' : 'Transaction Amount ($ USD)'}
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {isHindi ? 'कोई शुल्क नहीं (0% Processing Fee)' : 'Zero Transaction Fee'}
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
              <input 
                type="number"
                min="100"
                step="100"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-lg font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Quick Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {quickAmounts.map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors ${
                    amount === val 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ${val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient / Sender Account & ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                {mode === 'deposit' 
                  ? (isHindi ? 'जमाकर्ता का नाम' : 'Sender Full Name') 
                  : (isHindi ? 'प्राप्तकर्ता का नाम' : 'Beneficiary Name')}
              </label>
              <input 
                type="text"
                value={partyName}
                onChange={e => setPartyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                {selectedMethod === 'upi_wallet' 
                  ? (isHindi ? 'UPI आईडी दर्ज करें (e.g. user@okhdfcbank)' : 'UPI ID (e.g. owner@okhdfcbank)') 
                  : selectedMethod === 'crypto_usdc'
                  ? (isHindi ? 'वॉलेट पता (Crypto Address)' : 'Web3 Wallet Address')
                  : (isHindi ? 'खाता संख्या / IBAN' : 'Bank Account / IBAN')}
              </label>
              <input 
                type="text"
                value={accountOrId}
                onChange={e => setAccountOrId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          {/* 2FA Security PIN for Withdrawal */}
          {mode === 'withdraw' && (
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <label className="block text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>{isHindi ? '2FA सुरक्षा पिन दर्ज करें (डिफ़ॉल्ट: 2026)' : '2FA Security Authorization PIN (Default: 2026)'}</span>
              </label>
              <input 
                type="password"
                maxLength={6}
                value={otpPin}
                onChange={e => setOtpPin(e.target.value)}
                placeholder="2026"
                className="w-full sm:w-48 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-sm font-mono text-white tracking-widest text-center focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={closeBankingModal}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              {isHindi ? 'रद्द करें' : 'Close'}
            </button>

            <button
              type="submit"
              disabled={mode === 'withdraw' && !currentRolePermission.canWithdraw}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all ${
                mode === 'deposit'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  : currentRolePermission.canWithdraw 
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {mode === 'deposit' ? (
                <>
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>{isHindi ? `$${amount.toLocaleString()} तत्काल जमा करें` : `Confirm Deposit ($${amount.toLocaleString()})`}</span>
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{isHindi ? `$${amount.toLocaleString()} मुनाफा निकालें` : `Execute Payout ($${amount.toLocaleString()})`}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
