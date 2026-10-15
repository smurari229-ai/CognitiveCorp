import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { 
  AutonomousAgent, 
  ClientContract, 
  Invoice, 
  RolePermission, 
  SecurityThreat, 
  SystemErrorLog, 
  Transaction,
  AuditLog,
  CompanyVault,
  UserRole,
  PaymentMethodType,
  DepartmentId,
  EnterpriseKPIs,
} from '../types';
import { 
  INITIAL_AGENTS, 
  INITIAL_CONTRACTS, 
  INITIAL_INVOICES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_THREATS, 
  INITIAL_SYSTEM_ERRORS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_VAULT,
  ROLE_PERMISSIONS 
} from '../mockData/initialData';

export interface EnterpriseNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'security';
  title: string;
  hindiTitle: string;
  message: string;
  timestamp: number;
}

export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  loginTime: number;
}

interface EnterpriseContextType {
  userSession: UserSession;
  currentRolePermission: RolePermission;
  agents: AutonomousAgent[];
  contracts: ClientContract[];
  transactions: Transaction[];
  invoices: Invoice[];
  threats: SecurityThreat[];
  errors: SystemErrorLog[];
  auditLogs: AuditLog[];
  vault: CompanyVault;
  kpis: EnterpriseKPIs;
  isAutonomousRunning: boolean;
  simulationSpeed: number; // 1, 2, 5
  language: 'en' | 'hi';
  notifications: EnterpriseNotification[];
  selectedInvoice: Invoice | null;
  isBankingModalOpen: boolean;
  bankingModalMode: 'deposit' | 'withdraw';
  isAuthModalOpen: boolean;
  isInvoiceModalOpen: boolean;

  // Actions
  login: (role: UserRole, name?: string, email?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  toggleAutonomous: () => void;
  setSimulationSpeed: (speed: number) => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  openBankingModal: (mode: 'deposit' | 'withdraw') => void;
  closeBankingModal: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openInvoiceModal: (invoice: Invoice) => void;
  closeInvoiceModal: () => void;
  
  depositFunds: (amount: number, method: PaymentMethodType, details: { accountOrId: string; senderName: string; notes?: string }) => { success: boolean; message: string };
  withdrawFunds: (amount: number, method: PaymentMethodType, details: { accountOrId: string; recipientName: string; otpPin: string }) => { success: boolean; message: string };
  
  hireAgent: (newAgent: Omit<AutonomousAgent, 'id' | 'earnedRevenue' | 'tasksCompleted' | 'morale' | 'lastAction' | 'lastActionTimestamp' | 'efficiencyRating' | 'autonomousLevel'>) => void;
  fireAgent: (agentId: string) => void;
  boostAgentMorale: (agentId: string) => void;
  
  createManualContract: (contractData: Partial<ClientContract>) => void;
  generateAutonomousContract: () => void;
  
  selfHealError: (errorId: string) => void;
  selfHealAllErrors: () => void;
  triggerSimulatedIntrusion: () => void;
  dismissNotification: (id: string) => void;
}

const EnterpriseContext = createContext<EnterpriseContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cognitive_corp_state_v1';

const NEW_CLIENT_TEMPLATES = [
  {
    clientName: 'Tokyo High-Speed Transit AI',
    logo: '🚄',
    industry: 'Autonomous Transportation',
    projectTitle: 'Shinkansen Predictive Kinetic Safety Mesh',
    budget: 48000,
    deliverables: ['Real-Time Sensor Bus', 'Sub-millisecond Braking AI', 'Fault Telemetry'],
    country: 'Japan',
  },
  {
    clientName: 'Nordic Pharma Genomics',
    logo: '💊',
    industry: 'Bio-Pharmaceutical AI',
    projectTitle: 'Enzyme Receptor Kinetic Binding Algorithm',
    budget: 62000,
    deliverables: ['Neural Docking Pipeline', 'Affinity Matrix', 'Clinical Trial Synthesizer'],
    country: 'Sweden',
  },
  {
    clientName: 'Silicon Valley Autonomous Robotics',
    logo: '🤖',
    industry: 'Spatial Computing & Robotics',
    projectTitle: 'LiDAR Simultaneous Localization & Mapping (SLAM)',
    budget: 52000,
    deliverables: ['Point-Cloud Processor', 'Path Optimizer Engine', 'Collision Shield'],
    country: 'United States',
  },
  {
    clientName: 'Dubai Smart Port Logistics',
    logo: '🚢',
    industry: 'Maritime & Supply Chain',
    projectTitle: 'Autonomous Crane Container Routing Algorithm',
    budget: 45000,
    deliverables: ['Berth Allocation Model', 'Automated Guided Vehicle API', 'Throughput Tracker'],
    country: 'UAE',
  },
  {
    clientName: 'London Fintech Quantum Security',
    logo: '💷',
    industry: 'Institutional Banking',
    projectTitle: 'Quantum-Resistant Lattice Key Exchange Gateway',
    budget: 74000,
    deliverables: ['Kyber-1024 Wrapper', 'Zero-Knowledge Ledger', 'FIPS-140-3 Compliance Audit'],
    country: 'United Kingdom',
  },
  {
    clientName: 'Bangalore NextGen Space Tech',
    logo: '🛰️',
    industry: 'Satellite Constellation & Telecom',
    projectTitle: 'Inter-Satellite Laser Cross-Link Beamforming',
    budget: 58000,
    deliverables: ['Orbital Trajectory Optimizer', 'Doppler Compensation Core', 'Telemetry Telecommand UI'],
    country: 'India',
  }
];

export const EnterpriseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [userSession, setUserSession] = useState<UserSession>(() => {
    return {
      isLoggedIn: true,
      name: 'Sahil Murari (Supreme Owner)',
      email: 'owner@cognitivecorp.ai',
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      loginTime: Date.now(),
    };
  });

