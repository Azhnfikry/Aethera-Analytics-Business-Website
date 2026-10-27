import { ShieldAlert, ExternalLink } from 'lucide-react';
import AetheraLogo from './AetheraLogo';

interface FooterProps {
  onOpenDemo: () => void;
  onNavigateAbout: () => void;
  onNavigateBlog: () => void;
}

export default function Footer({ onOpenDemo, onNavigateAbout, onNavigateBlog }: FooterProps) {
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
              Aethera is a Sustainability Intelligence Platform that helps organizations centralize sustainability data, automate carbon accounting, and generate audit-ready insights through AI-powered analytics and enterprise-grade traceability
            </p>

            <div className="pt-2 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-500">
                <div className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></div>
                <span>ALL ASEAN SYSTEMS OPERATIONAL</span>
              </div>
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
                Platform
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">Carbon Accounting</a></li>
                <li><a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">Scope 3 Portal</a></li>
                <li><a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">AI Co-Pilot</a></li>
                <li><a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">Scenario Analytics</a></li>
                 <li><a href="https://calendar.app.google/Vce1rhzMPGhr8cHS6" target="_blank" rel="noopener noreferrer" className="text-emerald-705 hover:underline text-left cursor-pointer">Request Custom API</a></li>
              </ul>
            </div>

            {/* Resources Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Resources
              </h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={onNavigateBlog} className="text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer text-left">Blog</button></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors">EMA Grid Database</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors">Case Studies</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors">Regulatory TCFD Guide</a></li>
              </ul>
            </div>

            {/* Company Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Company
              </h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={onNavigateAbout} className="text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer text-left">About Us</button></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center">
                  <span>Careers</span>
                  <span className="ml-1.5 px-1 py-0.2 bg-emerald-100 text-[8px] font-bold border border-emerald-200 text-emerald-800 rounded">HIRING</span>
                </a></li>
                <li><a href="https://calendar.app.google/Vce1rhzMPGhr8cHS6" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 cursor-pointer transition-colors text-left">Contact Sales</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors">Partner Network</a></li>
              </ul>
            </div>

            {/* Legal Columns */}
            <div className="space-y-3">
              <h4 className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider uppercase">
                Legal
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()} className="text-neutral-600 hover:text-neutral-900 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom bar with copyright and compliance seals */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-500">
          <div className="space-x-1 flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <span>&copy; {currentYear} AETHERA ANALYTICA SOLUTION (CA0421550-V). All rights reserved.</span>
            <span className="hidden md:inline">·</span>
            <span>THE INTELLIGENCE LAYER FOR SUSTAINABILITY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
