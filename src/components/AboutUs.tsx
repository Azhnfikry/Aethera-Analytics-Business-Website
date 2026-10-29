import { useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen, User, Briefcase, Award, Linkedin } from 'lucide-react';
import founderAvatar from '../assets/images/Profile Photo.jpg';

interface AboutUsProps {
  onBack: () => void;
}

export default function AboutUs({ onBack }: AboutUsProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto w-full relative z-10 animate-fade-in">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="group mb-8 flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-neutral-500 hover:text-emerald-700 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>BACK TO HOME & WORKSPACE</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Mission & Vision */}
        <div className="lg:col-span-8 space-y-10">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-emerald-700 font-mono text-[10px] uppercase tracking-[0.25em] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>SUSTAINABILITY DATA INFRASTRUCTURE</span>
            </div>
            <h1 className="font-display font-medium text-4xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
              Building the Sustainability Data Layer for Malaysian Companies.
            </h1>
          </div>

          <div className="text-sm sm:text-base text-black font-sans font-normal leading-relaxed space-y-6">
            <p className="text-black">
              Organisations today face growing pressure to manage sustainability performance, comply with evolving regulations, and reduce environmental impact. Yet sustainability data remains fragmented across spreadsheets, departments, suppliers, utility bills, and disconnected systems.
            </p>
            <p className="font-semibold text-black border-l-2 border-emerald-500 pl-4 bg-emerald-50/40 py-2 rounded-r-lg">
              Aethera was founded to solve this challenge.
            </p>
            <p className="text-black">
              We believe sustainability teams should spend less time chasing data and more time driving meaningful action. Our mission is to build sustainability data infrastructure that continuously collects, validates and traces sustainability data, giving organisations a trusted foundation to report on, make decisions with, and accelerate decarbonisation.
            </p>
          </div>

          {/* Core Values Section */}
          <div className="pt-6 border-t border-neutral-200">
            <h3 className="font-mono text-xs font-bold text-neutral-500 tracking-wider uppercase mb-6 flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Core Beliefs & Philosophy</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 bg-white border border-neutral-200 rounded-lg space-y-2">
                <h4 className="font-display font-semibold text-neutral-800 text-sm">Automation Does the Data Work</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                  Collection, validation and reconciliation should run continuously, so sustainability staff can focus on executing decarbonisation initiatives.
                </p>
              </div>
              <div className="p-5 bg-white border border-neutral-200 rounded-lg space-y-2">
                <h4 className="font-display font-semibold text-neutral-800 text-sm">Infrastructure, With People in Control</h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light">
                  Not another dashboard: a governed, traceable data foundation. Automation proposes, people approve, and every change is logged.
                </p>
              </div>
            </div>
          </div>

          {/* Statement section */}
          <div className="pt-10 border-t border-neutral-200">
            <h2 className="font-mono text-[10px] text-emerald-700 tracking-[0.25em] uppercase font-bold block mb-2">
              Closing Statement
            </h2>
            <p className="text-xl font-display font-light text-neutral-800 tracking-tight leading-relaxed">
              &ldquo;Sustainability Data You Can Trust.&rdquo;
            </p>
            <p className="text-xs text-neutral-500 font-sans font-light mt-3 max-w-xl">
              At Aethera, we believe better sustainability outcomes begin with trusted data. By pairing automation with governed data infrastructure, we help organisations move beyond manual reporting toward continuous, audit-ready action.
            </p>
          </div>

        </div>

        {/* Right Column: Co-founder spotlights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm border-t-4 border-t-emerald-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-emerald-500/5 to-transparent pointer-events-none rounded-full blur-xl"></div>
            
            <h3 className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider uppercase mb-5 block">
              CO-FOUNDER SPOTLIGHT
            </h3>

            {/* Profile Avatar & Bio Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 rounded-full border border-neutral-200 overflow-hidden shrink-0 shadow-inner flex items-center justify-center bg-neutral-100">
                {!imageError ? (
                  <img 
                    src={founderAvatar} 
                    alt="Azhan Fikri" 
                    referrerPolicy="no-referrer"
                    onError={() => {
                      console.log("Avatar failed to load, falling back to initials.");
                      setImageError(true);
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-mono text-base font-bold tracking-tight shadow-inner">
                    AF
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-neutral-800 leading-tight">Azhan Fikri</h4>
                <p className="text-xs text-emerald-700 font-mono mt-1">Co-founder, Product & Business Operations</p>
              </div>
            </div>

            {/* Biography details */}
            <div className="space-y-4 text-xs font-sans font-light text-neutral-600 leading-relaxed">
              <p>
                Azhan is an engineer, researcher, and entrepreneur with experience delivering large-scale infrastructure projects and developing AI-driven solutions for sustainability and environmental challenges.
              </p>
              <p>
                His work spans engineering, machine learning, sustainability analytics, and digital transformation, with a long-term mission to leverage technology and innovation in the fight against climate change.
              </p>
            </div>

            {/* Micro credentials block */}
            <div className="mt-6 pt-5 border-t border-neutral-200 flex flex-col space-y-2.5 text-[10px] font-mono text-neutral-500">
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Engineer & Climate Innovation Lead</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>AI Engineering & Sustainability Analytics</span>
              </div>
            </div>

            {/* Linkedin Link Button */}
            <div className="mt-5 pt-4 border-t border-neutral-200">
              <a
                href="https://www.linkedin.com/in/azhan-fikri-a44783241/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-[#0077b5] hover:bg-[#006699] text-white rounded-lg transition-all duration-300 text-xs font-mono font-bold shadow-xs cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-white" />
                <span>CONNECT ON LINKEDIN</span>
              </a>
            </div>

          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm border-t-4 border-t-emerald-600 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-emerald-500/5 to-transparent pointer-events-none rounded-full blur-xl"></div>

            <h3 className="font-mono text-[9px] font-bold text-neutral-400 tracking-wider uppercase mb-5 block">
              CO-FOUNDER SPOTLIGHT
            </h3>

            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full border border-neutral-200 overflow-hidden shrink-0 shadow-inner flex items-center justify-center bg-neutral-100">
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-mono text-base font-bold tracking-tight shadow-inner">
                  BL
                </div>
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-neutral-800 leading-tight">Bryan Lai</h4>
                <p className="text-xs text-emerald-700 font-mono mt-1">Co-founder, Technical Lead (Data & AI)</p>
              </div>
            </div>

            {/* TODO(content): Bryan Lai's photo, biography, credentials and LinkedIn URL */}
          </div>

          {/* Quick contact widget */}
          <div className="bg-neutral-100/80 rounded-xl p-6 border border-neutral-200 space-y-4">
            <h4 className="font-display font-semibold text-neutral-800 text-xs flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aethera Briefing</span>
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans font-light avatar-bio">
              Interested in our vision for sustainability data infrastructure? Schedule a direct session or contact us directly at <a href="mailto:hello@aetheraanalytics.com" className="text-emerald-700 hover:underline font-semibold font-mono">hello@aetheraanalytics.com</a>.
            </p>
            <a
              href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-800 text-white font-mono text-[10px] font-bold tracking-wider rounded uppercase transition-colors cursor-pointer text-center shadow-xs"
            >
              Book 30-Min Demo
            </a>
          </div>

        </div>

      </div>

      {/* Collaboration Remarks Banner */}
      <div className="mt-16 bg-neutral-950 border border-neutral-800 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
        {/* Subtle cyan glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
        {/* Dark grid canvas accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight leading-snug">
            We're building the sustainability data infrastructure for carbon compliance, starting in Malaysia.
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans font-light leading-relaxed">
            Work with us through pilots, partnerships or integrations to make audit-ready climate data the norm for every organisation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 cursor-pointer border border-neutral-700 shadow-sm"
            >
              Explore Aethera
            </button>
            <a
              href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-md inline-flex items-center space-x-1"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