  const [agents, setAgents] = useState<AutonomousAgent[]>(INITIAL_AGENTS);
  const [contracts, setContracts] = useState<ClientContract[]>(INITIAL_CONTRACTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [threats, setThreats] = useState<SecurityThreat[]>(INITIAL_THREATS);
  const [errors, setErrors] = useState<SystemErrorLog[]>(INITIAL_SYSTEM_ERRORS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [vault, setVault] = useState<CompanyVault>(INITIAL_VAULT);

  const [isAutonomousRunning, setIsAutonomousRunning] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [notifications, setNotifications] = useState<EnterpriseNotification[]>([]);
  
  // Modals state
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isBankingModalOpen, setIsBankingModalOpen] = useState<boolean>(false);
  const [bankingModalMode, setBankingModalMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState<boolean>(false);

  const currentRolePermission = ROLE_PERMISSIONS[userSession.role] || ROLE_PERMISSIONS.owner;

  // Add Notification helper
  const addNotification = useCallback((notification: Omit<EnterpriseNotification, 'id' | 'timestamp'>) => {
    const id = 'notif-' + Math.random().toString(36).substring(2, 9);
    const newNotif: EnterpriseNotification = {
      ...notification,
      id,
      timestamp: Date.now(),
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]); // Keep max 5
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Add Audit Log helper
  const recordAudit = useCallback((action: string, department: string, details: string, actorOverride?: string, roleOverride?: string) => {
    const actor = actorOverride || userSession.name;
    const role = roleOverride || currentRolePermission.title;
    const hash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newLog: AuditLog = {
      id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: Date.now(),
      actor,
      role,
      action,
      department,
      details,
      ipAddress: '10.0.12.' + Math.floor(10 + Math.random() * 200),
      tamperProofHash: hash + '...' + hash.substring(0, 8),
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 100)]);
  }, [userSession.name, currentRolePermission.title]);

  // Auth & Roles
  const login = (role: UserRole, name?: string, email?: string) => {
    const roleInfo = ROLE_PERMISSIONS[role];
    const defaultName = name || (role === 'owner' ? 'Sahil Murari (Owner)' : roleInfo.title);
    const defaultEmail = email || `${role}@cognitivecorp.ai`;

    setUserSession({
      isLoggedIn: true,
      name: defaultName,
      email: defaultEmail,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      loginTime: Date.now(),
    });

    recordAudit('AUTH_LOGIN_SUCCESS', 'Security & Access', `User logged in with role: ${roleInfo.title} (${role})`);
    addNotification({
      type: 'info',
      title: `Logged in as ${roleInfo.title}`,
      hindiTitle: `${roleInfo.hindiTitle} के रूप में लॉगिन सफल`,
      message: `Active privileges: ${roleInfo.description}`,
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    recordAudit('AUTH_LOGOUT', 'Security & Access', `User ${userSession.name} (${userSession.role}) logged out`);
    setUserSession(prev => ({
      ...prev,
      isLoggedIn: false,
    }));
    addNotification({
      type: 'info',
      title: 'Logged Out',
      hindiTitle: 'लॉगआउट सफल',
      message: 'You are now viewing in guest observer mode. Log in to perform restricted corporate operations.',
    });
  };

  const switchRole = (role: UserRole) => {
    const roleInfo = ROLE_PERMISSIONS[role];
    setUserSession(prev => ({
      ...prev,
      role,
      isLoggedIn: true,
    }));
    recordAudit('ROLE_PERMISSION_SWITCH', 'Governance', `Clearance switched to ${roleInfo.title}`);
    addNotification({
      type: 'info',
      title: `Switched Role to ${roleInfo.title}`,
      hindiTitle: `रोल बदलकर ${roleInfo.hindiTitle} किया गया`,
      message: roleInfo.description,
    });
  };

  // Banking: Deposit
  const depositFunds = (
    amount: number, 
    method: PaymentMethodType, 
    details: { accountOrId: string; senderName: string; notes?: string }
  ) => {
    if (!currentRolePermission.canDeposit) {
      return { success: false, message: 'Current role permissions do not permit capital deposit.' };
    }
    if (amount <= 0 || isNaN(amount)) {
      return { success: false, message: 'Invalid deposit amount.' };
    }

    const refNum = method === 'bank_wire' 
      ? 'WIRE-' + Math.floor(10000000 + Math.random() * 90000000)
      : method === 'upi_wallet' 
      ? 'UPI-' + Math.floor(1000000000 + Math.random() * 9000000000)
      : 'TX-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const newTx: Transaction = {
      id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
      timestamp: Date.now(),
      type: 'deposit',
      amount,
      category: 'Capital Inflow / Top-Up',
      status: 'completed',
      paymentMethod: method,
      referenceNumber: refNum,
      sender: `${details.senderName} (${details.accountOrId})`,
      recipient: 'CognitiveCorp Enterprise Treasury Vault',
      notes: details.notes || 'Automated capital injection approved by Sentinel Security Enclave.',
      verifiedBySecurity: true,
      department: 'treasury',
    };

    setVault(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalDeposited: prev.totalDeposited + amount,
    }));

    setTransactions(prev => [newTx, ...prev]);
    recordAudit('TREASURY_DEPOSIT_COMPLETED', 'Treasury', `Deposited $${amount.toLocaleString()} via ${method} [Ref: ${refNum}]`);

    addNotification({
      type: 'success',
      title: 'Deposit Successful',
      hindiTitle: 'जमा (Deposit) सफल रहा',
      message: `$${amount.toLocaleString()} has been safely credited to Company Vault via ${method}.`,
    });

    try {
      sounds.playCash();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } catch {
      // ignore
    }

    return { success: true, message: `Successfully deposited $${amount.toLocaleString()}` };
  };

