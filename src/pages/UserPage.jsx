import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, CouponIcon, ChevronRightIcon } from '../components/icons';

const menuItems = [
  { icon: '💰', label: '待付款', count: 2 },
  { icon: '📦', label: '待发货', count: 0 },
  { icon: '🚚', label: '待收货', count: 1 },
  { icon: '⭐', label: '待评价', count: 3 },
  { icon: '🔄', label: '退换/售后', count: 0 }
];

const serviceItems = [
  { icon: <HeartIcon size={20} color="var(--color-text-secondary)" />, label: '我的收藏', path: '/' },
  { icon: <CouponIcon size={20} color="var(--color-text-secondary)" />, label: '优惠券', path: '/' },
  { icon: '📍', label: '收货地址', path: '/' },
  { icon: '💬', label: '客服中心', path: '/chat' },
  { icon: '⚙️', label: '设置', path: '/' }
];

export default function UserPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pb-20">
      {/* User Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dark)] via-[var(--color-bg-elevated)] to-[var(--color-bg-deep)]" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'var(--color-gold)', filter: 'blur(60px)' }} />

        <div className="relative px-6 pt-[max(2.5rem,env(safe-area-inset-top))] pb-8">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center overflow-hidden"
              style={{ background: 'var(--color-bg-card)' }}
            >
              <span className="text-3xl">👤</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">小辞</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="tag-gold text-[10px]">VIP会员</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Order Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card mx-5 -mt-4 p-5 relative z-10"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-medium text-[var(--color-text-primary)]">我的订单</h3>
          <button className="flex items-center gap-1 text-sm text-[var(--color-gold)]">
            全部订单 <ChevronRightIcon size={16} color="var(--color-gold)" />
          </button>
        </div>
        <div className="flex justify-around">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex flex-col items-center gap-2 relative"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">{item.label}</span>
              {item.count > 0 && (
                <span className="badge-count absolute -top-1 -right-2">{item.count}</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Service Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="card mx-5 mt-4 overflow-hidden"
      >
        {serviceItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => item.path && navigate(item.path)}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[var(--color-bg-hover)] transition-colors border-b border-[var(--color-border)] last:border-0"
          >
            <span className="text-xl flex items-center">
              {typeof item.icon === 'string' ? item.icon : item.icon}
            </span>
            <span className="flex-1 text-left text-sm text-[var(--color-text-primary)]">{item.label}</span>
            <ChevronRightIcon size={18} color="var(--color-text-tertiary)" />
          </motion.button>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div className="mx-5 mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: '🎁', label: '签到领红包' },
          { icon: '🏷️', label: '领券中心' }
        ].map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileTap={{ scale: 0.97 }}
            className="card p-5 text-center"
          >
            <span className="text-2xl block mb-2">{item.icon}</span>
            <span className="text-sm text-[var(--color-text-primary)]">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
