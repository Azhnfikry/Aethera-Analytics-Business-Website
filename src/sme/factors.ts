// Emission factors for the free SME calculator.
// All values are kg CO2e per unit. Update here when new official factors are published.

export type GridRegion = 'peninsular' | 'sabah' | 'sarawak';

// Energy Commission (Suruhanjaya Tenaga), "Grid Emission Factor (GEF) in Malaysia, 2022-2024 (Provisional)",
// published 23 Feb 2026. 2024 values, in t CO2e/MWh (= kg CO2e/kWh). Sarawak figure sourced by the
// Energy Commission from Sarawak Energy Berhad.
export const GRID_FACTORS: Record<GridRegion, { label: string; kgPerKwh: number }> = {
  peninsular: { label: 'Peninsular Malaysia', kgPerKwh: 0.74 },
  sabah: { label: 'Sabah', kgPerKwh: 0.539 },
  sarawak: { label: 'Sarawak', kgPerKwh: 0.199 },
};

export const GRID_SOURCE = {
  name: 'Energy Commission Malaysia, Grid Emission Factor (GEF) in Malaysia 2022–2024 (Provisional), published 23 Feb 2026 — 2024 values',
  url: 'https://myenergystats.st.gov.my/documents/d/guest/grid-emission-factor-gef-in-malaysia-2022-2024-provisional-',
};

// Fuel factors: IPCC 2006 Guidelines, Vol. 2 (Energy), Tier 1 default emission factors and net calorific
// values, converted to CO2e with IPCC AR5 100-year GWPs (CH4 = 28, N2O = 265).
//   Diesel (stationary): 74,100 kg CO2 + 3 kg CH4 + 0.6 kg N2O per TJ; NCV 43.0 TJ/Gg; density 0.84 kg/L
//   Diesel (road):       74,100 kg CO2 + 3.9 kg CH4 + 3.9 kg N2O per TJ
//   Petrol (road):       69,300 kg CO2 + 33 kg CH4 + 3.2 kg N2O per TJ; NCV 44.3 TJ/Gg; density 0.74 kg/L
//   LPG (commercial):    63,100 kg CO2 + 5 kg CH4 + 0.1 kg N2O per TJ; NCV 47.3 TJ/Gg
//   Natural gas:         56,100 kg CO2 + 1 kg CH4 + 0.1 kg N2O per TJ (matches the Energy Commission's own GEF workings)
const GWP_CH4 = 28;
const GWP_N2O = 265;
const perTJ = (co2: number, ch4: number, n2o: number) => co2 + ch4 * GWP_CH4 + n2o * GWP_N2O;
const TJ_PER_LITRE = (ncvTJperGg: number, densityKgPerL: number) => (ncvTJperGg * densityKgPerL) / 1e6;

export type FuelId = 'dieselStationary' | 'dieselVehicles' | 'petrolVehicles' | 'lpg' | 'naturalGas';

export interface Fuel {
  id: FuelId;
  label: string;
  hint: string;
  unit: string;
  kgPerUnit: number;
}

export const FUELS: Fuel[] = [
  {
    id: 'dieselStationary',
    label: 'Diesel — generators & equipment',
    hint: 'Backup generators, boilers, forklifts and other on-site equipment',
    unit: 'litres',
    kgPerUnit: perTJ(74_100, 3, 0.6) * TJ_PER_LITRE(43.0, 0.84),
  },
  {
    id: 'dieselVehicles',
    label: 'Diesel — company vehicles',
    hint: 'Lorries, vans and cars owned or leased by the company',
    unit: 'litres',
    kgPerUnit: perTJ(74_100, 3.9, 3.9) * TJ_PER_LITRE(43.0, 0.84),
  },
  {
    id: 'petrolVehicles',
    label: 'Petrol — company vehicles',
    hint: 'Cars and motorcycles owned or leased by the company',
    unit: 'litres',
    kgPerUnit: perTJ(69_300, 33, 3.2) * TJ_PER_LITRE(44.3, 0.74),
  },
  {
    id: 'lpg',
    label: 'LPG',
    hint: 'Cooking gas or LPG used in kitchens and processes',
    unit: 'kg',
    kgPerUnit: (perTJ(63_100, 5, 0.1) * 47.3) / 1e6,
  },
  {
    id: 'naturalGas',
    label: 'Natural gas (piped)',
    hint: 'From your gas bill, in MMBtu (1 MMBtu = 1.055 GJ)',
    unit: 'MMBtu',
    kgPerUnit: (perTJ(56_100, 1, 0.1) * 1.055056) / 1000,
  },
];

export const FUEL_SOURCE = {
  name: 'IPCC 2006 Guidelines for National Greenhouse Gas Inventories, Vol. 2 (Energy), Tier 1 defaults; GWPs from IPCC AR5',
  url: 'https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html',
};
