import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CategorySelector = ({ categories, activeCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xs mx-auto mb-10 z-50" ref={dropdownRef}>
      <label className="block text-sm font-medium text-slate-400 mb-2 text-center uppercase tracking-widest">
        Select Category
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 glass rounded-2xl text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-xl"
      >
        <span className="text-lg">{activeCategory}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full glass mt-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="py-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onSelect(category);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200 ${
                    activeCategory === category
                      ? 'bg-primary/20 text-primary'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="font-medium text-lg">{category}</span>
                  {activeCategory === category && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelector;