  // Banking: Withdrawal
  const withdrawFunds = (
    amount: number, 
    method: PaymentMethodType, 
    details: { accountOrId: string; recipientName: string; otpPin: string }
  ) => {
    if (!currentRolePermission.canWithdraw) {
      return { 
        success: false, 
        message: 'Access Denied: Only Supreme Owner clearance is authorized to withdraw corporate profits.' 
      };
    }
    if (amount <= 0 || isNaN(amount)) {
      return { success: false, message: 'Invalid withdrawal amount.' };
    }
    if (amount > vault.balance) {
      return { success: false, message: `Insufficient Vault balance! Available liquid: $${vault.balance.toLocaleString()}` };
    }
    if (details.otpPin !== '2026' && details.otpPin.length < 4) {
      return { success: false, message: 'Security Check Failed: Please enter 4-digit OTP/PIN (Try: 2026).' };
    }

    const refNum = method === 'bank_wire' 
      ? 'SWIFT-OUT-' + Math.floor(10000000 + Math.random() * 90000000)
      : method === 'upi_wallet' 
      ? 'UPI-PAYOUT-' + Math.floor(1000000000 + Math.random() * 9000000000)
      : 'PAYOUT-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const newTx: Transaction = {
      id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
      timestamp: Date.now(),
      type: 'withdrawal',
      amount,
      category: 'Owner Profit Payout',
      status: 'completed',
      paymentMethod: method,
      referenceNumber: refNum,
      sender: 'CognitiveCorp Enterprise Treasury Vault',
      recipient: `${details.recipientName} (${details.accountOrId})`,
      notes: `Direct profit distribution dispatched to owner via ${method}. Verified with 2FA token.`,
      verifiedBySecurity: true,
      department: 'treasury',
    };

