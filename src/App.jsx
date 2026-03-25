import React, { useState, useMemo } from 'react';
import { categories, menuItems } from './data';
import CategorySelector from './components/CategorySelector';
import MenuItem from './components/MenuItem';
import Search from './components/Search';
import Filters from './components/Filters';
import Cart from './components/Cart';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Star, Quote, Sparkles, Menu } from 'lucide-react';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState('all'); // all, veg, non-veg
  const [priceSort, setPriceSort] = useState('lowHigh'); // lowHigh, highLow
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = useMemo(() => {
    let items = menuItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDietary = vegFilter === 'all' || item.type === vegFilter;
      return matchesCategory && matchesSearch && matchesDietary;
    });

    // Apply Price Sort
    return items.sort((a, b) => {
      if (priceSort === 'lowHigh') return a.price - b.price;
      return b.price - a.price;
    });
  }, [activeCategory, searchQuery, vegFilter, priceSort]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen w-full px-4 py-16 md:px-8 lg:px-24 xl:px-32">
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0c0d10]" />
      
      <header className="max-w-4xl mx-auto text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-4 opacity-40">
            <div className="h-px w-12 md:w-24 bg-primary" />
            <Coffee className="w-6 h-6 text-primary" />
            <div className="h-px w-12 md:w-24 bg-primary" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block mb-4"
        >
          <Sparkles className="absolute -top-8 -right-8 w-8 h-8 text-primary/30 animate-pulse" />
          <h1 className="text-7xl md:text-9xl font-serif font-black text-white tracking-widest uppercase text-shadow-glow">
            <span className="text-gold">Bello</span>
          </h1>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-serif text-slate-400 italic mb-8 tracking-[0.4em] uppercase"
        >
          Cafe & Bistro
        </motion.h2>

        <div className="w-20 h-0.5 bg-primary/20 mx-auto mb-10" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-slate-500 italic mb-12 font-serif text-lg"
        >
          <Quote className="w-4 h-4 rotate-180 opacity-20" />
          A symphony of flavors in every cup
          <Quote className="w-4 h-4 opacity-20" />
        </motion.div>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>

      <main className="max-w-4xl mx-auto">
        <CategorySelector 
          categories={['All', ...categories]} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />

        <Filters 
          vegFilter={vegFilter} 
          setVegFilter={setVegFilter}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
        />

        <div className="mt-4 px-4 md:px-0">
          <div className="flex items-center justify-between mb-12 border-b border-primary/20 pb-4">
            <h2 className="text-3xl font-serif font-bold text-white tracking-widest uppercase flex items-center gap-4">
              {activeCategory} 
              <span className="text-primary/40 text-sm font-normal tracking-widest uppercase px-3 py-1 border border-primary/10 rounded">
                Menu
              </span>
            </h2>
            <div className="text-slate-500 font-sans text-xs uppercase tracking-[0.2em] hidden sm:block">
              Curating {filteredItems.length} Selections
            </div>
          </div>

          <div className="space-y-1 relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <MenuItem 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    onAdd={() => addToCart(item)}
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32"
                >
                  <div className="w-16 h-16 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-primary/20" />
                  </div>
                  <h3 className="text-white text-2xl font-serif font-bold italic mb-2 tracking-wide">No Matches Found</h3>
                  <p className="text-slate-600 font-sans italic">Our artisans are crafting new recipes. Please refine your search.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Cart 
        cart={cart} 
        onUpdateQuantity={updateQuantity} 
        onRemove={removeFromCart}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
      />

      <footer className="max-w-4xl mx-auto mt-40 text-center pb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px grow bg-linear-to-r from-transparent to-primary/20" />
            <div className="w-2 h-2 rounded-full bg-primary/40 rotate-45" />
            <div className="h-px grow bg-linear-to-l from-transparent to-primary/20" />
          </div>
        <p className="text-primary/60 text-[10px] font-bold tracking-[0.6em] uppercase mb-4">
          Bello Cafe & Bistro | Crafted Elegance
        </p>
        <p className="text-slate-700 text-[9px] uppercase tracking-[0.4em]">
          Experience the art of fine dining.
        </p>
      </footer>
    </div>
  );
}

export default App;

