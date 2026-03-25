import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const MenuItem = ({ item, index, onAdd }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
      whileTap={{ scale: 0.995 }}
      onClick={onAdd}
      className="elegant-card py-6 group flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none relative"
    >
      <div className="flex-grow max-w-full">
        <div className="flex items-center gap-3 mb-2">
          {/* Type Indicator */}
          <div className={`w-3 h-3 rounded-full border border-white/20 shrink-0 ${item.type === 'veg' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
          
          <div className="flex items-baseline justify-between flex-grow gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors duration-300 tracking-wide">
                {item.name}
              </h3>
              {item.isChefSpecial && (
                <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded uppercase tracking-[0.2em] font-bold flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-primary" />
                  Special
                </span>
              )}
            </div>
            <div className="flex-grow border-b border-dotted border-white/20 hidden md:block" />
            <span className="text-xl font-serif font-bold text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
              ₹ {item.price}
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base font-sans italic leading-relaxed pr-8 ml-6">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default MenuItem;
