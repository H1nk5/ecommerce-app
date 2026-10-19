import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon, CouponIcon } from '../components/icons';
import useStore from '../store/useStore';

const categories = [
  { name: '手机', icon: '📱' },
  { name: '电脑', icon: '💻' },
  { name: '耳机', icon: '🎧' },
  { name: '手表', icon: '⌚' },
  { name: '鞋靴', icon: '👟' },
  { name: '服饰', icon: '👕' },
  { name: '美妆', icon: '💄' },
  { name: '食品', icon: '🍜' }
];

const banners = [
  { id: 1, gradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]', text: '618 年中大促', sub: '全场低至5折', accent: 'var(--color-gold)' },
  { id: 2, gradient: 'from-[#2d1b2e] via-[#1a1a2e] to-[#0a0a0a]', text: '新品首发', sub: '限时体验价', accent: 'var(--color-accent)' },
  { id: 3, gradient: 'from-[#1a2e1a] via-[#0a1a0a] to-[#0a0a0a]', text: '限时秒杀', sub: '每日10点开抢', accent: '#4ade80' }
];

export default function HomePage() {
  const navigate = useNavigate();
  const products = useStore(state => state.products);
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerRef = useRef(null);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 滚动到当前 banner
  useEffect(() => {
    if (bannerRef.current) {
      const container = bannerRef.current;
      const items = container.children;
      if (items[currentBanner]) {
        const targetScroll = items[currentBanner].offsetLeft - container.offsetLeft;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  }, [currentBanner]);

  return (
    <div className="pb-20 bg-[var(--color-bg-primary)]">
      {/* ═══ Header ═══ */}
      <div className="sticky top-0 z-50 glass border-b border-[var(--color-border)] px-5 pt-safe pb-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <SearchIcon size={16} color="var(--color-text-tertiary)" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索商品"
              className="w-full h-10 pl-10 pr-4 bg-[var(--color-bg-card)] rounded-full text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none border border-[var(--color-border)] focus:border-[var(--color-gold)] transition-colors"
            />
          </div>
          <motion.button whileTap={{ scale: 0.9 }} className="p-2">
            <CouponIcon size={22} color="var(--color-gold)" />
          </motion.button>
        </div>
      </div>

      {/* ═══ Banner Carousel (自动轮播) ═══ */}
      <div className="px-5 pt-5 pb-2 relative">
        <div
          ref={bannerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          onScroll={(e) => {
            const scrollLeft = e.target.scrollLeft;
            const width = e.target.offsetWidth;
            setCurrentBanner(Math.round(scrollLeft / (width - 20)));
          }}
        >
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`flex-shrink-0 w-[calc(100%-20px)] snap-center h-44 rounded-2xl bg-gradient-to-br ${banner.gradient} relative overflow-hidden`}
            >
              {/* 装饰光效 */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: banner.accent, filter: 'blur(40px)' }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-5" style={{ background: banner.accent, filter: 'blur(30px)' }} />

              <div className="relative z-10 h-full flex flex-col justify-center px-6">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="text-2xl font-display font-bold text-[var(--color-text-primary)] mb-1"
                >
                  {banner.text}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="text-sm text-[var(--color-text-secondary)]"
                >
                  {banner.sub}
                </motion.span>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  className="mt-4 px-5 py-2 rounded-full text-xs font-semibold self-start"
                  style={{ background: banner.accent, color: 'var(--color-bg-deep)' }}
                >
                  立即查看
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 轮播指示器 */}
        <div className="flex justify-center gap-2 mt-3">
          {banners.map((_, index) => (
            <motion.div
              key={index}
              className="h-1.5 rounded-full cursor-pointer"
              animate={{
                width: currentBanner === index ? 20 : 6,
                backgroundColor: currentBanner === index ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)'
              }}
              transition={{ duration: 0.3 }}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* ═══ Categories ═══ */}
      <div className="mx-5 mt-4 p-5 bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border)]">
        <div className="grid grid-cols-4 gap-y-5">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/category')}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ═══ Section Header ═══ */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">为你推荐</h2>
          <div className="w-8 h-0.5 bg-[var(--color-gold)] mt-1.5 rounded-full" />
        </div>
        <button className="text-sm text-[var(--color-text-tertiary)]">查看更多</button>
      </div>

      {/* ═══ Product Grid ═══ */}
      <div className="px-5 grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="card overflow-hidden"
          >
            <div className="aspect-square bg-[var(--color-bg-elevated)] relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* 折扣标签 */}
              <div className="absolute top-2 left-2 tag-gold">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            </div>
            <div className="p-3.5">
              <h3 className="text-sm line-clamp-2 mb-2.5 text-[var(--color-text-primary)] leading-relaxed">{product.title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-[var(--color-gold)] font-semibold text-base">¥{product.price}</span>
                <span className="text-xs text-[var(--color-text-tertiary)] line-through">¥{product.originalPrice}</span>
              </div>
              <div className="text-xs text-[var(--color-text-tertiary)] mt-1.5">
                {product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万+` : product.sales} 已售
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
