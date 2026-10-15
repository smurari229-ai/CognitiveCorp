export type UserRole = 
  | 'owner' 
  | 'ceo' 
  | 'hr_manager' 
  | 'ops_manager' 
  | 'worker' 
  | 'security_guard';

export interface RolePermission {
  role: UserRole;
  title: string;
  hindiTitle: string;
  badgeColor: string;
  description: string;
  canWithdraw: boolean;
  canDeposit: boolean;
  canManageBudget: boolean;
  canHireFire: boolean;
  canAssignProjects: boolean;
  canExecuteWork: boolean;
  canInspectSecurity: boolean;
  canResolveErrors: boolean;
  canAccessAuditLogs: boolean;
}

export type DepartmentId = 
  | 'executive' 
  | 'hr' 
  | 'operations' 
  | 'engineering' 
  | 'security';

export interface AutonomousAgent {
  id: string;
  name: string;
  hindiName: string;
  department: DepartmentId;
  roleTitle: string;
  avatar: string;
  status: 'idle' | 'working' | 'analyzing' | 'guarding' | 'negotiating' | 'optimizing';
  currentTask: string;
  earnedRevenue: number;
  tasksCompleted: number;
  efficiencyRating: number; // 0 - 100
  hourlyCost: number;
  autonomousLevel: number; // 100%
  skills: string[];
  morale: number; // 0 - 100
  lastAction: string;
  lastActionTimestamp: number;
}

export type ContractStatus = 'bidding' | 'active' | 'review' | 'completed' | 'invoiced';

export interface ClientContract {
  id: string;
  clientName: string;
  companyLogo: string;
  industry: string;
  projectTitle: string;
  description: string;
  budget: number;
  progress: number; // 0 - 100
  status: ContractStatus;
  assignedAgentId: string;
  assignedAgentName: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  deadline: string;
  createdAt: number;
  completedAt?: number;
  deliverables: string[];
  clientCountry: string;
}

export type PaymentMethodType = 
  | 'bank_wire' 
  | 'upi_wallet' 
  | 'paypal' 
  | 'crypto_usdc' 
  | 'apple_pay';

export interface Transaction {
  id: string;
  timestamp: number;
  type: 'revenue' | 'deposit' | 'withdrawal' | 'payroll' | 'security_maintenance' | 'dividend';
  amount: number;
  category: string;
  status: 'completed' | 'processing' | 'flagged';
  paymentMethod: PaymentMethodType;
  referenceNumber: string;
  sender: string;
  recipient: string;
  notes: string;
  verifiedBySecurity: boolean;
  department: DepartmentId | 'treasury';
}

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  contractId: string;
  clientName: string;
  clientAddress: string;
  clientTaxId: string;
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: 'paid' | 'pending';
  paymentMethod: PaymentMethodType;
  digitalSignatureHash: string;
}

export interface SecurityThreat {
  id: string;
  timestamp: number;
  threatType: 'DDoS' | 'SQL_Injection' | 'Auth_Brute_Force' | 'Unauthorized_API' | 'Data_Tamper';
  severity: 'low' | 'medium' | 'high' | 'critical';
  sourceIp: string;
  status: 'blocked' | 'neutralized' | 'investigating';
  defenseMechanism: string;
  guardRemarks: string;
}

export interface SystemErrorLog {
  id: string;
  timestamp: number;
  service: string;
  code: string;
  message: string;
  severity: 'warn' | 'error' | 'fatal';
  resolved: boolean;
  autoHealedBy?: string;
  resolvedAt?: number;
}

export interface AuditLog {
  id: string;
  timestamp: number;
  actor: string;
  role: string;
  action: string;
  department: string;
  details: string;
  ipAddress: string;
  tamperProofHash: string;
}

export interface CompanyVault {
  balance: number;
  totalRevenueEarned: number;
  totalWithdrawn: number;
  totalDeposited: number;
  totalPayrollPaid: number;
  reserveCapital: number;
  pendingInvoicesAmount: number;
}

export interface EnterpriseKPIs {
  efficiencyScore: number;
  activeContractsCount: number;
  totalAgentsCount: number;
  securityShieldLevel: number;
  autoHealingSuccessRate: number;
  averageContractTurnaround: string;
  dailyRevenueRunRate: number;
}
