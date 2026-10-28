import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import AetheraLogo from './AetheraLogo';
import { View } from '../types';
import { navigate } from '../router';

interface NavbarProps {
  currentView: View;
}

export default function Navbar({ currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (to: string) => {
    setIsOpen(false);
    navigate(to);
  };

  const handleLogoClick = () => go('/');
  const handleHomeNavigate = (sectionId: string) => go(`/#${sectionId}`);
  const handleBlogClick = () => go('/blog');
  const handleAboutClick = () => go('/about');

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-neutral-200 py-4 shadow-xs'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brandmark */}
        <button
          onClick={handleLogoClick}
          className="flex items-center group text-left cursor-pointer hover:opacity-90 transition-opacity"
        >
          <AetheraLogo size="sm" />
        </button>

        {/* Desktop Links & Status Badge */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleHomeNavigate('how-it-works')}
            className={`text-xs font-bold tracking-wider font-mono transition-colors duration-200 cursor-pointer ${currentView === 'home' ? 'text-black' : 'text-neutral-700 hover:text-black'}`}
          >
            // HOW IT WORKS
          </button>
          <button
            onClick={() => handleHomeNavigate('capabilities')}
            className={`text-xs font-bold tracking-wider font-mono transition-colors duration-200 cursor-pointer ${currentView === 'home' ? 'text-black' : 'text-neutral-700 hover:text-black'}`}
          >
            // VALUE PROP
          </button>
          <button
            onClick={handleAboutClick}
            className={`text-xs font-bold tracking-wider font-mono transition-colors duration-200 cursor-pointer ${currentView === 'about' ? 'text-black' : 'text-neutral-700 hover:text-black'}`}
          >
            // ABOUT US
          </button>
          <button
            onClick={handleBlogClick}
            className={`text-xs font-bold tracking-wider font-mono transition-colors duration-200 cursor-pointer ${currentView === 'blog' ? 'text-black' : 'text-neutral-700 hover:text-black'}`}
          >
            // BLOG
          </button>

          {/* Book Demo Button */}
          <a
            href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold tracking-wider px-4.5 py-2.5 rounded-md hover:scale-[1.02] transform transition-all duration-200 flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-4">
          <a
            href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold px-3 py-1.5 rounded"
          >
            DEMO
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-white/95 backdrop-blur-lg border-t border-neutral-200 z-40 transition-all duration-300 px-6 py-8 flex flex-col justify-between shadow-lg">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => handleHomeNavigate('how-it-works')}
              className="text-xl font-display font-medium text-left text-neutral-800 hover:text-neutral-950 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleHomeNavigate('capabilities')}
              className="text-xl font-display font-medium text-left text-neutral-800 hover:text-neutral-950 cursor-pointer"
            >
              Value Propositions
            </button>
            <button
              onClick={handleAboutClick}
              className="text-xl font-display font-medium text-left text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              About Us Story
            </button>
            <button
              onClick={handleBlogClick}
              className="text-xl font-display font-medium text-left text-neutral-800 hover:text-neutral-950 cursor-pointer"
            >
              Blog
            </button>
          </div>

          <div className="flex flex-col space-y-4 border-t border-neutral-200 pt-6">
            <a
              href="https://calendar.app.google/Vce1rhzMPGhr8cHS6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 rounded-lg text-center font-mono font-bold tracking-wider text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <span>Book Enterprise Demo</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