    setVault(prev => ({
      ...prev,
      balance: prev.balance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount,
    }));

    setTransactions(prev => [newTx, ...prev]);
    recordAudit('TREASURY_WITHDRAWAL_DISPATCHED', 'Treasury', `Owner withdrew $${amount.toLocaleString()} to ${details.recipientName} via ${method}`);

    addNotification({
      type: 'success',
      title: 'Withdrawal Dispatched!',
      hindiTitle: 'निकासी (Withdrawal) तुरंत भेज दी गई!',
      message: `$${amount.toLocaleString()} transferred to ${details.accountOrId}. Ref: ${refNum}`,
    });

    try {
      sounds.playCash();
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    return { success: true, message: `Withdrawal of $${amount.toLocaleString()} complete!` };
  };

  // Modals
  const openBankingModal = (mode: 'deposit' | 'withdraw') => {
    setBankingModalMode(mode);
    setIsBankingModalOpen(true);
  };
  const closeBankingModal = () => setIsBankingModalOpen(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openInvoiceModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceModalOpen(true);
  };
  const closeInvoiceModal = () => {
    setIsInvoiceModalOpen(false);
    setSelectedInvoice(null);
  };

  // HR Management
  const hireAgent = (newAgentData: Omit<AutonomousAgent, 'id' | 'earnedRevenue' | 'tasksCompleted' | 'morale' | 'lastAction' | 'lastActionTimestamp' | 'efficiencyRating' | 'autonomousLevel'>) => {
    if (!currentRolePermission.canHireFire) {
      addNotification({
        type: 'warning',
        title: 'Permission Denied',
        hindiTitle: 'अनुमति नहीं है',
        message: 'Only Owner, CEO, or HR Director can hire new autonomous AI workers.',
      });
      return;
    }

    const id = `agent-${newAgentData.department}-${Math.floor(10 + Math.random() * 90)}`;
    const fullAgent: AutonomousAgent = {
      ...newAgentData,
      id,
      earnedRevenue: 0,
      tasksCompleted: 0,
      morale: 100,
      efficiencyRating: 98.5,
      autonomousLevel: 100,
      lastAction: 'Initialized neural weights and reported to department lead',
      lastActionTimestamp: Date.now(),
    };

    setAgents(prev => [...prev, fullAgent]);
    recordAudit('HR_AGENT_HIRED', 'Human Resources', `Hired new autonomous agent: ${fullAgent.name} (${fullAgent.roleTitle})`);
    addNotification({
      type: 'success',
      title: `Agent Hired: ${fullAgent.name}`,
      hindiTitle: `नया एआई कर्मचारी नियुक्त: ${fullAgent.hindiName}`,
      message: `Assigned to ${fullAgent.department.toUpperCase()} department at $${fullAgent.hourlyCost}/hr compute cost.`,
    });
  };

  const fireAgent = (agentId: string) => {
    if (!currentRolePermission.canHireFire) {
      addNotification({
        type: 'warning',
        title: 'Permission Denied',
        hindiTitle: 'अनुमति नहीं है',
        message: 'Only Owner, CEO, or HR Director can decommission AI agents.',
      });
      return;
    }
    const target = agents.find(a => a.id === agentId);
    if (!target) return;

    setAgents(prev => prev.filter(a => a.id !== agentId));
    recordAudit('HR_AGENT_DECOMMISSIONED', 'Human Resources', `Decommissioned agent ${target.name} (${target.roleTitle})`);
    addNotification({
      type: 'info',
      title: `Agent Decommissioned`,
      hindiTitle: `कर्मचारी हटाया गया`,
      message: `${target.name} has been archived from active operations.`,
    });
  };

