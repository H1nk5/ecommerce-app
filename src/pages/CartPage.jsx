import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DeleteIcon, MinusIcon, PlusIcon } from '../components/icons';
import useStore from '../store/useStore';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, toggleCartCheck } = useStore();

  const totalPrice = cart
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalCount = cart
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.quantity, 0);

  const allChecked = cart.length > 0 && cart.every(item => item.checked);

  if (cart.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[var(--color-bg-primary)]">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl mb-6"
        >
          🛒
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[var(--color-text-tertiary)] mb-6 text-sm"
        >
          购物车是空的
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/')}
          className="btn-gold px-8 py-2.5 rounded-full text-sm"
        >
          去逛逛
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pb-36">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-[var(--color-border)] px-5 pt-safe pb-3">
        <h1 className="text-lg font-display font-semibold text-center text-[var(--color-text-primary)]">
          购物车 <span className="text-[var(--color-text-tertiary)] font-normal text-sm">({cart.length})</span>
        </h1>
      </div>

      {/* Cart Items */}
      <div className="p-5 space-y-3">
        <AnimatePresence>
          {cart.map((item, index) => (
            <motion.div
              key={`${item.id}-${JSON.stringify(item.specs)}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card p-4 flex gap-3"
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleCartCheck(index)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center self-center transition-all duration-300 ${
                  item.checked
                    ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                    : 'border-[var(--color-text-tertiary)]'
                }`}
              >
                {item.checked && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="var(--color-bg-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-xl object-cover"
              />

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm line-clamp-2 mb-2 text-[var(--color-text-primary)]">{item.title}</h3>
                  <div className="flex gap-2">
                    {Object.entries(item.specs).map(([key, value]) => (
                      <span key={key} className="text-xs bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[var(--color-gold)] font-semibold">¥{item.price}</span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateCartQuantity(index, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]"
                    >
                      <MinusIcon size={14} color="var(--color-text-secondary)" />
                    </motion.button>
                    <span className="text-sm w-6 text-center text-[var(--color-text-primary)]">{item.quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateCartQuantity(index, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]"
                    >
                      <PlusIcon size={14} color="var(--color-text-secondary)" />
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromCart(index)}
                      className="ml-2 p-1"
                    >
                      <DeleteIcon size={18} color="var(--color-text-tertiary)" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] glass border-t border-[var(--color-border)] px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const newState = !allChecked;
                cart.forEach((_, i) => {
                  if (cart[i].checked !== newState) toggleCartCheck(i);
                });
              }}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                allChecked
                  ? 'bg-[var(--color-gold)] border-[var(--color-gold)]'
                  : 'border-[var(--color-text-tertiary)]'
              }`}
            >
              {allChecked && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="var(--color-bg-deep)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <span className="text-sm text-[var(--color-text-primary)]">全选</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs text-[var(--color-text-tertiary)]">合计 </span>
              <span className="text-[var(--color-gold)] font-bold text-lg">¥{totalPrice.toFixed(2)}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/checkout')}
              className="btn-gold px-6 py-2.5 rounded-full text-sm"
            >
              结算 ({totalCount})
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
