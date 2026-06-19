// ═══════════════════════════════════════════════
// 优惠券领取弹窗 — 领取成功弹跳动效
// ═══════════════════════════════════════════════
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomSheet from './common/BottomSheet';
import useStore from '../store/useStore';

export default function CouponSheet() {
  const { currentProduct: product, isCouponOpen, toggleCoupon } = useStore();
  const [claimed, setClaimed] = useState(new Set());

  if (!product) return null;

  const handleClaim = (couponId) => {
    setClaimed(prev => new Set([...prev, couponId]));
  };

  return (
    <BottomSheet isOpen={isCouponOpen} onClose={toggleCoupon} title="领取优惠券">
      <div className="space-y-3">
        {product.coupons.map((coupon, index) => {
          const isClaimed = claimed.has(coupon.id);
          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center rounded-xl overflow-hidden border border-[var(--color-border)]"
              style={{ background: 'var(--color-bg-card)' }}
            >
              {/* 金额 */}
              <div className="px-6 py-4 text-center border-r border-dashed border-[var(--color-border)]">
                <div className="text-[var(--color-gold)] font-bold text-2xl font-display">¥{coupon.amount}</div>
                <div className="text-xs text-[var(--color-text-tertiary)] mt-1">{coupon.condition}</div>
              </div>

              {/* 信息 */}
              <div className="flex-1 px-4 py-3">
                <p className="text-sm font-medium mb-1 text-[var(--color-text-primary)]">店铺优惠券</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">有效期至 {coupon.expire}</p>
              </div>

              {/* 领取按钮 */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => handleClaim(coupon.id)}
                className="mr-4 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: isClaimed
                    ? 'var(--color-bg-elevated)'
                    : 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                  color: isClaimed ? 'var(--color-text-tertiary)' : 'var(--color-bg-deep)',
                }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={isClaimed ? 'done' : 'claim'}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {isClaimed ? '已领取' : '领取'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--color-text-tertiary)] text-center mt-5">
        优惠券数量有限，先到先得
      </p>
    </BottomSheet>
  );
}
