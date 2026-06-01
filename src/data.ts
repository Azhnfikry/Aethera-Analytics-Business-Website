import { Facility, EmissionsSource, AuditLogEntry, SupplierNode, AiResponse } from './types';

export const FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Singapore Semiconductor Fab-4',
    location: 'Changi, Singapore',
    scope1: 2450,
    scope2: 5800,
    scope3: 12400,
    status: 'optimal',
    efficiencyScore: 94
  },
  {
    id: 'fac-2',
    name: 'Frankfurt Data Cube Alpha',
    location: 'Frankfurt, Germany',
    scope1: 150,
    scope2: 12400,
    scope3: 3100,
    status: 'warning',
    efficiencyScore: 82
  },
  {
    id: 'fac-3',
    name: 'Dallas Logistics & Sorting Hub',
    location: 'Texas, USA',
    scope1: 4120,
    scope2: 1850,
    scope3: 24600,
    status: 'critical',
    efficiencyScore: 68
  },
  {
    id: 'fac-4',
    name: 'Kobe Robotics Assembly Plant',
    location: 'Kobe, Japan',
    scope1: 980,
    scope2: 2400,
    scope3: 8900,
    status: 'optimal',
    efficiencyScore: 91
  },
  {
    id: 'fac-5',
    name: 'Melbourne Cold Storage Facility',
    location: 'Victoria, Australia',
    scope1: 1840,
    scope2: 4100,
    scope3: 6200,
    status: 'optimal',
    efficiencyScore: 88
  }
];

export const EMISSIONS_SOURCES: EmissionsSource[] = [
  {
    id: 'src-1',
    category: 'Natural Gas Combustion (Heaters)',
    scope: 1,
    rawValue: 850000,
    rawUnit: 'm³',
    tCO2e: 1840,
    sourceFile: 'Utility_Bill_Gas_Q1_2026.pdf',
    auditHash: 'sha256-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
  },
  {
    id: 'src-2',
    category: 'Company Fleet Vehicles (Diesel)',
    scope: 1,
    rawValue: 420000,
    rawUnit: 'L',
    tCO2e: 1120,
    sourceFile: 'Procurement_Diesel_Ledger.xlsx',
    auditHash: 'sha256-b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6a1'
  },
  {
    id: 'src-3',
    category: 'Grid Electricity Consumption',
    scope: 2,
    rawValue: 28400000,
    rawUnit: 'kWh',
    tCO2e: 11400,
    sourceFile: 'Energy_Singapore_Power_Q1.pdf',
    auditHash: 'sha256-c3d4e5f6g7h8i9j0k1l2m3n4o5p6a1b2'
  },
  {
    id: 'src-4',
    category: 'Purchased Steam & Cooling',
    scope: 2,
    rawValue: 12500,
    rawUnit: 'MMBtu',
    tCO2e: 1450,
    sourceFile: 'Frankfurt_District_Heating_Invoice.csv',
    auditHash: 'sha256-d4e5f6g7h8i9j0k1l2m3n4o5p6a1b2c3'
  },
  {
    id: 'src-5',
    category: 'Supplier Raw Materials (Steel)',
    scope: 3,
    rawValue: 3500,
    rawUnit: 'tonnes',
    tCO2e: 6650,
    sourceFile: 'Nippon_Steel_LCA_Declaration.pdf',
    auditHash: 'sha256-e5f6g7h8i9j0k1l2m3n4o5p6a1b2c3d4'
  },
  {
    id: 'src-6',
    category: 'Upstream Logistics & Shipping',
    scope: 3,
    rawValue: 840000,
    rawUnit: 't-km',
    tCO2e: 2100,
    sourceFile: 'DHL_Scope3_Consolidated_Freight.csv',
    auditHash: 'sha256-f6g7h8i9j0k1l2m3n4o5p6a1b2c3d4e5'
  }
];

export const AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-109',
    timestamp: '2026-06-01 04:12',
    user: 'marcus.vance@aethera.com',
    action: 'Recalculate Scope 2',
    targetMetric: 'Frankfurt Data Cube Alpha Grid',
    previousValue: '12,240 tCO2e',
    newValue: '12,400 tCO2e',
    integrityHash: '0x8f3c7e...9a4b'
  },
  {
    id: 'aud-108',
    timestamp: '2026-06-01 02:45',
    user: 'automated.iot-sync@aethera.internal',
    action: 'IoT Sensor Push',
    targetMetric: 'Singapore Fab-4 Smart Submetering',
    previousValue: '5,785 tCO2e',
    newValue: '5,800 tCO2e',
    integrityHash: '0x4d2a1e...3b7f'
  },
  {
    id: 'aud-107',
    timestamp: '2026-05-31 18:30',
    user: 'sustainability.auditor.deloitte@partner.com',
    action: 'Audit Freeze Applied',
    targetMetric: 'Scope 1 & 2 Historical Baseline',
    previousValue: 'Open',
    newValue: 'Locked & Sealed',
    integrityHash: '0xe5a1c9...2f8a'
  },
  {
    id: 'aud-106',
    timestamp: '2026-05-31 11:15',
    user: 'kenji.sato@aethera.com',
    action: 'Ingest External LCA File',
    targetMetric: 'Supplier Raw Materials (Steel)',
    previousValue: '6,200 tCO2e',
    newValue: '6,650 tCO2e',
    integrityHash: '0x1b9c8d...7e5f'
  }
];

