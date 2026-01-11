
import React from 'react';

interface SentimentMeterProps {
  value: number; // 0 to 100
}

const SentimentMeter: React.FC<SentimentMeterProps> = ({ value }) => {
  // Map value (0-100) to rotation (-90 to 90 degrees)
  const rotation = (value / 100) * 180 - 90;

  return (
    <div className="relative w-48 h-24 mx-auto mb-8">
      {/* The Gauge */}
      <div className="sentiment-meter w-48 h-48 rounded-full"></div>
      
      {/* The Needle */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-20 bg-primary rounded-full origin-bottom transition-transform duration-1000 ease-in-out shadow-sm ring-4 ring-white dark:ring-slate-800"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      ></div>
      
      {/* Center Pin */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full ring-2 ring-white dark:ring-slate-800"></div>
      
      {/* Labels */}
      <div className="absolute -bottom-6 w-full flex justify-between text-[10px] font-800 uppercase tracking-widest text-slate-400 px-2">
        <span>Bearish</span>
        <span className="text-secondary">Bullish</span>
      </div>
    </div>
  );
};

export default SentimentMeter;
