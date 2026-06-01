export interface Facility {
  id: string;
  name: string;
  location: string;
  scope1: number; // in tCO2e
  scope2: number; // in tCO2e
  scope3: number; // in tCO2e
  status: 'optimal' | 'warning' | 'critical';
  efficiencyScore: number; // percentage
}

export interface EmissionsSource {
  id: string;
  category: string; // e.g. "Electricity", "Fleet Fuel", "Supplier Deliveries"
  scope: 1 | 2 | 3;
  rawValue: number;
  rawUnit: string;
  tCO2e: number;
  sourceFile: string;
  auditHash: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  targetMetric: string;
  previousValue: string;
  newValue: string;
  integrityHash: string;
}

export interface SupplierNode {
  id: string;
  name: string;
  location: string;
  scope3Contribution: number; // in tCO2e
  reportingStatus: 'completed' | 'pending' | 'unresponsive';
  remindersSent: number;
  engagementScore: number; // percentage
}

export interface DemoBooking {
  id: string;
  clientName: string;
  email: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  message?: string;
  bookedAt: string;
  status: 'Confirmed' | 'Reviewing' | 'Expert Assigned';
}

export interface AiResponse {
  prompt: string;
  response: string;
  category: 'report' | 'anomaly' | 'compliance' | 'recommendation';
}
