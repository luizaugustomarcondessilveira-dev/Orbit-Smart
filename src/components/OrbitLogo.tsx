import React from 'react';

interface OrbitLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true 
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }[size];

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[11px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
    xl: 'text-sm tracking-[0.4em]'
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Logo Orb Icon matching the user's image */}
      <div className={`relative ${iconDimensions} flex-shrink-0 flex items-center justify-center`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/40 via-violet-500/20 to-indigo-500/40 blur-sm"></div>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(168,85,247,0.45)] relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle cosmic grid lines */}
          <circle cx="50" cy="50" r="46" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <ellipse cx="50" cy="50" rx="42" ry="24" transform="rotate(-28 50 50)" stroke="#c084fc" strokeWidth="1.2" opacity="0.4" />
          
          {/* Outer Orbital Ring */}
          <ellipse
            cx="48"
            cy="52"
            rx="34"
            ry="18"
            transform="rotate(-32 48 52)"
            stroke="url(#ringGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Central Planet / Sphere */}
          <circle
            cx="47"
            cy="48"
            r="22"
            fill="url(#sphereGradient)"
            stroke="#c084fc"
            strokeWidth="1.5"
          />

          {/* Core light reflection */}
          <ellipse
            cx="41"
            cy="41"
            rx="10"
            ry="6"
            transform="rotate(-30 41 41)"
            fill="#ffffff"
            opacity="0.28"
          />

          {/* Front arc of the ring overlapping the planet */}
          <path
            d="M 21 64 C 28 72, 45 74, 66 61 C 74 56, 79 48, 80 43"
            stroke="url(#frontRingGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />

          {/* Orbiting satellite node / glowing sphere */}
          <circle cx="78" cy="22" r="5" fill="url(#dotGradient)" stroke="#ffffff" strokeWidth="1" />
          <circle cx="78" cy="22" r="8" fill="#c084fc" opacity="0.3" className="animate-pulse" />

          {/* Gradients */}
          <defs>
            <linearGradient id="sphereGradient" x1="28" y1="28" x2="66" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="45%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#1e1136" />
            </linearGradient>

            <linearGradient id="ringGradient" x1="15" y1="35" x2="80" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            <linearGradient id="frontRingGradient" x1="20" y1="65" x2="80" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="60%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>

            <linearGradient id="dotGradient" x1="75" y1="19" x2="81" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-extrabold uppercase font-['Space_Grotesk'] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 ${titleSizes}`}>
            ORBIT
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-[1px] w-2 bg-gradient-to-r from-transparent to-purple-400"></div>
            <span className={`font-bold font-['Space_Grotesk'] uppercase text-purple-400 ${subtitleSizes}`}>
              SMART
            </span>
            <div className="h-[1px] w-2 bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>
        </div>
      )}
    </div>
  );
};
