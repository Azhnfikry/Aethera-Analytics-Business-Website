// Green financing, grant and tax incentive programmes shown in the free SME calculator.
// Details were checked against official sources in November 2026. Schemes, allocations and deadlines
// change often, so the page always tells users to confirm with the administering agency.

import type { GridRegion } from './factors';

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
  | 'esgReporting'
  | 'greenServices';

export const PLAN_OPTIONS: { id: Plan; label: string }[] = [
  { id: 'solar', label: 'Rooftop solar or other on-site renewable energy' },
  { id: 'efficiency', label: 'Energy-efficiency upgrades (LED, chillers, motors, compressors)' },
  { id: 'storage', label: 'Battery energy storage' },
  { id: 'greenBuilding', label: 'Green building certification or retrofit' },
  { id: 'transport', label: 'Electric vehicles or cleaner fleet' },
  { id: 'wasteWater', label: 'Waste or water management improvements' },
  { id: 'certification', label: 'Sustainability certification for the business' },
  { id: 'esgReporting', label: 'ESG reporting, emissions tracking or verification' },
  { id: 'greenServices', label: 'We provide green technology services or lease solar systems to others' },
];

export interface Profile {
  isSme: Answer;
  malaysianOwned: Answer; // at least 60% Malaysian shareholding
  taxable: Answer; // pays income tax on statutory income
  listed: Answer; // listed on Bursa Malaysia
  plans: Plan[];
}

export type Fit = 'explore' | 'check' | 'none';

export interface Programme {
  id: string;
  name: string;
  type: 'Financing' | 'Tax incentive' | 'Solar programme';
  agency: string;
  summary: string;
  points: string[];
  url: string;
  urlLabel: string;
  assess: (p: Profile, region: GridRegion) => { fit: Fit; reason: string };
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
      'You need a GTFS 5.0 Green Project Certificate from MGTC; the guarantee itself is provided through CGC',
    ],
    // gtfs.my was unreachable in Nov 2026, so link to the scheme page on MGTC's own site
    url: 'https://www.mgtc.gov.my/services/green-technology-financing-scheme-gtfs/',
    urlLabel: 'MGTC — Green Technology Financing Scheme',
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
    id: 'htg',
    name: 'High Tech & Green Facility (HTG)',
    type: 'Financing',
    agency: 'Bank Negara Malaysia, through participating banks such as SME Bank',
    summary: 'Financing for SMEs investing in green technology, as well as digital and biotechnology.',
    points: [
      'Financing rate of up to 5% a year, including the guarantee fee, with tenure of up to 10 years',
      'Requires a guarantee from CGC or SJPP',
      'CGC’s BizJamin HTG guarantee covers up to RM8 million per SME and is for private limited (Sdn Bhd) companies only',
    ],
    url: 'https://www.smebank.com.my/high-tech-green-facility-htg-',
    urlLabel: 'SME Bank — High Tech & Green Facility',
    assess: (p) => {
      if (p.isSme === 'no') return { fit: 'none', reason: 'This facility is for SMEs.' };
      if (!has(p, 'solar', 'efficiency', 'storage', 'greenBuilding', 'transport', 'wasteWater'))
        return { fit: 'none', reason: 'For green technology investment; none selected.' };
      if (p.isSme === 'unsure')
        return { fit: 'check', reason: 'Your planned investment is green technology. Confirm your business meets the SME definition.' };
      return { fit: 'explore', reason: 'Your planned investment is green technology and you are an SME.' };
    },
  },
  {
    id: 'solar-atap',
    name: 'Solar ATAP',
    type: 'Solar programme',
    agency: 'SEDA and the Energy Commission',
    summary: 'Install rooftop solar for your own use and get credit on your TNB bill for surplus electricity exported to the grid.',
    points: [
      'Open since 1 January 2026, for TNB customers in Peninsular Malaysia only',
      'Credit for exported electricity is applied to the energy component of your bill, under a 10-year contract',
      'Existing NEM or self-consumption participants must end their current contract before joining',
      'Installations above 72 kW need a Connection Assessment Study',
    ],
    url: 'https://www.seda.gov.my/reportal/atap/',
    urlLabel: 'SEDA — Solar ATAP',
    assess: (p, region) => {
      if (!has(p, 'solar')) return { fit: 'none', reason: 'Only for rooftop solar; not selected.' };
      if (region !== 'peninsular') return { fit: 'none', reason: 'Only available in Peninsular Malaysia.' };
      return { fit: 'explore', reason: 'You are planning solar and your premises are in Peninsular Malaysia. Check whether you already have a NEM contract.' };
    },
  },
  {
    id: 'esg-deduction',
    name: 'Tax deduction for ESG reporting costs',
    type: 'Tax incentive',
    agency: 'Inland Revenue Board (LHDN)',
    summary: 'A tax deduction on spending to prepare ESG and emissions reports.',
    points: [
      'Deduction of up to RM50,000 per year of assessment, from YA2024 to YA2027',
      'Covers costs such as ESG reporting, calculating and tracking greenhouse gas emissions, verification and ESG software',
      'Set out in the Income Tax (Deduction for Expenditure in relation to Environmental Preservation, Social and Governance) Rules 2025',
      'Only certain company categories qualify, such as listed companies. Confirm with LHDN or your tax adviser',
    ],
    url: 'https://belanjawan.mof.gov.my/pdf/belanjawan2024/ucapan/tax-measure.pdf',
    urlLabel: 'MOF Budget 2024 tax measures (PDF)',
    assess: (p) => {
      if (!has(p, 'esgReporting')) return { fit: 'none', reason: 'For ESG reporting costs; not selected.' };
      if (p.taxable === 'no') return { fit: 'none', reason: 'A tax deduction only helps if the company has taxable income.' };
      if (p.listed === 'no')
        return { fit: 'none', reason: 'Mainly for listed companies, so most private SMEs do not qualify.' };
      return { fit: 'check', reason: 'Your company may be in an eligible category. Confirm before claiming.' };
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