  const boostAgentMorale = (agentId: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        return {
          ...a,
          morale: Math.min(100, a.morale + 15),
          efficiencyRating: Math.min(100, parseFloat((a.efficiencyRating + 0.5).toFixed(1))),
          lastAction: 'Received high-priority compute booster from management',
          lastActionTimestamp: Date.now(),
        };
      }
      return a;
    }));
    addNotification({
      type: 'success',
      title: 'Neural Boost Dispatched',
      hindiTitle: 'एआई बूस्टर लागू किया गया',
      message: 'Agent processing speed and morale raised to peak level.',
    });
  };

  // Contracts
  const createManualContract = (contractData: Partial<ClientContract>) => {
    if (!currentRolePermission.canAssignProjects) {
      addNotification({
        type: 'warning',
        title: 'Permission Denied',
        hindiTitle: 'अनुमति नहीं है',
        message: 'Your role cannot manually create or assign contracts.',
      });
      return;
    }

    const workerAgents = agents.filter(a => a.department === 'engineering' || a.department === 'operations');
    const randomWorker = workerAgents[Math.floor(Math.random() * workerAgents.length)] || agents[0];

    const newContract: ClientContract = {
      id: 'CTR-2026-' + Math.floor(100 + Math.random() * 900),
      clientName: contractData.clientName || 'Global Enterprise Partner Inc.',
      companyLogo: contractData.companyLogo || '🌐',
      industry: contractData.industry || 'Enterprise SaaS',
      projectTitle: contractData.projectTitle || 'Autonomous AI Workflows Integration',
      description: contractData.description || 'Custom end-to-end autonomous business processing.',
      budget: contractData.budget || 50000,
      progress: 0,
      status: 'active',
      assignedAgentId: randomWorker.id,
      assignedAgentName: randomWorker.name,
      priority: contractData.priority || 'high',
      deadline: 'Tomorrow, 20:00 UTC',
      createdAt: Date.now(),
      deliverables: contractData.deliverables || ['Core Engine API', 'Automated Verification Suite'],
      clientCountry: contractData.clientCountry || 'United States',
    };

    setContracts(prev => [newContract, ...prev]);
    recordAudit('CONTRACT_DISPATCHED', 'Operations', `New contract assigned to ${randomWorker.name}: ${newContract.projectTitle} ($${newContract.budget.toLocaleString()})`);
    addNotification({
      type: 'info',
      title: 'Contract Created & Dispatched',
      hindiTitle: 'नया प्रोजेक्ट क्लाइंट को आवंटित किया गया',
      message: `Assigned to ${randomWorker.name}. Value: $${newContract.budget.toLocaleString()}`,
    });
  };

  const generateAutonomousContract = useCallback(() => {
    const template = NEW_CLIENT_TEMPLATES[Math.floor(Math.random() * NEW_CLIENT_TEMPLATES.length)];
    const availableWorkers = agents.filter(a => a.department === 'engineering');
    const worker = availableWorkers[Math.floor(Math.random() * availableWorkers.length)] || agents[3];

    const id = 'CTR-2026-' + Math.floor(910 + Math.random() * 80);
    const newContract: ClientContract = {
      id,
      clientName: template.clientName,
      companyLogo: template.logo,
      industry: template.industry,
      projectTitle: template.projectTitle,
      description: `Autonomous contract bid secured by CEO Sophia Vance & Ops Manager Victor Chen. Assigned to ${worker.name}.`,
      budget: template.budget + Math.floor(Math.random() * 8000),
      progress: 5,
      status: 'active',
      assignedAgentId: worker.id,
      assignedAgentName: worker.name,
      priority: 'high',
      deadline: 'In 24 Hours',
      createdAt: Date.now(),
      deliverables: template.deliverables,
      clientCountry: template.country,
    };

    setContracts(prev => [newContract, ...prev.slice(0, 15)]);
    
    // Update worker task
    setAgents(prev => prev.map(a => {
      if (a.id === worker.id) {
        return {
          ...a,
          status: 'working',
          currentTask: `Executing ${template.projectTitle} for ${template.clientName}`,
          lastAction: `Began milestone compilation for ${newContract.id}`,
          lastActionTimestamp: Date.now(),
        };
      }
      return a;
    }));

    recordAudit('AUTONOMOUS_CLIENT_ACQUIRED', 'Operations', `Autonomous bidding secured contract ${id} with ${template.clientName} ($${newContract.budget.toLocaleString()})`, 'Sophia Vance AI', 'Chief Executive Officer');
    
    addNotification({
      type: 'info',
      title: `New Client Won: ${template.clientName}`,
      hindiTitle: `नया क्लाइंट कॉन्ट्रैक्ट मिला: ${template.clientName}`,
      message: `Autonomous bid won for $${newContract.budget.toLocaleString()}! Assigned to ${worker.name}.`,
    });
  }, [agents, recordAudit, addNotification]);

  // Security & Self-Healing
  const selfHealError = (errorId: string) => {
    try {
      sounds.playHeal();
    } catch {
      // ignore
    }
    setErrors(prev => prev.map(err => {
      if (err.id === errorId) {
        return {
          ...err,
          resolved: true,
          autoHealedBy: 'Aegis Sentinel Autonomous Kernel',
          resolvedAt: Date.now(),
        };
      }
      return err;
    }));

    recordAudit('ERROR_SELF_HEALED', 'Cyber Security', `Resolved error ${errorId} through autonomous container restart.`);
    addNotification({
      type: 'security',
      title: 'Service Self-Healed',
      hindiTitle: 'सिस्टम त्रुटि स्वतः ठीक (Auto-Healed) की गई',
      message: 'Sentinel Guard patched error and restored 100% throughput.',
    });
  };

  const selfHealAllErrors = () => {
    try {
      sounds.playHeal();
    } catch {
      // ignore
    }
    setErrors(prev => prev.map(err => ({
      ...err,
      resolved: true,
      autoHealedBy: 'Aegis Sentinel Fleet Self-Heal Core',
      resolvedAt: Date.now(),
    })));

    recordAudit('ALL_ERRORS_SELF_HEALED', 'Cyber Security', 'All open system errors auto-remediated and services verified.');
    addNotification({
      type: 'security',
      title: 'Full System Remediated',
      hindiTitle: 'सभी त्रुटियाँ सफलतापूर्वक ठीक हो गईं',
      message: '100% cloud nodes and microservices operational without downtime.',
    });
  };

  const triggerSimulatedIntrusion = () => {
    try {
      sounds.playShield();
    } catch {
      // ignore
    }
    const types: SecurityThreat['threatType'][] = ['SQL_Injection', 'DDoS', 'Auth_Brute_Force', 'Unauthorized_API', 'Data_Tamper'];
    const selectedType = types[Math.floor(Math.random() * types.length)];
    const ip = `${Math.floor(50 + Math.random() * 150)}.${Math.floor(10 + Math.random() * 200)}.${Math.floor(1 + Math.random() * 250)}.${Math.floor(1 + Math.random() * 250)}`;

    const newThreat: SecurityThreat = {
      id: 'THR-' + Math.floor(800 + Math.random() * 100),
      timestamp: Date.now(),
      threatType: selectedType,
      severity: selectedType === 'DDoS' ? 'critical' : 'high',
      sourceIp: `${ip} (Suspicious Autonomous Actor)`,
      status: 'blocked',
      defenseMechanism: 'Aegis Sentinel Zero-Trust Firewall + Cryptographic Handshake Quarantine',
      guardRemarks: `Simulated attack intercepted instantaneously. Source IP permanently blacklisted in corporate routing table.`,
    };

    setThreats(prev => [newThreat, ...prev.slice(0, 20)]);
    recordAudit('SECURITY_INTRUSION_INTERCEPTED', 'Cyber Security', `Sentinel Guard intercepted and blocked ${selectedType} attack from ${ip}`, 'Aegis Sentinel AI', 'Security Sentinel');
    
    addNotification({
      type: 'security',
      title: `Sentinel Blocked Attack: ${selectedType}`,
      hindiTitle: `सिक्यूरिटी गार्ड ने हमला रोका: ${selectedType}`,
      message: `Zero-Trust Shield neutralized threat from ${ip}. Corporate Vault secure!`,
    });
  };

  const toggleAutonomous = () => {
    setIsAutonomousRunning(prev => {
      const next = !prev;
      addNotification({
        type: next ? 'success' : 'warning',
        title: next ? 'Autonomous Mode Resumed' : 'Autonomous Mode Paused',
        hindiTitle: next ? 'ऑटोनॉमस मोड चालू' : 'ऑटोनॉमस मोड रोका गया',
        message: next ? 'AI agents are actively working and generating revenue.' : 'Simulation paused for manual administrative inspection.',
      });
      return next;
    });
  };

  // Main Autonomous Loop: Runs on interval adjusted by simulationSpeed
  useEffect(() => {
    if (!isAutonomousRunning) return;

    const baseInterval = 3200; // ~3.2 seconds
    const intervalTime = Math.max(800, baseInterval / simulationSpeed);

    const timer = setInterval(() => {
      // 1. Advance active contracts
      setContracts(prevContracts => {
        let moneyEarnedInTick = 0;
        const completedThisTick: ClientContract[] = [];

        const updated = prevContracts.map(contract => {
          if (contract.status === 'completed' || contract.status === 'invoiced') {
            return contract;
          }

          // Progress increment between 12% and 28%
          const increment = Math.floor(14 + Math.random() * 16);
          const nextProgress = Math.min(100, contract.progress + increment);

          if (nextProgress >= 100 && contract.progress < 100) {
            // Finished!
            moneyEarnedInTick += contract.budget;
            const completedContract = {
              ...contract,
              progress: 100,
              status: 'completed' as const,
              completedAt: Date.now(),
            };
            completedThisTick.push(completedContract);
            return completedContract;
          }

          return {
            ...contract,
            progress: nextProgress,
            status: nextProgress >= 90 ? ('review' as const) : ('active' as const),
          };
        });

        // If any contract finished, process revenue, invoice, payment gateway & security check
        if (completedThisTick.length > 0) {
          completedThisTick.forEach(completed => {
            const taxAmount = Math.round(completed.budget * 0.08);
            const totalWithTax = completed.budget + taxAmount;

            const invoiceNum = `CC-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
            const digitalHash = '0x' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

            const newInvoice: Invoice = {
              id: 'INV-' + Math.floor(1000 + Math.random() * 9000),
              invoiceNumber: invoiceNum,
              contractId: completed.id,
              clientName: completed.clientName,
              clientAddress: `${completed.clientCountry} Regional Operations Center, Suite 400`,
              clientTaxId: `${completed.clientCountry.substring(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}-AI`,
              issuedDate: new Date().toISOString().split('T')[0],
              dueDate: new Date().toISOString().split('T')[0],
              paidDate: new Date().toISOString().split('T')[0],
              items: completed.deliverables.map((item, idx) => ({
                id: String(idx + 1),
                description: item,
                qty: 1,
                rate: Math.round(completed.budget / completed.deliverables.length),
                amount: Math.round(completed.budget / completed.deliverables.length),
              })),
              subtotal: completed.budget,
              taxRate: 0.08,
              taxAmount,
              total: totalWithTax,
              status: 'paid',
              paymentMethod: 'bank_wire',
              digitalSignatureHash: digitalHash,
            };

            setInvoices(prev => [newInvoice, ...prev]);

            // Add transaction
            const newTx: Transaction = {
              id: 'TXN-' + Math.floor(10000 + Math.random() * 90000),
              timestamp: Date.now(),
              type: 'revenue',
              amount: totalWithTax,
              category: 'Autonomous Project Settlement',
              status: 'completed',
              paymentMethod: 'bank_wire',
              referenceNumber: `SWIFT-${Math.floor(10000000 + Math.random() * 90000000)}`,
              sender: completed.clientName,
              recipient: 'CognitiveCorp Enterprise Treasury Vault',
              notes: `Automated payment settlement for Contract ${completed.id}. Cleared and signed by Aegis Sentinel Security Guard.`,
              verifiedBySecurity: true,
              department: 'treasury',
            };

            setTransactions(prev => [newTx, ...prev]);

            // Credit vault
            setVault(prev => ({
              ...prev,
              balance: prev.balance + totalWithTax,
              totalRevenueEarned: prev.totalRevenueEarned + totalWithTax,
            }));

            // Credit assigned agent revenue
            setAgents(prevAgents => prevAgents.map(a => {
              if (a.id === completed.assignedAgentId) {
                return {
                  ...a,
                  earnedRevenue: a.earnedRevenue + completed.budget,
                  tasksCompleted: a.tasksCompleted + 1,
                  status: 'idle',
                  lastAction: `Completed ${completed.projectTitle} for $${completed.budget.toLocaleString()}`,
                  lastActionTimestamp: Date.now(),
                };
              }
              return a;
            }));

            // Audit
            recordAudit(
              'PAYMENT_RECEIVED_INVOICE_GENERATED',
              'Finance & Treasury',
              `Received $${totalWithTax.toLocaleString()} from ${completed.clientName}. Invoice ${invoiceNum} generated.`,
              'Aegis Sentinel AI',
              'Security Sentinel'
            );

            try {
              sounds.playCash();
            } catch {
              // ignore
            }

            addNotification({
              type: 'success',
              title: `+$${totalWithTax.toLocaleString()} Revenue Received!`,
              hindiTitle: `+$${totalWithTax.toLocaleString()} कम्पनी को प्राप्त हुआ!`,
              message: `${completed.clientName} paid invoice ${invoiceNum}. Direct into Treasury Vault!`,
            });
          });
        }

        return updated;
      });

      // 2. Random chance to spawn a new contract if count is low
      if (Math.random() > 0.65) {
        generateAutonomousContract();
      }

      // 3. Small chance for Sentinel Guard to block simulated intrusion
      if (Math.random() > 0.85) {
        triggerSimulatedIntrusion();
      }

      // 4. Autonomous Agent micro-activity update
      setAgents(prev => {
        const randIndex = Math.floor(Math.random() * prev.length);
        return prev.map((agent, i) => {
          if (i === randIndex) {
            const actions = [
              'Ran neural hyperparameter tuning on active deliverables',
              'Optimized memory caching latency by 2.4x',
              'Screened global B2B RFPs for autonomous bidding',
              'Audited 256-bit cryptographic vault signatures',
              'Synchronized microservices communication bus',
            ];
            return {
              ...agent,
              lastAction: actions[Math.floor(Math.random() * actions.length)],
              lastActionTimestamp: Date.now(),
            };
          }
          return agent;
        });
      });

    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutonomousRunning, simulationSpeed, generateAutonomousContract, recordAudit, addNotification]);

  // Compute live KPIs
  const activeContractsCount = contracts.filter(c => c.status === 'active' || c.status === 'review').length;
  const totalAgentsCount = agents.length;
  const securityShieldLevel = 100; // Active Sentinel
  const autoHealingSuccessRate = errors.length > 0 
    ? Math.round((errors.filter(e => e.resolved).length / errors.length) * 100) 
    : 100;
  const efficiencyScore = 98.7;
  const dailyRevenueRunRate = Math.round((vault.totalRevenueEarned / 30) * 1.2);

  const kpis: EnterpriseKPIs = {
    efficiencyScore,
    activeContractsCount,
    totalAgentsCount,
    securityShieldLevel,
    autoHealingSuccessRate,
    averageContractTurnaround: '3.4 Minutes',
    dailyRevenueRunRate,
  };

  return (
    <EnterpriseContext.Provider
      value={{
        userSession,
        currentRolePermission,
        agents,
        contracts,
        transactions,
        invoices,
        threats,
        errors,
        auditLogs,
        vault,
        kpis,
        isAutonomousRunning,
        simulationSpeed,
        language,
        notifications,
        selectedInvoice,
        isBankingModalOpen,
        bankingModalMode,
        isAuthModalOpen,
        isInvoiceModalOpen,
        login,
        logout,
        switchRole,
        toggleAutonomous,
        setSimulationSpeed,
        setLanguage,
        openBankingModal,
        closeBankingModal,
        openAuthModal,
        closeAuthModal,
        openInvoiceModal,
        closeInvoiceModal,
        depositFunds,
        withdrawFunds,
        hireAgent,
        fireAgent,
        boostAgentMorale,
        createManualContract,
        generateAutonomousContract,
        selfHealError,
        selfHealAllErrors,
        triggerSimulatedIntrusion,
        dismissNotification,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
};

export const useEnterprise = () => {
  const context = useContext(EnterpriseContext);
  if (!context) {
    throw new Error('useEnterprise must be used within an EnterpriseProvider');
  }
  return context;
};
