
import React from 'react';
import { MarketIndex } from '../types';

interface MarketCardProps {
  index: MarketIndex;
}

const MarketCard: React.FC<MarketCardProps> = ({ index }) => {
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <span className="font-display font-700 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
          {index.name}
        </span>
        <span className="flex items-center text-secondary font-bold text-sm bg-secondary/10 px-2 py-1 rounded-md">
          <span className="material-symbols-outlined text-sm mr-1">arrow_upward</span>
          {index.change}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl font-display font-800 tracking-tight group-hover:text-primary transition-colors">
          {index.value}
        </span>
        <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${index.percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
