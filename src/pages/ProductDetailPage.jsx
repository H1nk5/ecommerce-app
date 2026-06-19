// ═══════════════════════════════════════════════
// 商品详情页 — 高保真视觉排版
// ═══════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import SkuSheet from '../components/SkuSheet';
import CouponSheet from '../components/CouponSheet';
import SafeImg from '../components/SafeImg';
import FlyToCart from '../components/FlyToCart';
import {
  BackIcon, ShareIcon, HeartIcon, CartIcon, ServiceIcon,
  ChevronRightIcon, StarIcon, CouponIcon
} from '../components/icons';

// ── 限时特惠倒计时 Hook ──
function useCountdown(hours = 2, minutes = 36, seconds = 48) {
  const [time, setTime] = useState({ h: hours, m: minutes, s: seconds });
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

// ── 详情内容 Tabs ──
const DETAIL_TABS = [
  { key: 'overview', label: '商品' },
  { key: 'detail', label: '详情' },
  { key: 'reviews', label: '评价' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentProduct: product,
    setCurrentProduct,
    toggleSku,
    toggleCoupon,
    addToCart,
    triggerFly,
    selectedSpecs,
    quantity,
    toggleFavorite,
    isFavorite
  } = useStore();

  const [currentImage, setCurrentImage] = useState(0);
  const [navOpacity, setNavOpacity] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTabs, setShowTabs] = useState(false);
  const scrollRef = useRef(null);
  const overviewRef = useRef(null);
  const detailRef = useRef(null);
  const reviewsRef = useRef(null);
  const countdown = useCountdown();
  const addToCartBtnRef = useRef(null);

  const cartCount = useStore(state => state.cart.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    setCurrentProduct(Number(id));
  }, [id, setCurrentProduct]);

  // 滚动监听：导航栏透明度 + Tab 栏显隐 + 激活 Tab 切换
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollTop = scrollRef.current.scrollTop;
      setNavOpacity(Math.min(scrollTop / 250, 1));
      setShowTabs(scrollTop > 380);

      // 根据滚动位置切换激活 Tab
      const offset = scrollTop + 120;
      if (reviewsRef.current && offset >= reviewsRef.current.offsetTop) {
        setActiveTab('reviews');
      } else if (detailRef.current && offset >= detailRef.current.offsetTop) {
        setActiveTab('detail');
      } else {
        setActiveTab('overview');
      }
    };
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Tab 点击滚动
  const scrollToSection = useCallback((key) => {
    const refs = { overview: overviewRef, detail: detailRef, reviews: reviewsRef };
    const ref = refs[key];
    if (ref.current && scrollRef.current) {
      const top = ref.current.offsetTop - 90;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  if (!product) return null;

  const isFav = isFavorite(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const pad = (n) => String(n).padStart(2, '0');

  const handleAddToCart = () => {
    if (Object.keys(selectedSpecs).length < product.specs.length) {
      toggleSku();
      return;
    }
    addToCart(product, selectedSpecs, quantity);
    // 触发抛物线飞入动画
    if (addToCartBtnRef.current) {
      const rect = addToCartBtnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      triggerFly(centerX, centerY, product.images[0]);
    }
  };

  const handleBuyNow = () => {
    if (Object.keys(selectedSpecs).length < product.specs.length) {
      toggleSku();
      return;
    }
    addToCart(product, selectedSpecs, quantity);
    navigate('/checkout');
  };

  return (
    <div className="relative bg-[var(--color-bg-primary)]">
      {/* ═══ 顶部导航栏（渐变透明 → 实色） ═══ */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] px-4 pt-safe transition-all duration-500"
        style={{
          backgroundColor: `rgba(20, 20, 20, ${navOpacity * 0.97})`,
          backdropFilter: navOpacity > 0.3 ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: navOpacity > 0.5 ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          paddingBottom: navOpacity > 0.5 ? 8 : 12,
        }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => navigate(-1)}
            whileTap={{ scale: 0.85 }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: navOpacity > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <BackIcon size={18} color="#F5F0E8" />
          </motion.button>

          <AnimatePresence>
            {navOpacity > 0.5 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex-1 mx-4 overflow-hidden"
              >
                {/* 吸顶后显示内容 Tabs */}
                {showTabs && (
                  <div className="flex items-center justify-center gap-6">
                    {DETAIL_TABS.map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => scrollToSection(tab.key)}
                        className="relative py-1 text-sm transition-colors"
                        style={{
                          color: activeTab === tab.key ? 'var(--color-gold)' : 'var(--color-text-tertiary)',
                          fontWeight: activeTab === tab.key ? 600 : 400,
                        }}
                      >
                        {tab.label}
                        {activeTab === tab.key && (
                          <motion.div
                            layoutId="detailTabLine"
                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                            style={{ background: 'var(--color-gold)' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
                {!showTabs && (
                  <h1 className="text-sm font-medium text-center truncate text-[var(--color-text-primary)]">
                    {product.title}
                  </h1>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: navOpacity > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ShareIcon size={18} color="#F5F0E8" />
          </motion.button>
        </div>
      </div>

      {/* ═══ 可滚动内容 ═══ */}
      <div ref={scrollRef} className="h-screen overflow-y-auto pb-28">
        {/* ── 商品主图轮播 ── */}
        <div ref={overviewRef} className="relative bg-[var(--color-bg-deep)]">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            onScroll={(e) => {
              const scrollLeft = e.target.scrollLeft;
              const width = e.target.offsetWidth;
              setCurrentImage(Math.round(scrollLeft / width));
            }}
          >
            {product.images.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-full snap-center relative">
                <SafeImg
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full aspect-square object-cover"
                />
                {/* 底部渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-transparent to-transparent opacity-50" />
              </div>
            ))}
          </div>

          {/* 轮播指示器 */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {product.images.map((_, index) => (
              <motion.div
                key={index}
                className="h-1 rounded-full"
                animate={{
                  width: currentImage === index ? 24 : 6,
                  backgroundColor: currentImage === index ? 'var(--color-gold)' : 'rgba(255,255,255,0.25)',
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* 图片计数器 */}
          <div
            className="absolute bottom-5 right-5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {currentImage + 1}/{product.images.length}
          </div>
        </div>

        {/* ── 限时特惠横幅 ── */}
        <div
          className="mx-4 mt-3 rounded-xl overflow-hidden flex items-center"
          style={{
            background: 'linear-gradient(135deg, #E85D4A 0%, #C9A96E 100%)',
            padding: '10px 16px',
          }}
        >
          <div className="flex items-center gap-2 flex-1">
            <span className="text-white text-xs font-bold tracking-wider">限时特惠</span>
            <div className="flex items-center gap-1 ml-2">
              {[countdown.h, countdown.m, countdown.s].map((v, i) => (
                <span key={i} className="flex items-center">
                  <span
                    className="text-[11px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: 'rgba(0,0,0,0.25)', color: '#fff' }}
                  >
                    {pad(v)}
                  </span>
                  {i < 2 && <span className="text-white/60 text-[10px] mx-0.5">:</span>}
                </span>
              ))}
            </div>
          </div>
          <span className="text-white/70 text-xs">距结束</span>
        </div>

        {/* ── 价格区块 ── */}
        <div className="px-5 pt-4 pb-3">
          {/* 价格行 */}
          <div className="flex items-baseline gap-3 mb-2">
            <div className="flex items-baseline">
              <span className="text-sm text-[var(--color-gold)] mr-0.5 font-medium">¥</span>
              <span className="text-[34px] font-bold text-[var(--color-gold)] font-display tracking-tight leading-none">
                {product.price}
              </span>
            </div>
            <span className="text-sm text-[var(--color-text-tertiary)] line-through">
              ¥{product.originalPrice}
            </span>
            <span className="tag-gold">{discount}% OFF</span>
          </div>

          {/* 促销标签行 */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {['618大促', '跨店满减', '包邮'].map(tag => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: 'rgba(201,169,110,0.3)',
                  color: 'var(--color-gold)',
                  background: 'rgba(201,169,110,0.06)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 标题 */}
          <h1 className="text-[17px] font-semibold leading-snug text-[var(--color-text-primary)] mb-3">
            <span
              className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mr-1.5 align-middle"
              style={{ background: 'var(--color-gold)', color: 'var(--color-bg-deep)' }}
            >
              {product.category}
            </span>
            {product.title}
          </h1>

          {/* 销量 & 评分 */}
          <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
            <span>{product.sales > 10000 ? `${(product.sales / 10000).toFixed(1)}万+` : product.sales} 已售</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-tertiary)]" />
            <span>{product.rating}% 好评</span>
          </div>
        </div>

        <div className="divider mx-5" />

        {/* ── 优惠券 ── */}
        {product.coupons.length > 0 && (
          <>
            <motion.button
              onClick={toggleCoupon}
              whileTap={{ scale: 0.98 }}
              className="w-full px-5 py-3.5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CouponIcon size={16} color="var(--color-gold)" />
                <span className="text-sm font-medium text-[var(--color-text-primary)]">优惠券</span>
              </div>
              <div className="flex items-center gap-2">
                {product.coupons.map(coupon => (
                  <span key={coupon.id} className="tag-gold">
                    满{coupon.condition.replace('满', '').replace('可用', '')}减{coupon.amount}
                  </span>
                ))}
                <ChevronRightIcon size={16} color="var(--color-text-tertiary)" />
              </div>
            </motion.button>
            <div className="divider mx-5" />
          </>
        )}

        {/* ── 规格选择 ── */}
        <motion.button
          onClick={toggleSku}
          whileTap={{ scale: 0.98 }}
          className="w-full px-5 py-3.5 flex items-center justify-between"
        >
          <span className="text-sm font-medium text-[var(--color-text-primary)]">选择</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--color-text-secondary)]">
              {Object.keys(selectedSpecs).length > 0
                ? Object.values(selectedSpecs).join(' / ')
                : product.specs.map(s => s.name).join(' · ')}
            </span>
            <ChevronRightIcon size={16} color="var(--color-text-tertiary)" />
          </div>
        </motion.button>

        <div className="h-2 bg-[var(--color-bg-deep)]" />

        {/* ── 店铺信息 ── */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--color-gold-glow)', border: '1px solid rgba(201,169,110,0.2)' }}
            >
              <span className="text-xl">🏪</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{product.shop.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StarIcon size={12} color="var(--color-gold)" />
                <span className="text-xs text-[var(--color-text-secondary)]">{product.shop.rating}分</span>
                <span className="text-[10px] text-[var(--color-text-tertiary)]">· 品牌直营</span>
              </div>
            </div>
          </div>
          <button className="btn-outline-gold px-4 py-1.5 rounded-full text-xs">
            进入店铺
          </button>
        </div>

        <div className="h-2 bg-[var(--color-bg-deep)]" />

        {/* ── 评价摘要 ── */}
        <div ref={reviewsRef} className="px-5 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
              评价 <span className="text-[var(--color-text-tertiary)] font-normal">({product.reviewCount})</span>
            </h3>
            <button
              onClick={() => navigate(`/reviews/${product.id}`)}
              className="flex items-center gap-1 text-sm text-[var(--color-gold)]"
            >
              查看全部 <ChevronRightIcon size={14} color="var(--color-gold)" />
            </button>
          </div>

          {product.reviews.length > 0 ? (
            <>
              {/* 评分概览 */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl mb-4"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold font-display text-[var(--color-gold)] leading-none">
                    {product.rating}
                  </div>
                  <div className="text-[10px] text-[var(--color-text-tertiary)] mt-1">综合评分</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3].map(rating => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-[10px] w-4 text-right text-[var(--color-text-tertiary)]">{rating}</span>
                      <div className="flex-1 h-1 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${rating === 5 ? 78 : rating === 4 ? 17 : 5}%` }}
                          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: 'var(--color-gold)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 评价卡片 */}
              <div className="space-y-3">
                {product.reviews.slice(0, 2).map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-[var(--color-border)]"
                    style={{ background: 'var(--color-bg-card)' }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <SafeImg
                        src={review.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">{review.user}</span>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} size={11} filled={i < review.rating} color="var(--color-gold)" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-[var(--color-text-tertiary)]">{review.time}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{review.content}</p>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <span className="text-3xl block mb-3">💬</span>
              <p className="text-sm text-[var(--color-text-tertiary)]">暂无评价，购买后来抢沙发</p>
            </div>
          )}
        </div>

        <div className="h-2 bg-[var(--color-bg-deep)]" />

        {/* ── 图文详情 ── */}
        <div ref={detailRef} className="px-5 py-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-[var(--color-gold)]" />
            图文详情
          </h3>
          <div className="space-y-4">
            {/* 商品卖点卡片 */}
            {[
              { icon: '⚡', title: '强劲性能', desc: '搭载最新芯片，流畅体验' },
              { icon: '🎨', title: '精致工艺', desc: '高端材质，匠心打磨每一处细节' },
              { icon: '🛡️', title: '品质保障', desc: '官方正品，全国联保' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)]"
                style={{ background: 'var(--color-bg-card)' }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">{item.title}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* 详情图占位 */}
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-[var(--color-border)]"
                style={{ background: 'var(--color-bg-card)' }}
              >
                <div className="aspect-[16/10] flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl block mb-2">
                      {['📐', '🔍', '📊'][i - 1]}
                    </span>
                    <span className="text-xs text-[var(--color-text-tertiary)]">
                      {['产品结构图', '细节特写', '参数对比'][i - 1]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 购物保障 */}
          <div className="mt-6 flex items-center justify-center gap-5">
            {['正品保证', '7天退换', '顺丰包邮'].map(text => (
              <div key={text} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                <span className="text-[11px] text-[var(--color-text-tertiary)]">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 底部留白 */}
        <div className="h-8" />
      </div>

      {/* ═══ 底部悬浮操作栏 ═══ */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100]">
        <div className="glass border-t border-[var(--color-border)]">
          <div className="flex items-center px-4 py-2.5 pb-safe">
            {/* 快捷操作 */}
            <div className="flex items-center gap-5 mr-4">
              {[
                { icon: ServiceIcon, label: '客服', action: () => navigate('/chat') },
                { icon: HeartIcon, label: '收藏', action: () => toggleFavorite(product.id), filled: isFav },
                { icon: CartIcon, label: '购物车', action: () => navigate('/cart'), badge: cartCount },
              ].map(({ icon: Icon, label, action, filled, badge }) => (
                <motion.button
                  key={label}
                  onClick={action}
                  whileTap={{ scale: 0.82 }}
                  className="flex flex-col items-center gap-0.5 relative"
                >
                  <Icon
                    size={22}
                    color={filled ? 'var(--color-gold)' : 'var(--color-text-secondary)'}
                    filled={filled}
                  />
                  <span className="text-[10px] text-[var(--color-text-tertiary)]">{label}</span>
                  {badge > 0 && (
                    <span className="badge-count absolute -top-1.5 -right-2.5">{badge}</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* 主按钮 */}
            <div className="flex-1 flex gap-2">
              <motion.button
                ref={addToCartBtnRef}
                whileTap={{ scale: 0.94 }}
                onClick={handleAddToCart}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                  color: 'var(--color-bg-deep)',
                  boxShadow: '0 2px 12px rgba(201,169,110,0.25)',
                }}
              >
                加入购物车
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #E85D4A, #d4443a)',
                  color: '#fff',
                  boxShadow: '0 2px 12px rgba(232,93,74,0.25)',
                }}
              >
                立即购买
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* SKU 弹窗 */}
      <SkuSheet />

      {/* 优惠券弹窗 */}
      <CouponSheet />

      {/* 抛物线飞入购物车动画 */}
      <FlyToCart />
    </div>
  );
}
