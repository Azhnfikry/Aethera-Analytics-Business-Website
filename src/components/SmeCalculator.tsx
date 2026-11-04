import { useEffect, useMemo, useState } from 'react';
import {
  Building2, Flame, Zap, FileBarChart, ArrowRight, ArrowLeft, Plus, Trash2, Printer,
  CheckCircle2, HelpCircle, ExternalLink, Lock, Landmark, Sparkles,
} from 'lucide-react';
import { Link } from '../router';
import { FUELS, FUEL_SOURCE, FuelId, GRID_FACTORS, GRID_SOURCE, GridRegion } from '../sme/factors';
import { Answer, PLAN_OPTIONS, Plan, PROGRAMMES, PROGRAMMES_CHECKED, Profile } from '../sme/financing';

interface Meter {
  label: string;
  kwh: string;
}

interface CalcState {
  company: string;
  sector: string;
  year: string;
  region: GridRegion;
  employees: string;
  fuels: Record<FuelId, string>;
  meters: Meter[];
  profile: Profile;
}

const STORAGE_KEY = 'aethera-sme-calculator-v1';
const THIS_YEAR = new Date().getFullYear();

const EMPTY: CalcState = {
  company: '',
  sector: '',
  year: String(THIS_YEAR - 1),
  region: 'peninsular',
  employees: '',
  fuels: { dieselStationary: '', dieselVehicles: '', petrolVehicles: '', lpg: '', naturalGas: '' },
  meters: [{ label: 'Main premises', kwh: '' }],
  profile: { isSme: 'yes', malaysianOwned: 'yes', taxable: 'yes', listed: 'no', plans: [] },
};

const STEPS = [
  { title: 'Company', icon: Building2 },
  { title: 'Fuel (Scope 1)', icon: Flame },
  { title: 'Electricity (Scope 2)', icon: Zap },
  { title: 'Results & report', icon: FileBarChart },
];

// Saved in this browser only, so nothing is lost on refresh
function loadState(): CalcState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      // merge profile too, so answers saved before a question was added still load
      return { ...EMPTY, ...saved, profile: { ...EMPTY.profile, ...saved.profile } };
    }
  } catch {
    // storage unavailable or corrupt: start fresh
  }
  return EMPTY;
}

