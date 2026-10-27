import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import DemoModal from './components/DemoModal';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Blog from './components/Blog';
import { View } from './types';
import { 
  Sparkles, ArrowRight, Database, Layers, 
  Cpu, GitPullRequest, BookmarkCheck, AlertCircle,
  ShieldCheck, TrendingUp, CheckCircle
} from 'lucide-react';

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  const handleOpenDemo = () => {
    window.open('https://calendar.app.google/Vce1rhzMPGhr8cHS6', '_blank', 'noopener,noreferrer');
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-805 selection:bg-emerald-500/10 selection:text-emerald-700 relative overflow-hidden">
      
      {/* Aesthetic high-end thin border gridlines to anchor look */}
      <div className="absolute inset-y-0 left-6 sm:left-12 lg:left-24 w-[1px] bg-neutral-200/50 pointer-events-none border-dashed z-0"></div>
      <div className="absolute inset-y-0 right-6 sm:right-12 lg:right-24 w-[1px] bg-neutral-200/50 pointer-events-none border-dashed z-0"></div>

      {/* Corporate header navigation */}
      <Navbar onOpenDemo={handleOpenDemo} currentView={currentView} onNavigate={setCurrentView} />

      {currentView === 'home' ? (
        <main className="relative z-10">
          
          {/* HERO SECTION */}
          <section id="hero" className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
            {/* Aesthetic glow spot */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[35%] bg-radial from-emerald-500/5 via-transparent to-transparent pointer-events-none rounded-full blur-[100px] z-0"></div>

            <div className="relative z-10 space-y-6 max-w-3xl">
              {/* Enterprise Tag */}
              <div className="mx-auto flex items-center space-x-2 text-emerald-700 font-mono text-[10px] uppercase tracking-[0.25em] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full w-fit">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
                <span>THE INTELLIGENCE LAYER FOR SUSTAINABILITY</span>
              </div>

              <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] max-w-2xl mx-auto">
                Decarbonization <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent font-semibold">
                  Intelligence
                </span> for Enterprises.
              </h1>

              <p className="max-w-xl mx-auto text-neutral-600 text-sm sm:text-base font-sans font-light leading-relaxed">
                Aethera centralizes sustainability data, automates workflows, and delivers actionable intelligence across your organization.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <a
                  href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-emerald-600 hover:bg-emerald-750 text-white font-mono font-bold text-xs uppercase px-7 py-3.5 rounded transition-all duration-200 shadow-md cursor-pointer transform hover:scale-[1.02] flex items-center space-x-2"
                >
                  <span>Book Demo Audit</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('platform');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="bg-white hover:bg-neutral-100 border border-neutral-250 text-neutral-800 font-mono text-xs uppercase px-6 py-3.5 rounded transition-all duration-205 cursor-pointer shadow-sm"
                >
                  Launch Live Sandbox
                </button>
              </div>

              {/* ABOUT US INTEGRATED FRONT-PAGE WIDGET */}
              <div className="mt-14 text-left bg-gradient-to-r from-emerald-50/60 to-emerald-50/10 border border-emerald-200/60 rounded-xl p-5 sm:p-6 max-w-2xl mx-auto space-y-4 relative overflow-hidden shadow-xs hover:border-emerald-300 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-emerald-500/5 to-transparent pointer-events-none rounded-full blur-xl"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100/70">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="font-mono text-[9px] font-bold text-emerald-800 tracking-widest uppercase">ABOUT AETHERA & FOUNDER</span>
                  </div>
                  <button 
                    onClick={() => {
                      setCurrentView('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-mono font-bold text-emerald-700 hover:text-emerald-850 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Read Full Story & Mission</span>
                    <ArrowRight className="w-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-7 space-y-1.5">
                    <h3 className="font-display font-semibold text-neutral-850 text-sm leading-snug">
                      Transforming fragmented sustainability information into trusted, actionable intelligence.
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans font-light leading-relaxed">
                      Founded by Azhan Fikri, Aethera centralizes sustainability data, automates carbon accounting, and empowers teams to drive meaningful corporate climate action.
                    </p>
                  </div>
                  <div className="sm:col-span-5 bg-white border border-neutral-200/85 rounded-lg p-3 flex items-center space-x-3 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-mono font-bold shrink-0">
                      AF
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-neutral-850">Azhan Fikri</h4>
                      <p className="text-[9px] text-neutral-400 font-mono">Founder</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* WORKSPACE DASHBOARD */}
          <section className="px-6 pb-20 max-w-7xl mx-auto w-full relative">
            <div className="absolute top-1/2 left-0 w-[40px] h-full pointer-events-none z-0"></div>
            <Dashboard onOpenDemo={handleOpenDemo} />
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
                      "Fragmented sustainability data",
                      "Manual carbon accounting processes",
                      "Difficult supplier engagement for Scope 3 emissions",
                      "Limited visibility into emissions hotspots",
                      "Audit preparation and traceability challenges",
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

                  <div className="p-4 bg-emerald-50/40 border border-emerald-250/60 rounded-xl">
                    <p className="text-xs text-emerald-950 font-sans font-medium leading-relaxed">
                      Aethera was built to address these challenges through a unified sustainability intelligence platform.
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
                      Turn Sustainability Data Into Decisions.
                    </h2>
                    <p className="text-neutral-850 text-sm font-sans font-medium">
                      Aethera helps organizations:
                    </p>
                  </div>

                  {/* 2x2 Grid of capabilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                      <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-150 text-emerald-700 flex items-center justify-center shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-neutral-900">Centralize Sustainability Data</h3>
                      <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                        Connect data from facilities, suppliers, utility bills, operational systems, and sustainability workflows.
                      </p>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                      <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-150 text-emerald-700 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-neutral-900">Automate Carbon Accounting</h3>
                      <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                        Calculate Scope 1, Scope 2, and Scope 3 emissions using transparent methodologies and traceable data sources.
                      </p>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                      <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-150 text-emerald-700 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-neutral-900">Improve Audit Readiness</h3>
                      <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                        Maintain data lineage, document traceability, approval workflows, and evidence management.
                      </p>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-3 hover:border-neutral-300 shadow-xs transition-all duration-300">
                      <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-150 text-emerald-700 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-neutral-900">Generate Actionable Insights</h3>
                      <p className="text-xs text-neutral-700 font-sans font-normal leading-relaxed">
                        Identify trends, hotspots, opportunities, and risks through AI-powered analytics and forecasting.
                    </p>
                    </div>

                  </div>
                </div>

              </div>

              {/* Micro value tags bar */}
              <div className="pt-6 border-t border-neutral-200 font-mono text-[9px] text-neutral-500 flex flex-wrap gap-y-3 gap-x-8 items-center text-left">
                <div className="flex items-center space-x-2">
                  <GitPullRequest className="w-4 h-4 text-emerald-600" />
                  <span>REST API INTEGRATION LEVEL</span>
                </div>
              </div>

            </div>
          </section>

        </main>
      ) : currentView === 'about' ? (
        <AboutUs onBack={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      ) : (
        <Blog onBack={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      )}

      {/* Sustainable briefing schedule modal */}
      <DemoModal isOpen={isDemoOpen} onClose={handleCloseDemo} />

      {/* Compact footer Columns */}
      <Footer onOpenDemo={handleOpenDemo} onNavigateAbout={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} onNavigateBlog={() => { setCurrentView('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

    </div>
  );
}
