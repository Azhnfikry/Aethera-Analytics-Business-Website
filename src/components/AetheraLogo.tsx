import { SVGProps } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AetheraLogo({ className = '', size = 'md' }: LogoProps) {
  // Define dimensions and text sizing depending on selected variant
  const sizeClasses = {
    sm: {
      titleText: 'text-lg',
      subText: 'text-[14px]',
      leafSize: 'w-4 h-3.5 -top-2 -right-1',
      gap: 'space-x-1.5',
    },
    md: {
      titleText: 'text-2.5xl',
      subText: 'text-[19px]',
      leafSize: 'w-5.5 h-5 -top-3.5 -right-2',
      gap: 'space-x-2',
    },
    lg: {
      titleText: 'text-4xl',
      subText: 'text-[28px]',
      leafSize: 'w-8 h-7 -top-[1.2rem] -right-2.5',
      gap: 'space-x-3',
    },
  };

  const config = sizeClasses[size];

  return (
    <div className={`flex items-baseline select-none font-sans ${config.gap} ${className}`}>
      {/* Prime Brand Row */}
      <span className={`font-sans font-extrabold ${config.titleText} text-neutral-800 tracking-tight leading-none flex items-baseline relative`}>
        <span>Aeth</span>
        <span className="relative inline-block">
          e
          {/* Exactly positioned leaf emblem sprout on the 'e' */}
          <svg 
            className={`absolute overflow-visible ${config.leafSize}`}
            viewBox="0 0 24 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="leafGreenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e8204" />
                <stop offset="60%" stopColor="#48ad15" />
                <stop offset="100%" stopColor="#8ade26" />
              </linearGradient>
            </defs>
            
            {/* Left tilting leaf */}
            <path 
              d="M 11 13 C 5 11, 2 5, 8 1 C 12 2, 13 8, 11 13 Z" 
              fill="url(#leafGreenGrad)" 
              stroke="#165c03" 
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            
            {/* Right tilting leaf */}
            <path 
              d="M 11 13 C 13 10, 20 7, 19 2.5 C 15 2, 12 7.5, 11 13 Z" 
              fill="url(#leafGreenGrad)" 
              stroke="#165c03" 
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            
            {/* Center veins */}
            <path d="M 11 13 Q 9.5 8 8 3" stroke="#9eef36" strokeWidth="0.6" fill="none" opacity="0.8" />
            <path d="M 11 13 Q 12.5 8.5 15.5 5.5" stroke="#9eef36" strokeWidth="0.6" fill="none" opacity="0.8" />
          </svg>
        </span>
        <span>ra</span>
      </span>

      {/* Analytics subtitle tag next to Aethera */}
      <span 
        className={`font-sans font-medium ${config.subText} text-[#568254] select-none leading-none`}
        style={{ letterSpacing: '0.04em' }}
      >
        Analytics
      </span>
    </div>
  );
}
