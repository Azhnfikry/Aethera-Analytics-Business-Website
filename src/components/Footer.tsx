import AetheraLogo from './AetheraLogo';
import { Link } from '../router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-neutral-50 border-t border-neutral-200 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Core Description + Grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo Brand + Pitch */}
          <div className="md:col-span-4 space-y-4">
            <AetheraLogo size="sm" />

            <p className="text-xs text-neutral-600 leading-relaxed font-sans font-light max-w-sm">
              Aethera is agentic sustainability data infrastructure for Malaysian companies: AI agents that collect, validate and trace sustainability data into an audit-ready foundation for carbon accounting and NSRF disclosure.
            </p>

            <div className="pt-2 flex flex-col space-y-2">
              <div className="text-[11px] font-mono text-neutral-600 flex items-center space-x-1">
                <span className="text-neutral-400">EMAIL:</span>
                <a href="mailto:hello@aetheraanalytics.com" className="font-bold text-neutral-800 hover:text-emerald-700 transition-colors">
                  hello@aetheraanalytics.com
                </a>
              </div>
            </div>
          </div>

          {/* Links structure */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            
            {/* Platform Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Agents
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/#capabilities" className="text-neutral-600 hover:text-neutral-900 transition-colors">Data Ingestion</Link></li>
                <li><Link to="/#capabilities" className="text-neutral-600 hover:text-neutral-900 transition-colors">Validation &amp; Reconciliation</Link></li>
                <li><Link to="/#capabilities" className="text-neutral-600 hover:text-neutral-900 transition-colors">Emissions Calculation</Link></li>
                <li><Link to="/#capabilities" className="text-neutral-600 hover:text-neutral-900 transition-colors">Action Agents</Link></li>
                 <li><a href="https://calendar.app.google/Vce1rhzMPGhr8cHS6" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline text-left cursor-pointer">Integration Enquiries</a></li>
              </ul>
            </div>

            {/* Resources Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Resources
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/blog" className="text-neutral-600 hover:text-neutral-900 transition-colors">Blog</Link></li>
                <li><Link to="/#how-it-works" className="text-neutral-600 hover:text-neutral-900 transition-colors">How It Works</Link></li>
                <li><Link to="/#trust" className="text-neutral-600 hover:text-neutral-900 transition-colors">Trust &amp; Control</Link></li>
              </ul>
            </div>

            {/* Company Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">About Us</Link></li>
                <li><Link to="/#pilots" className="text-neutral-600 hover:text-neutral-900 transition-colors">Pilot Programme</Link></li>
                <li><a href="https://calendar.app.google/Vce1rhzMPGhr8cHS6" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 transition-colors">Contact Sales</a></li>
              </ul>
            </div>

            {/* Legal Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Legal
              </h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/privacy" className="text-neutral-600 hover:text-neutral-900 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-neutral-600 hover:text-neutral-900 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom bar with copyright and compliance seals */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500">
          <div className="space-x-1 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <span>&copy; {currentYear} AETHERA ANALYTICA SOLUTION (CA0421550-V). All rights reserved.</span>
            <span className="hidden md:inline">·</span>
            <span>AGENTIC SUSTAINABILITY DATA INFRASTRUCTURE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
