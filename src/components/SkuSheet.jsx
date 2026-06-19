// ═══════════════════════════════════════════════
// SKU 规格选择弹窗 — 选中动效 + 物理弹窗
// ═══════════════════════════════════════════════
import { motion, AnimatePresence } from 'framer-motion';
import BottomSheet from './common/BottomSheet';
import SafeImg from './SafeImg';
import { MinusIcon, PlusIcon } from './icons';
import useStore from '../store/useStore';

export default function SkuSheet() {
  const {
    currentProduct: product,
    isSkuOpen,
    toggleSku,
    selectedSpecs,
    selectSpec,
    quantity,
    setQuantity,
    addToCart,
    triggerFly
  } = useStore();

  if (!product) return null;

  const isAllSelected = product.specs.every(spec => selectedSpecs[spec.name]);
  const missingSpecs = product.specs.filter(s => !selectedSpecs[s.name]).map(s => s.name);

  const handleAddToCart = () => {
    if (!isAllSelected) return;
    addToCart(product, selectedSpecs, quantity);
    toggleSku();
  };

  return (
    <BottomSheet isOpen={isSkuOpen} onClose={toggleSku} title="选择规格">
      {/* 商品信息 */}
      <div className="flex gap-3 mb-5 pb-5 border-b border-[var(--color-border)]">
        <SafeImg
          src={product.images[0]}
          alt={product.title}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[var(--color-gold)] font-bold text-xl font-display">¥{product.price}</p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">库存充足</p>
          <AnimatePresence mode="popLayout">
            {Object.keys(selectedSpecs).length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-[var(--color-text-secondary)] mt-1"
              >
                已选: {Object.values(selectedSpecs).join(' / ')}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 规格选项 */}
      {product.specs.map((spec) => (
        <div key={spec.name} className="mb-5">
          <h4 className="text-sm font-medium mb-3 text-[var(--color-text-primary)]">{spec.name}</h4>
          <div className="flex flex-wrap gap-2">
            {spec.options.map((option) => {
              const isSelected = selectedSpecs[spec.name] === option;
              return (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => selectSpec(spec.name, option)}
                  className="relative px-4 py-2.5 rounded-full text-sm transition-colors"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))'
                      : 'var(--color-bg-card)',
                    color: isSelected ? 'var(--color-bg-deep)' : 'var(--color-text-primary)',
                    border: isSelected ? 'none' : '1px solid var(--color-border)',
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {option}
                  {/* 选中标记 */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--color-accent)', border: '2px solid var(--color-bg-elevated)' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {/* 数量选择 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-[var(--color-text-primary)]">数量</h4>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          >
            <MinusIcon size={16} color="var(--color-text-secondary)" />
          </motion.button>
          <motion.span
            key={quantity}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-10 text-center font-semibold text-[var(--color-text-primary)]"
          >
            {quantity}
          </motion.span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          >
            <PlusIcon size={16} color="var(--color-text-secondary)" />
          </motion.button>
        </div>
      </div>

      {/* 确定按钮 */}
      <motion.button
        whileTap={{ scale: isAllSelected ? 0.96 : 1 }}
        onClick={handleAddToCart}
        disabled={!isAllSelected}
        className="w-full py-3.5 rounded-full font-semibold transition-all"
        style={{
          background: isAllSelected
            ? 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))'
            : 'var(--color-bg-card)',
          color: isAllSelected ? 'var(--color-bg-deep)' : 'var(--color-text-tertiary)',
          boxShadow: isAllSelected ? '0 2px 16px rgba(201,169,110,0.3)' : 'none',
          border: isAllSelected ? 'none' : '1px solid var(--color-border)',
        }}
      >
        {isAllSelected ? '确定' : `请选择${missingSpecs.join('、')}`}
      </motion.button>
    </BottomSheet>
  );
}
