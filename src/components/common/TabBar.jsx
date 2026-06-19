import { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, CategoryIcon, CartIcon, UserIcon } from '../icons';
import useStore from '../../store/useStore';

const tabs = [
  { path: '/', icon: HomeIcon, label: '首页' },
  { path: '/category', icon: CategoryIcon, label: '分类' },
  { path: '/cart', icon: CartIcon, label: '购物车' },
  { path: '/user', icon: UserIcon, label: '我的' }
];

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useStore(state => state.cart.reduce((sum, i) => sum + i.quantity, 0));
  const cartIconRef = useRef(null);

  // 注册购物车图标位置给抛物线动画
  useEffect(() => {
    if (cartIconRef.current && window.__flyToCartRef) {
      window.__flyToCartRef.current = cartIconRef.current;
    }
  });

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[200]">
      <div className="glass border-t border-[var(--color-border)]">
        <div className="flex items-center justify-around py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
          {tabs.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            const isCart = label === '购物车';
            return (
              <motion.button
                key={path}
                onClick={() => navigate(path)}
                whileTap={{ scale: 0.85 }}
                className="flex flex-col items-center gap-0.5 px-5 py-1 relative"
              >
                <div className="relative" ref={isCart ? cartIconRef : undefined}>
                  <Icon
                    size={22}
                    color={active ? 'var(--color-gold)' : 'var(--color-text-tertiary)'}
                    filled={active}
                  />
                  {isCart && cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="badge-count absolute -top-1.5 -right-2.5"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
                <span
                  className="text-[10px] font-medium transition-colors duration-300"
                  style={{ color: active ? 'var(--color-gold)' : 'var(--color-text-tertiary)' }}
                >
                  {label}
                </span>
                {active && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute -bottom-0.5 w-5 h-0.5 rounded-full"
                    style={{ background: 'var(--color-gold)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
