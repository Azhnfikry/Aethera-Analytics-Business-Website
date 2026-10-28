import { Fragment } from 'react';
import {
  Sparkles, ArrowRight, ArrowDown, Database, Layers, ShieldCheck, TrendingUp,
  FileText, Server, Gauge, Users, Bot, UserCheck, BookOpen, GitBranch,
  ClipboardCheck, ScrollText, Lightbulb, History, Mail,
} from 'lucide-react';
import { Link } from '../router';
import utmLogo from '../assets/images/partners/utm.png';
import parcLogo from '../assets/images/partners/parc.png';
import simeDarbyLogo from '../assets/images/partners/sime-darby-property.png';

const PILOT_PARTNERS = [
  { name: 'UTM Kuala Lumpur', logo: utmLogo, size: 'h-12' },
  // Square logo, so a little taller to balance visually with the wide ones
  { name: 'PARC Subang Jaya', logo: parcLogo, size: 'h-16 rounded-lg' },
  { name: 'Sime Darby Property', logo: simeDarbyLogo, size: 'h-14' },
];

const FLOW = [
  {
    step: '01',
    title: 'Your Data Sources',
    caption: 'Wherever your sustainability data lives today.',
    items: [
      { icon: FileText, label: 'Utility bills & invoices' },
      { icon: Server, label: 'ERP & finance systems' },
      { icon: Gauge, label: 'Facility meters & IoT' },
      { icon: Users, label: 'Supplier submissions' },
    ],
  },
  {
    step: '02',
    title: 'Aethera Agents',
    caption: 'Do the data work, continuously.',
    agents: true,
    items: [
      { icon: Database, label: 'Ingestion agent', detail: 'Extracts and normalizes every source' },
      { icon: ShieldCheck, label: 'Validation agent', detail: 'Checks completeness, flags anomalies' },
      { icon: Layers, label: 'Calculation agent', detail: 'Applies emission factors, Scope 1–3' },
      { icon: Mail, label: 'Engagement agent', detail: 'Chases missing supplier data' },
    ],
  },
  {
    step: '03',
    title: 'Your Team Approves',
    caption: 'Agents propose. People decide.',
    items: [
      { icon: UserCheck, label: 'Review flagged changes' },
      { icon: ClipboardCheck, label: 'Approve before reporting' },
      { icon: History, label: 'Every action logged' },
    ],
  },
  {
    step: '04',
    title: 'Audit-Ready Outputs',
    caption: 'One trusted foundation to build on.',
    items: [
      { icon: BookOpen, label: 'Governed emissions ledger' },
      { icon: GitBranch, label: 'Source-to-report lineage' },
      { icon: ScrollText, label: 'Disclosure-ready reports' },
      { icon: Lightbulb, label: 'Reduction opportunities' },
    ],
  },
];

const TRUST = [
  {
    icon: UserCheck,
    title: 'Human-in-the-loop approvals',
    text: 'No agent output reaches a report without sign-off from your team. Agents propose changes; people approve them.',
  },
  {
    icon: GitBranch,
    title: 'Full data lineage',
    text: 'Every figure traces back to its source document, the emission factor applied, and the calculation that produced it.',
  },
  {
    icon: History,
    title: 'Every agent action logged',
    text: 'Each action is recorded with what changed, when, and why, giving auditors a complete trail to follow.',
  },
  {
    icon: ScrollText,
    title: 'Transparent methodology',
    text: 'Scope 1, 2, and 3 calculations follow GHG Protocol principles, with factors and assumptions documented, not hidden in a black box.',
  },
];

