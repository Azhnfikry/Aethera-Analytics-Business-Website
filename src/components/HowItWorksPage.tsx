import { ArrowRight } from 'lucide-react';
import { Link } from '../router';
import { CapabilitiesSection, HowItWorksSection, TrustSection } from './Home';

export default function HowItWorksPage() {
  return (
    <main className="relative z-10 pt-16">
      <HowItWorksSection />
      <CapabilitiesSection />
      <TrustSection />

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-neutral-950 border border-neutral-800 rounded-2xl p-8 sm:p-12 text-center shadow-xl space-y-5">
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">
            See it with your own data.
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans font-light max-w-xl mx-auto leading-relaxed">
            Book a demo to walk through Aethera with your bills and supplier data, or start with the free Scope 1 &amp; 2 calculator for SMEs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 shadow-md inline-flex items-center space-x-1"
            >
              <span>Book a Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/sme-carbon-calculator"
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 border border-neutral-700"
            >
              Free SME Calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
