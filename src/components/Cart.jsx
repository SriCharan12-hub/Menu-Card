import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, X, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cart, onUpdateQuantity, onRemove, isOpen, setIsOpen }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary text-slate-900 p-5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-2 group"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
              {itemCount}
            </span>
          )}
        </div>
        <span className="font-bold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap uppercase tracking-widest text-sm">
          My Order
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-950 z-50 shadow-2xl flex flex-col border-l border-primary/20"
            >
              <div className="p-8 border-b border-primary/10 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Your Order</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-full text-slate-400 hover:text-primary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grow overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-primary/5 border border-primary/10 rounded-full flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-primary/30" />
                    </div>
                    <h3 className="text-white font-serif font-bold text-xl mb-3">Your selections are empty</h3>
                    <p className="text-slate-500 max-w-xs font-sans italic">
                      Please explore our culinary offerings to begin your journey.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3 group border-b border-white/5 pb-6 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-serif font-bold text-lg mb-1">{item.name}</h4>
                          <span className="text-slate-500 text-sm font-sans italic">Signature Selection</span>
                        </div>
                        <span className="text-primary font-serif font-bold text-lg">₹ {item.price * item.quantity}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-full border border-white/10 px-3">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-all flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-slate-900 border-t border-primary/20">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-slate-400 font-serif text-lg uppercase tracking-widest">Grand Total</span>
                  <span className="text-3xl font-serif font-bold text-gold">₹ {total}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  className="w-full py-5 rounded-none border border-primary bg-transparent text-primary hover:bg-primary hover:text-slate-950 font-serif font-bold text-xl tracking-widest transition-all duration-500 disabled:opacity-30 flex items-center justify-center gap-3 uppercase"
                >
                  <CreditCard className="w-6 h-6" />
                  Place Your Order
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
                  <div className="h-px w-8 bg-primary" />
                  <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-bold">Celestial Kitchen</span>
                  <div className="h-px w-8 bg-primary" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