export default function Home() {
  return (
    <main className="relative z-10">

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Aesthetic glow spot */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[35%] bg-radial from-emerald-500/5 via-transparent to-transparent pointer-events-none rounded-full blur-[100px] z-0"></div>

        <div className="relative z-10 space-y-6 max-w-3xl">
          {/* Enterprise Tag */}
          <div className="mx-auto flex items-center space-x-2 text-emerald-700 font-mono text-[10px] uppercase tracking-[0.25em] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
            <span>AGENTIC SUSTAINABILITY DATA INFRASTRUCTURE</span>
          </div>

          <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] max-w-2xl mx-auto">
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent font-semibold">
              Agentic
            </span> Infrastructure <br />
            for Sustainability Data.
          </h1>

          <p className="max-w-xl mx-auto text-neutral-600 text-sm sm:text-base font-sans font-light leading-relaxed">
            Aethera deploys AI agents that collect, validate, and reconcile sustainability data from every source, building a governed, audit-ready data foundation your teams and systems can act on.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-emerald-600 hover:bg-emerald-800 text-white font-mono font-bold text-xs uppercase px-7 py-3.5 rounded transition-all duration-200 shadow-md cursor-pointer transform hover:scale-[1.02] flex items-center space-x-2"
            >
              <span>Book Demo Audit</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              to="/#how-it-works"
              className="bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-xs uppercase px-6 py-3.5 rounded transition-all duration-200 cursor-pointer shadow-sm"
            >
              See How It Works
            </Link>
          </div>

          {/* ABOUT US INTEGRATED FRONT-PAGE WIDGET */}
          <div className="mt-14 text-left bg-gradient-to-r from-emerald-50/60 to-emerald-50/10 border border-emerald-200/60 rounded-xl p-5 sm:p-6 max-w-2xl mx-auto space-y-4 relative overflow-hidden shadow-xs hover:border-emerald-300 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-emerald-500/5 to-transparent pointer-events-none rounded-full blur-xl"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100/70">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="font-mono text-[9px] font-bold text-emerald-800 tracking-widest uppercase">ABOUT AETHERA & FOUNDER</span>
              </div>
              <Link
                to="/about"
                className="text-xs font-mono font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 cursor-pointer"
              >
                <span>Read Full Story & Mission</span>
                <ArrowRight className="w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 space-y-1.5">
                <h3 className="font-display font-semibold text-neutral-900 text-sm leading-snug">
                  Building the agentic data layer for corporate sustainability.
                </h3>
                <p className="text-xs text-neutral-600 font-sans font-light leading-relaxed">
                  Founded by Azhan Fikri, Aethera uses AI agents to turn fragmented sustainability information into a trusted, continuously updated data foundation for carbon accounting, reporting, and climate action.
                </p>
              </div>
              <div className="sm:col-span-5 bg-white border border-neutral-200/85 rounded-lg p-3 flex items-center space-x-3 shadow-xs">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-mono font-bold shrink-0">
                  AF
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-neutral-900">Azhan Fikri</h4>
                  <p className="text-[9px] text-neutral-400 font-mono">Founder</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PILOT PROGRAMME PARTNERS */}
      <section id="pilots" className="px-6 pb-16 max-w-5xl mx-auto w-full text-center space-y-6">
        <p className="font-mono text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase">
          Currently engaging on pilot programmes with
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PILOT_PARTNERS.map((p) => (
            <li
              key={p.name}
              className="bg-white border border-neutral-200 rounded-xl px-6 py-5 flex flex-col items-center justify-center gap-3 shadow-xs hover:border-emerald-300 transition-colors duration-300"
            >
              <img src={p.logo} alt={`${p.name} logo`} className={`${p.size} w-auto max-w-full object-contain`} loading="lazy" />
              <span className="font-mono text-[10px] text-neutral-600 tracking-wider uppercase">{p.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* HOW THE AGENTS WORK */}
      <section id="how-it-works" className="px-6 py-20 border-t border-neutral-200 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="font-mono text-[9px] text-emerald-700 tracking-[0.2em] uppercase font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full inline-block">
              HOW IT WORKS
            </span>
            <h2 className="font-display font-bold text-3xl text-neutral-900 tracking-tight">
              From Scattered Data to an Audit-Ready Foundation
            </h2>
            <p className="text-neutral-600 text-sm font-sans font-light leading-relaxed">
              Aethera's agents sit between your data sources and your reports. They do the collection, checking, and calculation, and your team stays in control of what gets reported.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            {FLOW.map((col, idx) => (
              <Fragment key={col.step}>
                <div
                  className={`flex-1 rounded-xl p-5 space-y-4 border ${
                    col.agents
                      ? 'bg-neutral-950 border-neutral-800 text-white shadow-xl lg:flex-[1.25]'
                      : 'bg-white border-neutral-200 shadow-xs'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`font-mono text-[10px] font-bold tracking-widest ${col.agents ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {col.step}
                    </span>
                    <h3 className={`font-display font-bold text-base flex items-center gap-2 ${col.agents ? 'text-white' : 'text-neutral-900'}`}>
                      {col.agents && <Bot className="w-4 h-4 text-emerald-400" />}
                      {col.title}
                    </h3>
                    <p className={`text-xs font-sans font-light ${col.agents ? 'text-neutral-400' : 'text-neutral-500'}`}>{col.caption}</p>
                  </div>
                  <ul className="space-y-2">
                    {col.items.map(({ icon: Icon, label, detail }: { icon: typeof Bot; label: string; detail?: string }) => (
                      <li
                        key={label}
                        className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 border ${
                          col.agents ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${col.agents ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <div>
                          <span className={`block text-xs font-semibold ${col.agents ? 'text-white' : 'text-neutral-800'}`}>{label}</span>
                          {detail && <span className="block text-[11px] text-neutral-400 font-light">{detail}</span>}
                        </div>
                        {col.agents && <span className="ml-auto mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>}
                      </li>
                    ))}
                  </ul>
                </div>
                {idx < FLOW.length - 1 && (
                  <div className="flex items-center justify-center text-emerald-600 shrink-0" aria-hidden="true">
                    <ArrowRight className="w-5 h-5 hidden lg:block" />
                    <ArrowDown className="w-5 h-5 lg:hidden" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* COMPACT BENTO CAPABILITIES MATRIX */}
      <section id="capabilities" className="px-6 py-20 border-t border-neutral-200 bg-neutral-100/55 relative">
        <div className="absolute inset-0 bg-radial from-emerald-500/5 via-transparent to-transparent pointer-events-none blur-3xl opacity-40"></div>
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT COLUMN: Why Aethera Exists */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-[9px] text-red-700 tracking-[0.2em] uppercase font-bold bg-red-50 border border-red-200 px-2.5 py-1 rounded-full w-fit">
                  THE INDUSTRY CHALLENGE
                </span>
                <h2 className="font-display font-bold text-3xl text-neutral-900 tracking-tight">
                  Why Aethera Exists
                </h2>
                <p className="text-neutral-800 text-sm font-sans font-medium">
                  Most sustainability teams still struggle with:
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  "Sustainability data scattered across spreadsheets, systems, and suppliers",
                  "Manual data collection and carbon accounting",
                  "Slow supplier engagement for Scope 3 emissions",
                  "No single source of truth for emissions data",
                  "Weak traceability when auditors ask questions",
                  "Increasing regulatory requirements"
                ].map((challenge, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-neutral-900">
                    <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    </div>
                    <span className="font-sans font-normal leading-snug">{challenge}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-emerald-50/40 border border-emerald-300/60 rounded-xl">
                <p className="text-xs text-emerald-950 font-sans font-medium leading-relaxed">
                  Aethera fixes this at the infrastructure level, with AI agents doing the data work and people staying in control.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: What We Do */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-[9px] text-emerald-700 tracking-[0.2em] uppercase font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full w-fit">
                  THE SOLUTION
                </span>
                <h2 className="font-display font-semibold text-3xl text-emerald-700 tracking-tight">
                  Agents That Do the Sustainability Data Work.
                </h2>
                <p className="text-neutral-900 text-sm font-sans font-medium">
                  Aethera's agents:
                </p>
              </div>

              {/* 2x2 Grid of capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-neutral-900">Connect Every Data Source</h3>
                  <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                    Ingestion agents pull data from utility bills, ERPs, facility systems, and supplier submissions, then normalize it into one governed data layer.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-neutral-900">Calculate With Full Lineage</h3>
                  <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                    Scope 1, 2, and 3 emissions are calculated with transparent methodologies, and every figure links back to its source and emission factor.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-neutral-900">Validate &amp; Reconcile Automatically</h3>
                  <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                    Agents check completeness, flag anomalies, and reconcile conflicting figures before they reach a report, with a logged trail auditors can follow.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-neutral-900">Act on the Data</h3>
                  <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                    Agents chase missing supplier data, draft disclosures, and surface reduction opportunities, with a person approving each step.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TRUST & CONTROL */}
      <section id="trust" className="px-6 py-20 border-t border-neutral-200 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[9px] text-emerald-700 tracking-[0.2em] uppercase font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full inline-block">
              TRUST & CONTROL
            </span>
            <h2 className="font-display font-bold text-3xl text-neutral-900 tracking-tight">
              Agents Propose. People Approve.
            </h2>
            <p className="text-neutral-600 text-sm font-sans font-light leading-relaxed">
              Reported sustainability data has to stand up to auditors and regulators. Aethera is designed so automation never comes at the cost of accountability.
            </p>
            <p className="text-xs text-neutral-600 font-sans">
              Questions about how your data is stored and secured?{' '}
              <a href="mailto:hello@aetheraanalytics.com" className="font-semibold text-emerald-700 hover:underline">
                Ask our team
              </a>.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 shadow-xs">
                <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-neutral-900">{title}</h3>
                <p className="text-xs text-neutral-700 font-sans leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
