// Green financing, grant and tax incentive programmes shown in the free SME calculator.
// Details were checked against official sources in November 2026. Schemes, allocations and deadlines
// change often, so the page always tells users to confirm with the administering agency.

export const PROGRAMMES_CHECKED = 'November 2026';

export type Answer = 'yes' | 'no' | 'unsure';

export type Plan =
  | 'solar'
  | 'efficiency'
  | 'storage'
  | 'greenBuilding'
  | 'transport'
  | 'wasteWater'
  | 'certification'
  | 'greenServices';

export const PLAN_OPTIONS: { id: Plan; label: string }[] = [
  { id: 'solar', label: 'Rooftop solar or other on-site renewable energy' },
  { id: 'efficiency', label: 'Energy-efficiency upgrades (LED, chillers, motors, compressors)' },
  { id: 'storage', label: 'Battery energy storage' },
  { id: 'greenBuilding', label: 'Green building certification or retrofit' },
  { id: 'transport', label: 'Electric vehicles or cleaner fleet' },
  { id: 'wasteWater', label: 'Waste or water management improvements' },
  { id: 'certification', label: 'Sustainability certification for the business' },
  { id: 'greenServices', label: 'We provide green technology services or lease solar systems to others' },
];

export interface Profile {
  isSme: Answer;
  malaysianOwned: Answer; // at least 60% Malaysian shareholding
  taxable: Answer; // pays income tax on statutory income
  plans: Plan[];
}

export type Fit = 'explore' | 'check' | 'none';

export interface Programme {
  id: string;
  name: string;
  type: 'Financing' | 'Tax incentive';
  agency: string;
  summary: string;
  points: string[];
  url: string;
  urlLabel: string;
  assess: (p: Profile) => { fit: Fit; reason: string };
}

const has = (p: Profile, ...plans: Plan[]) => plans.some((x) => p.plans.includes(x));

export const PROGRAMMES: Programme[] = [
  {
    id: 'gtfs',
    name: 'Green Technology Financing Scheme (GTFS 5.0)',
    type: 'Financing',
    agency: 'MGTC, through participating banks',
    summary: 'A government guarantee on bank financing for the green part of a project, which can make green loans easier to obtain.',
    points: [
      'Government guarantee of 60%–80% on the green component financed by participating financial institutions',
      'For legally registered Malaysian companies with at least 60% Malaysian shareholding',
      'Covers energy, manufacturing, transport, building, waste and water projects',
      'RM1.0 billion allocation, open until 31 December 2026 or until fully allocated',
    ],
    url: 'https://www.gtfs.my/',
    urlLabel: 'gtfs.my',
    assess: (p) => {
      if (!has(p, 'solar', 'efficiency', 'storage', 'greenBuilding', 'transport', 'wasteWater'))
        return { fit: 'none', reason: 'Applies to green technology projects; none selected.' };
      if (p.malaysianOwned === 'no')
        return { fit: 'none', reason: 'Requires at least 60% Malaysian shareholding.' };
      if (p.malaysianOwned === 'unsure')
        return { fit: 'check', reason: 'Your planned project fits the covered sectors. Confirm your company has at least 60% Malaysian shareholding.' };
      return { fit: 'explore', reason: 'Your planned project fits the covered sectors and ownership requirement.' };
    },
  },
  {
    id: 'lctf',
    name: 'Low Carbon Transition Facility (LCTF)',
    type: 'Financing',
    agency: 'Bank Negara Malaysia, through participating banks',
    summary: 'Affordable financing for SMEs adopting low-carbon practices.',
    points: [
      'Up to RM10 million per SME, with tenure of up to 10 years',
      'Financing rate capped at 5% a year, including any guarantee fee; no collateral required',
      'For capital spending or working capital on steps such as energy efficiency, on-site renewable energy, sustainable materials and sustainability certification',
      'Cannot be used to refinance existing loans. Available until fully used, so confirm availability with your bank',
    ],
    url: 'https://www.bnm.gov.my/sme-financing',
    urlLabel: 'bnm.gov.my/sme-financing',
    assess: (p) => {
      if (p.isSme === 'no') return { fit: 'none', reason: 'This facility is for SMEs.' };
      if (!has(p, 'solar', 'efficiency', 'greenBuilding', 'certification'))
        return { fit: 'none', reason: 'Covers energy efficiency, on-site renewables, sustainable materials and certification; none selected.' };
      if (p.isSme === 'unsure')
        return { fit: 'check', reason: 'Your plans match the eligible uses. Confirm your business meets the SME definition.' };
      return { fit: 'explore', reason: 'Your plans match the eligible uses for SMEs.' };
    },
  },
  {
    id: 'gita-asset',
    name: 'Green Investment Tax Allowance — Asset (GITA Asset)',
    type: 'Tax incentive',
    agency: 'MGTC',
    summary: 'A tax allowance on qualifying green assets bought for your own use.',
    points: [
      'Renewable energy systems and energy efficiency: 60% allowance on qualifying capital spending',
      'Battery energy storage and green buildings: 100% allowance',
      'Allowance can be set off against up to 70% of statutory income',
      'Application deadlines have been extended before. Check the current deadline with MGTC',
    ],
    url: 'https://www.mgtc.gov.my/wp-content/uploads/2024/05/GREEN-TECHNOLOGY-TAX-INCENTIVE-GUIDELINES-GITA-Asset-23-April-2024.pdf',
    urlLabel: 'MGTC GITA Asset guidelines (PDF)',
    assess: (p) => {
      if (!has(p, 'solar', 'efficiency', 'storage', 'greenBuilding'))
        return { fit: 'none', reason: 'Covers renewable energy, energy efficiency, battery storage and green buildings; none selected.' };
      if (p.taxable === 'no') return { fit: 'none', reason: 'A tax allowance only helps if the company has taxable income.' };
      if (p.taxable === 'unsure')
        return { fit: 'check', reason: 'Your planned assets qualify in principle. It only helps if the company has taxable income.' };
      return { fit: 'explore', reason: 'Your planned assets are in the qualifying categories.' };
    },
  },
  {
    id: 'gita-project',
    name: 'GITA Project / GITE (green technology providers)',
    type: 'Tax incentive',
    agency: 'MIDA',
    summary: 'Tax incentives for companies that carry out green technology projects or provide green technology services, including solar leasing.',
    points: [
      'For businesses providing green technology projects or services, not for assets bought for own use',
      'You must apply to MIDA before incurring any qualifying capital spending',
      'Applications go through the InvestMalaysia portal',
    ],
    url: 'https://www.mida.gov.my/industries/services/green-technology/',
    urlLabel: 'mida.gov.my — Green Technology',
    assess: (p) =>
      has(p, 'greenServices')
        ? { fit: 'check', reason: 'You provide green technology services. Check the qualifying activities with MIDA before spending.' }
        : { fit: 'none', reason: 'Only for companies providing green technology services.' },
  },
];
