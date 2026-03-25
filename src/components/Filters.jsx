import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ChefHat } from 'lucide-react';

const Filters = ({ vegFilter, setVegFilter, priceSort, setPriceSort }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 px-4">
      {/* Dietary Toggle */}
      <div className="flex bg-slate-900/50 p-1 rounded-full border border-white/5 backdrop-blur-md">
        {['all', 'veg', 'non-veg'].map((type) => (
          <button
            key={type}
            onClick={() => setVegFilter(type)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${
              vegFilter === type 
              ? 'bg-primary text-slate-950 shadow-lg' 
              : 'text-slate-500 hover:text-primary'
            }`}
          >
            {type}
            {vegFilter === type && type === 'veg' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950/40" />}
            {vegFilter === type && type === 'non-veg' && <div className="w-1.5 h-1.5 rounded-full bg-slate-950/40" />}
          </button>
        ))}
      </div>

      {/* Vertical Divider for desktop */}
      <div className="hidden md:block w-px h-6 bg-white/10" />

      {/* Price Sort Button */}
      <button
        onClick={() => setPriceSort(prev => prev === 'lowHigh' ? 'highLow' : 'lowHigh')}
        className="flex items-center gap-3 px-6 py-2.5 bg-slate-900/50 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:border-primary/30 transition-all backdrop-blur-md group"
      >
        <ArrowUpDown className={`w-3.5 h-3.5 transition-transform duration-300 ${priceSort === 'highLow' ? 'rotate-180' : ''}`} />
        Price: {priceSort === 'lowHigh' ? 'Ascending' : 'Descending'}
      </button>

      {/* Chef's Special Hint */}
      <div className="hidden lg:flex items-center gap-2 ml-4 text-slate-600 font-serif text-[10px] italic tracking-widest uppercase">
        <ChefHat className="w-3 h-3 opacity-30" />
        Look for the Gold Star for Specials
      </div>
    </div>
  );
};

export default Filters;