const num = (v: string) => {
  const n = parseFloat(v.replace(/,/g, ''));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const tonnes = (kg: number) => (kg / 1000).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const inputClass =
  'w-full bg-white border border-neutral-300 rounded-md px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15';
const labelClass = 'block font-mono text-[10px] font-bold text-neutral-600 tracking-wider uppercase mb-1.5';

export default function SmeCalculator() {
  const [state, setState] = useState<CalcState>(loadState);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable: the calculator still works for this visit
    }
  }, [state]);

  const update = (patch: Partial<CalcState>) => setState((s) => ({ ...s, ...patch }));
  const setFuel = (id: FuelId, v: string) => setState((s) => ({ ...s, fuels: { ...s.fuels, [id]: v } }));
  const setMeter = (i: number, patch: Partial<Meter>) =>
    setState((s) => ({ ...s, meters: s.meters.map((m, j) => (j === i ? { ...m, ...patch } : m)) }));
  const setProfile = (patch: Partial<Profile>) => setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  const togglePlan = (plan: Plan) =>
    setProfile({
      plans: state.profile.plans.includes(plan) ? state.profile.plans.filter((p) => p !== plan) : [...state.profile.plans, plan],
    });

  const results = useMemo(() => {
    const fuelRows = FUELS.map((f) => {
      const qty = num(state.fuels[f.id]);
      return { ...f, qty, kg: qty * f.kgPerUnit };
    }).filter((r) => r.qty > 0);
    const grid = GRID_FACTORS[state.region];
    const meterRows = state.meters
      .map((m) => ({ ...m, qty: num(m.kwh), kg: num(m.kwh) * grid.kgPerKwh }))
      .filter((r) => r.qty > 0);
    const scope1 = fuelRows.reduce((a, r) => a + r.kg, 0);
    const scope2 = meterRows.reduce((a, r) => a + r.kg, 0);
    const employees = num(state.employees);
    return { fuelRows, meterRows, grid, scope1, scope2, total: scope1 + scope2, employees };
  }, [state]);

  const matches = useMemo(
    () => PROGRAMMES.map((p) => ({ programme: p, ...p.assess(state.profile, state.region) })),
    [state.profile, state.region],
  );

  const goTo = (i: number) => {
    setStep(i);
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const reset = () => {
    if (window.confirm('Clear all the figures you have entered?')) {
      setState(EMPTY);
      setStep(0);
    }
  };

  return (
    <main className="relative z-10 pt-28 pb-20 print:pt-0 print:pb-0">

      {/* INTRO */}
      <section className="px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-end print:hidden">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center space-x-2 text-emerald-700 font-mono text-[10px] uppercase tracking-[0.25em] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free for Malaysian SMEs</span>
          </div>
          <h1 className="font-display font-medium text-4xl sm:text-5xl text-neutral-900 tracking-tight leading-[1.05]">
            Your Scope 1 &amp; 2 carbon footprint,{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent font-semibold">in one sitting.</span>
          </h1>
          <p className="max-w-xl text-neutral-600 text-sm sm:text-base font-sans font-light leading-relaxed">
            Banks, buyers and supply-chain partners are asking SMEs for emissions data. Enter your fuel and electricity use, get a simple report you can share, and see which green financing and tax incentives may fit your plans.
          </p>
        </div>
        <ul className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {[
            { icon: Zap, title: 'Official Malaysian grid factors', text: 'Energy Commission 2024 values for Peninsular, Sabah and Sarawak' },
            { icon: FileBarChart, title: 'Printable report', text: 'Save as PDF to share with banks or customers' },
            { icon: Lock, title: 'No sign-up needed', text: 'Your figures stay in this browser and are never sent to us' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 bg-white border border-neutral-200 rounded-lg p-3.5 shadow-xs">
              <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-neutral-900">{title}</span>
                <span className="block text-[11px] text-neutral-500 leading-snug">{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="px-6 max-w-7xl mx-auto w-full mt-12 scroll-mt-24 print:hidden">
        {/* Step tabs */}
        <ol className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {STEPS.map(({ title, icon: Icon }, i) => (
            <li key={title}>
              <button
                onClick={() => goTo(i)}
                className={`w-full flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  i === step
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : i < step
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:border-emerald-300'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                <span className={`font-mono text-[10px] font-bold ${i === step ? 'text-emerald-400' : ''}`}>0{i + 1}</span>
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold leading-tight">{title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Step panel */}
          <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-xl p-5 sm:p-7 shadow-xs">

            {step === 0 && (
              <div className="space-y-5">
                <StepHeading title="About your company" text="Used to label your report and pick the right grid emission factor." />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="company">Company name</label>
                    <input id="company" className={inputClass} value={state.company} onChange={(e) => update({ company: e.target.value })} placeholder="e.g. Syarikat Contoh Sdn Bhd" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="sector">Industry (optional)</label>
                    <input id="sector" className={inputClass} value={state.sector} onChange={(e) => update({ sector: e.target.value })} placeholder="e.g. Food manufacturing" />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="year">Reporting year</label>
                    <select id="year" className={inputClass} value={state.year} onChange={(e) => update({ year: e.target.value })}>
                      {[0, 1, 2, 3].map((d) => <option key={d}>{THIS_YEAR - d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="region">Where are your premises?</label>
                    <select id="region" className={inputClass} value={state.region} onChange={(e) => update({ region: e.target.value as GridRegion })}>
                      {(Object.keys(GRID_FACTORS) as GridRegion[]).map((r) => <option key={r} value={r}>{GRID_FACTORS[r].label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="employees">Number of employees (optional)</label>
                    <input id="employees" inputMode="numeric" className={inputClass} value={state.employees} onChange={(e) => update({ employees: e.target.value })} placeholder="e.g. 45" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <StepHeading
                  title="Fuel burned by your business (Scope 1)"
                  text={`Enter the total used in ${state.year}. Fuel receipts, fleet cards and gas bills are the easiest sources. Leave blank anything you don't use.`}
                />
                <div className="space-y-3">
                  {FUELS.map((f) => (
                    <div key={f.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center border border-neutral-200 rounded-lg p-3.5 bg-neutral-50">
                      <div className="sm:col-span-7">
                        <label htmlFor={f.id} className="block text-sm font-semibold text-neutral-900">{f.label}</label>
                        <span className="block text-[11px] text-neutral-500">{f.hint}</span>
                      </div>
                      <div className="sm:col-span-5 flex items-center gap-2">
                        <input id={f.id} inputMode="decimal" className={inputClass} value={state.fuels[f.id]} onChange={(e) => setFuel(f.id, e.target.value)} placeholder="0" />
                        <span className="font-mono text-[11px] text-neutral-500 w-14 shrink-0">{f.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500">
                  Not included in this free version: refrigerant leaks from air-conditioning and process emissions.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <StepHeading
                  title="Electricity bought from the grid (Scope 2)"
                  text={`Add up the kWh on your electricity bills for ${state.year}. Add a line for each premises or meter if you have more than one.`}
                />
                <div className="space-y-3">
                  {state.meters.map((m, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center border border-neutral-200 rounded-lg p-3.5 bg-neutral-50">
                      <input aria-label="Premises or meter name" className={`${inputClass} sm:col-span-6`} value={m.label} onChange={(e) => setMeter(i, { label: e.target.value })} placeholder="Premises or meter name" />
                      <div className="sm:col-span-5 flex items-center gap-2">
                        <input aria-label="Electricity used in kWh" inputMode="decimal" className={inputClass} value={m.kwh} onChange={(e) => setMeter(i, { kwh: e.target.value })} placeholder="0" />
                        <span className="font-mono text-[11px] text-neutral-500 w-8 shrink-0">kWh</span>
                      </div>
                      <button
                        onClick={() => update({ meters: state.meters.filter((_, j) => j !== i) })}
                        disabled={state.meters.length === 1}
                        className="sm:col-span-1 justify-self-end p-2 text-neutral-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-neutral-400 cursor-pointer disabled:cursor-not-allowed"
                        aria-label="Remove this meter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => update({ meters: [...state.meters, { label: `Premises ${state.meters.length + 1}`, kwh: '' }] })}
                  className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD ANOTHER PREMISES OR METER</span>
                </button>
                <p className="text-[11px] text-neutral-500">
                  Grid factor applied: {results.grid.kgPerKwh} kg CO₂e per kWh ({results.grid.label}, Energy Commission 2024 provisional).
                  Change the location in step 1 if your premises are elsewhere.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <StepHeading title="Your results" text="Check the figures below, then print or save the report as a PDF." />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Stat label="Scope 1 — fuel" value={tonnes(results.scope1)} />
                  <Stat label="Scope 2 — electricity" value={tonnes(results.scope2)} />
                  <Stat label="Total" value={tonnes(results.total)} highlight />
                </div>

                {results.total === 0 ? (
                  <p className="text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                    No figures entered yet. Go back to steps 2 and 3 to add your fuel and electricity use.
                  </p>
                ) : (
                  <BreakdownTable results={results} />
                )}

                {/* Green finance */}
                <div className="border-t border-neutral-200 pt-7 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-neutral-900">Green financing &amp; tax incentives</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">Answer a few questions to see which Malaysian programmes may be worth exploring.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Question label="Is your business an SME?" value={state.profile.isSme} onChange={(v) => setProfile({ isSme: v })} />
                    <Question label="At least 60% Malaysian-owned?" value={state.profile.malaysianOwned} onChange={(v) => setProfile({ malaysianOwned: v })} />
                    <Question label="Does it pay income tax?" value={state.profile.taxable} onChange={(v) => setProfile({ taxable: v })} />
                    <Question label="Listed on Bursa Malaysia?" value={state.profile.listed} onChange={(v) => setProfile({ listed: v })} />
                  </div>

                  <fieldset>
                    <legend className={labelClass}>What are you planning in the next 1–2 years?</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PLAN_OPTIONS.map((o) => (
                        <label key={o.id} className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 cursor-pointer text-xs transition-colors ${
                          state.profile.plans.includes(o.id) ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
                        }`}>
                          <input type="checkbox" className="mt-0.5 accent-emerald-600" checked={state.profile.plans.includes(o.id)} onChange={() => togglePlan(o.id)} />
                          <span>{o.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <FinanceMatches matches={matches} hasPlans={state.profile.plans.length > 0} />
                </div>

                <div className="flex flex-wrap gap-3 border-t border-neutral-200 pt-6">
                  <button
                    onClick={() => window.print()}
                    className="group bg-emerald-600 hover:bg-emerald-800 text-white font-mono font-bold text-xs uppercase px-6 py-3 rounded transition-all duration-200 shadow-md cursor-pointer flex items-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print or save report as PDF</span>
                  </button>
                  <button onClick={reset} className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 font-mono text-xs uppercase px-5 py-3 rounded transition-colors cursor-pointer">
                    Start over
                  </button>
                </div>
              </div>
            )}

            {/* Step navigation */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-neutral-200">
              <button
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-600 hover:text-neutral-900 disabled:opacity-0 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
              {step < STEPS.length - 1 && (
                <button
                  onClick={() => goTo(step + 1)}
                  className="group bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold tracking-wider px-5 py-2.5 rounded-md transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>NEXT: {STEPS[step + 1].title.toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Running total */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 text-white shadow-xl">
              <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400 uppercase">Running total · {state.year}</span>
              <p className="mt-2 font-display text-4xl font-semibold tracking-tight">
                {tonnes(results.total)} <span className="text-base font-normal text-neutral-400">t CO₂e</span>
              </p>
              <div className="mt-4 space-y-2.5">
                <Bar label="Scope 1 — fuel" kg={results.scope1} total={results.total} colour="bg-emerald-400" />
                <Bar label="Scope 2 — electricity" kg={results.scope2} total={results.total} colour="bg-teal-300" />
              </div>
              {results.employees > 0 && results.total > 0 && (
                <p className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                  {(results.total / 1000 / results.employees).toFixed(2)} t CO₂e per employee
                </p>
              )}
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-2 shadow-xs">
              <h3 className="font-display font-bold text-sm text-neutral-900">Need more than Scope 1 &amp; 2?</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                For Scope 3, supplier data and audit-ready NSRF disclosure, talk to us about the full Aethera platform.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-900">
                <span>CONTACT US</span>
                <ArrowRight className="w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* PRINTABLE REPORT (only shown when printing) */}
      <Report state={state} results={results} matches={matches} />
    </main>
  );
}

type Results = {
  fuelRows: (typeof FUELS[number] & { qty: number; kg: number })[];
  meterRows: (Meter & { qty: number; kg: number })[];
  grid: { label: string; kgPerKwh: number };
  scope1: number;
  scope2: number;
  total: number;
  employees: number;
};
type Matches = { programme: (typeof PROGRAMMES)[number]; fit: string; reason: string }[];

function StepHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="space-y-1">
      <h2 className="font-display font-bold text-xl text-neutral-900 tracking-tight">{title}</h2>
      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{text}</p>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? 'bg-emerald-50 border-emerald-200' : 'bg-neutral-50 border-neutral-200'}`}>
      <span className="block font-mono text-[10px] font-bold text-neutral-500 tracking-wider uppercase">{label}</span>
      <span className={`block mt-1 font-display text-2xl font-semibold ${highlight ? 'text-emerald-800' : 'text-neutral-900'}`}>
        {value} <span className="text-xs font-normal text-neutral-500">t CO₂e</span>
      </span>
    </div>
  );
}

function Bar({ label, kg, total, colour }: { label: string; kg: number; total: number; colour: string }) {
  const pct = total > 0 ? (kg / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-[11px] text-neutral-300 mb-1">
        <span>{label}</span>
        <span className="font-mono">{tonnes(kg)} t</span>
      </div>
      <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
        <div className={`h-full rounded-full ${colour}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Question({ label, value, onChange }: { label: string; value: Answer; onChange: (v: Answer) => void }) {
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="flex rounded-md border border-neutral-300 overflow-hidden">
        {(['yes', 'no', 'unsure'] as Answer[]).map((a) => (
          <button
            key={a}
            onClick={() => onChange(a)}
            className={`flex-1 py-2 text-xs font-semibold capitalize cursor-pointer transition-colors ${
              value === a ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            {a === 'unsure' ? 'Not sure' : a}
          </button>
        ))}
      </div>
    </div>
  );
}

function BreakdownTable({ results }: { results: Results }) {
  return (
    <div className="overflow-x-auto border border-neutral-200 rounded-lg">
      <table className="w-full text-xs">
        <thead className="bg-neutral-50 text-neutral-500 font-mono uppercase text-[10px] tracking-wider">
          <tr>
            <th className="text-left px-3 py-2.5">Source</th>
            <th className="text-right px-3 py-2.5">Quantity</th>
            <th className="text-right px-3 py-2.5">Factor (kg CO₂e)</th>
            <th className="text-right px-3 py-2.5">t CO₂e</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 text-neutral-800">
          {results.fuelRows.map((r) => (
            <tr key={r.id}>
              <td className="px-3 py-2.5"><span className="font-mono text-[9px] text-neutral-500 mr-2">S1</span>{r.label}</td>
              <td className="px-3 py-2.5 text-right">{r.qty.toLocaleString('en-MY')} {r.unit}</td>
              <td className="px-3 py-2.5 text-right">{r.kgPerUnit.toFixed(3)} / {r.unit.replace(/s$/, '')}</td>
              <td className="px-3 py-2.5 text-right font-semibold">{tonnes(r.kg)}</td>
            </tr>
          ))}
          {results.meterRows.map((r, i) => (
            <tr key={`m${i}`}>
              <td className="px-3 py-2.5"><span className="font-mono text-[9px] text-neutral-500 mr-2">S2</span>Electricity — {r.label || 'premises'}</td>
              <td className="px-3 py-2.5 text-right">{r.qty.toLocaleString('en-MY')} kWh</td>
              <td className="px-3 py-2.5 text-right">{results.grid.kgPerKwh.toFixed(3)} / kWh</td>
              <td className="px-3 py-2.5 text-right font-semibold">{tonnes(r.kg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinanceMatches({ matches, hasPlans }: { matches: Matches; hasPlans: boolean }) {
  const shown = matches.filter((m) => m.fit !== 'none');
  if (!hasPlans) {
    return <p className="text-xs text-neutral-500">Tick at least one plan above to see matching programmes.</p>;
  }
  return (
    <div className="space-y-3">
      {shown.length === 0 && (
        <p className="text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          None of the programmes we track match these answers. Schemes change often, so it is still worth asking your bank.
        </p>
      )}
      {shown.map(({ programme: p, fit, reason }) => (
        <div key={p.id} className="border border-neutral-200 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 className="font-display font-bold text-sm text-neutral-900">{p.name}</h4>
              <span className="text-[11px] text-neutral-500">{p.type} · {p.agency}</span>
            </div>
            <span className={`flex items-center gap-1 font-mono text-[9px] tracking-[0.2em] uppercase font-bold border px-2.5 py-1 rounded-full whitespace-nowrap ${
              fit === 'explore' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-800 bg-amber-50 border-amber-200'
            }`}>
              {fit === 'explore' ? <CheckCircle2 className="w-3 h-3" /> : <HelpCircle className="w-3 h-3" />}
              {fit === 'explore' ? 'Worth exploring' : 'Check criteria'}
            </span>
          </div>
          <p className="text-xs text-neutral-700">{p.summary} <span className="text-neutral-500">{reason}</span></p>
          <ul className="space-y-1">
            {p.points.map((pt) => (
              <li key={pt} className="text-[11px] text-neutral-600 flex gap-2"><span className="text-emerald-600">•</span><span>{pt}</span></li>
            ))}
          </ul>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 hover:text-emerald-900">
            <span>{p.urlLabel}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
      <p className="text-[11px] text-neutral-500 leading-relaxed">
        This is a starting point, not a decision on eligibility. Details were checked against official sources in {PROGRAMMES_CHECKED};
        allocations, rates and deadlines change, so confirm with the agency or a participating bank before applying.
      </p>
    </div>
  );
}

function Report({ state, results, matches }: { state: CalcState; results: Results; matches: Matches }) {
  const shown = matches.filter((m) => m.fit !== 'none');
  return (
    <section id="sme-report" className="hidden print:block px-2 text-neutral-900">
      <header className="border-b-2 border-emerald-600 pb-3 mb-5">
        <p className="font-mono text-[10px] tracking-widest uppercase text-emerald-700">Scope 1 &amp; 2 emissions summary</p>
        <h1 className="text-2xl font-bold">{state.company || 'Your company'}</h1>
        <p className="text-xs text-neutral-600">
          Reporting year {state.year} · {results.grid.label}
          {state.sector ? ` · ${state.sector}` : ''}
          {results.employees > 0 ? ` · ${results.employees} employees` : ''}
        </p>
      </header>

      <table className="w-full text-sm mb-5 border border-neutral-300">
        <tbody>
          <tr className="border-b border-neutral-300"><td className="p-2">Scope 1 — fuel combustion</td><td className="p-2 text-right font-semibold">{tonnes(results.scope1)} t CO₂e</td></tr>
          <tr className="border-b border-neutral-300"><td className="p-2">Scope 2 — purchased electricity (location-based)</td><td className="p-2 text-right font-semibold">{tonnes(results.scope2)} t CO₂e</td></tr>
          <tr className="bg-neutral-100"><td className="p-2 font-bold">Total Scope 1 &amp; 2</td><td className="p-2 text-right font-bold">{tonnes(results.total)} t CO₂e</td></tr>
          {results.employees > 0 && results.total > 0 && (
            <tr><td className="p-2">Intensity</td><td className="p-2 text-right">{(results.total / 1000 / results.employees).toFixed(2)} t CO₂e per employee</td></tr>
          )}
        </tbody>
      </table>

      {results.total > 0 && <BreakdownTable results={results} />}

      {shown.length > 0 && (
        <div className="mt-5">
          <h2 className="text-sm font-bold mb-1">Green financing &amp; tax incentives to explore</h2>
          <ul className="text-xs list-disc pl-5 space-y-0.5">
            {shown.map(({ programme: p }) => <li key={p.id}>{p.name} — {p.agency} ({p.url})</li>)}
          </ul>
        </div>
      )}

      <div className="mt-5 text-[10px] text-neutral-600 space-y-1 border-t border-neutral-300 pt-3">
        <p><strong>Method.</strong> Activity data × emission factor, following GHG Protocol principles. Scope 2 uses the location-based method.</p>
        <p><strong>Electricity factor.</strong> {GRID_SOURCE.name}.</p>
        <p><strong>Fuel factors.</strong> {FUEL_SOURCE.name}.</p>
        <p><strong>Limitations.</strong> Indicative estimate based on self-reported data. Excludes refrigerants, process emissions and Scope 3. Not independently verified or assured.</p>
        <p>Prepared with the free SME calculator from Aethera Analytics · aetheraanalytics.com · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
    </section>
  );
}
