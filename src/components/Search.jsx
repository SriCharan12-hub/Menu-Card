import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative max-w-md mx-auto mb-8 px-4 w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for dishes..."
          className="block w-full pl-12 pr-10 py-4 glass rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 font-medium"
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <X className="h-5 w-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Search;