export const SUPPLIERS: SupplierNode[] = [
  {
    id: 'sup-1',
    name: 'Pacific Electronics Ltd',
    location: 'Hsinchu, Taiwan',
    scope3Contribution: 4500,
    reportingStatus: 'completed',
    remindersSent: 0,
    engagementScore: 98
  },
  {
    id: 'sup-2',
    name: 'Advanced Freight & Oceans',
    location: 'Rotterdam, Netherlands',
    scope3Contribution: 3100,
    reportingStatus: 'pending',
    remindersSent: 1,
    engagementScore: 75
  },
  {
    id: 'sup-3',
    name: 'Sumitomo Alloys Corp',
    location: 'Osaka, Japan',
    scope3Contribution: 5800,
    reportingStatus: 'completed',
    remindersSent: 0,
    engagementScore: 92
  },
  {
    id: 'sup-4',
    name: 'Apex Packing Materials Oy',
    location: 'Helsinki, Finland',
    scope3Contribution: 1200,
    reportingStatus: 'unresponsive',
    remindersSent: 3,
    engagementScore: 28
  },
  {
    id: 'sup-5',
    name: 'Global Foundry Core Co',
    location: 'Seoul, South Korea',
    scope3Contribution: 7900,
    reportingStatus: 'completed',
    remindersSent: 0,
    engagementScore: 95
  }
];

export const AI_RESPONSES: AiResponse[] = [
  {
    prompt: 'Check compliance readiness for Singapore SGX mandate',
    category: 'compliance',
    response: 'ANALYSIS REPORT: SGX Sustainability Reporting Mandate (2025/2026 Climate Alignment)\n\nSTATUS COMPLIANCE: 88% READY\n\nIdentified Gaps:\n1. Scope 3 supply chain greenhouse gas emission accounts require strict third-party assurance for large-cap issuers.\n2. Scenario modeling for temperature increases (1.5°C vs 2.0°C) is missing in Facility-2 (Frankfurt) and Facility-3 (Dallas).\n\nActions Recommended:\n- Enable Aethera Scope 3 automated portal to request standard carbon LCA indices from Pacific Electronics and Sumitomo Alloys.\n- Trigger climate scenario forecast calculations using our transition risk models.'
  },
  {
    prompt: 'Analyze emissions anomalies in Dallas Logistics Hub',
    category: 'anomaly',
    response: 'ANOMALY DETECTION REPORT // FACILITY-3 (DALLAS, USA)\n\nTIMESTAMP DETECTED: 2026-05-28 14:22 UTC\n\nDetails:\nScope 1 Fuel Combustion peaked at +45% versus historical weekly trends. This anomaly correlates directly with premium cargo diesel freight deliveries and overnight heating runs. Additionally, efficiency index dropped to 68%.\n\nRoot Cause Indicator:\nPoor thermodynamic optimization in central HVAC thermal boilers, coupled with sub-optimal delivery schedule grouping.\n\nMitigation Recommendation:\nOptimize freight bundling via central inventory systems to decrease overall fleet runs by 12%. Apply real-time IoT thermostatic rules to boilers to trim idle-heating spikes by 18%.'
  },
  {
    prompt: 'Draft decarbonization blueprint for Singapore Semiconductor Fab-4',
    category: 'recommendation',
    response: 'DRAFT ACTION PLAN: Decarbonization Pathway // Singapore Semiconductor Fab-4\n\nTARGET: -30% overall Carbon Footprint by 2030\n\nKey Reductions Planned:\n1. [Scope 2 Shift] Settle high-conductivity Power Purchase Agreements (PPAs) with Jurong solar grid networks to shift 4,500 tCO2e of grid intensity into clean zero-carbon certified assets.\n2. [Scope 1 Thermal] Upgrade dry scrubbers to recycle 12% of high-temperature waste heat, reducing natural gas firing cycles by 120 tCO2e annually.\n3. [Scope 3 Supplier Engagement] Shift semiconductor raw copper packaging elements to lightweight bioplastics via Pacific Electronics Corp to cut Scope 3 freight weights.'
  },
  {
    prompt: 'Draft ESG Executive Summary document for Board Meeting',
    category: 'report',
    response: 'AETHERA AUTOMATIC REPORT: Corporate ESG Summary Q2 2026\n\nCO2e TOTAL FOOTPRINT: 111,215 tCO2e (Excluding Offset Allocations)\n\nScope Breakdowns:\n- Scope 1: 9,090 tCO2e\n- Scope 2: 20,450 tCO2e\n- Scope 3: 81,675 tCO2e (Highest exposure - 73.4% of total grid)\n\nKey Achievements:\n- Successfully automated 100% of Changi and Frankfurt power and heating billing records via integrated smart utility APIs.\n- Supplier ESG engagement scored at 77.6% (Pacific Electronics achieved 98% reporting compliance).\n\nAudit Status:\n- Zero anomalies remaining in Scope 1 accounts. Verified hashes filed on immutable audit trail.'
  }
];

export const TRUST_TAGS = [
  'Advanced Manufacturing',
  'Global Energy & Utilities',
  'Commercial Real Estate',
  'Hyper-scale Data Centers',
  'Academic Institutions',
  'Government Agencies'
];
