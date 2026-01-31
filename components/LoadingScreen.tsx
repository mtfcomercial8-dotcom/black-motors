import React, { useEffect, useState } from 'react';
import { CarFront } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5;
        if (next >= 100) {
          clearInterval(timer);
          setIsFading(true);
          setTimeout(onComplete, 800); // Tempo para a animação de fade out
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-700 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Animated Logo Container */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-[#BF953F] blur-2xl opacity-20 animate-pulse"></div>
        <CarFront className="w-20 h-20 text-[#FCF6BA] relative z-10 drop-shadow-[0_0_15px_rgba(191,149,63,0.5)]" />
        
        {/* Orbiting rings */}
        <div className="absolute inset-[-20%] border border-[#BF953F]/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-[-40%] border border-[#BF953F]/10 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
      </div>
      
      {/* Text */}
      <div className="text-center mb-10 overflow-hidden">
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-[0.2em] text-white animate-[slideUp_0.5s_ease-out]">
          BLACK<span className="text-gold-gradient">MOTORS</span>
        </h1>
        <p className="text-gray-500 text-xs uppercase tracking-[0.5em] mt-2 animate-[fadeIn_1s_ease-out_0.3s_forwards] opacity-0">
          Premium Automotive Art
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-[2px] bg-gray-900 rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-gold-metallic shadow-[0_0_10px_#BF953F]"
          style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
        ></div>
      </div>
      
      {/* Percentage */}
      <div className="mt-4 font-display text-[#BF953F] text-lg font-bold">
        {Math.min(100, Math.round(progress))}%
      </div>
    </div>
  );
};