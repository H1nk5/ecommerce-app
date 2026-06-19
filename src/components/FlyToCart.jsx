// ═══════════════════════════════════════════════
// 加购抛物线动画 — 商品微缩图沿抛物线坠入购物车图标
// ═══════════════════════════════════════════════
import { useEffect, useRef, useCallback } from 'react';
import useStore from '../store/useStore';

// 缓动函数（先快后慢，抛物线感）
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function FlyToCart() {
  const flyTrigger = useStore(state => state.flyTrigger);
  const clearFly = useStore(state => state.clearFly);
  const cartIconRef = useRef(null);
  const flyingRef = useRef(null);
  const rafRef = useRef(null);
  const triggeredRef = useRef(null);

  const animate = useCallback((startX, startY, image) => {
    // 查找购物车图标位置（TabBar 里的 CartIcon）
    const cartEl = cartIconRef.current;
    if (!cartEl) { clearFly(); return; }

    const cartRect = cartEl.getBoundingClientRect();
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    const duration = 550; // ms
    const startTime = performance.now();

    const fly = flyingRef.current;
    if (!fly) { clearFly(); return; }

    fly.style.display = 'block';
    fly.style.backgroundImage = `url(${image})`;

    const step = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const t = easeOutCubic(rawProgress);

      // 抛物线：X 线性插值，Y 走二次曲线弧度
      const x = startX + (endX - startX) * t;
      // 弧线：中点向上偏移 120px，两端为 0
      const arcOffset = -120 * Math.sin(Math.PI * t);
      const y = startY + (endY - startY) * t + arcOffset;
      // 缩放：1 → 0.2
      const scale = 1 - 0.8 * t;
      // 透明度：最后 20% 渐隐
      const opacity = rawProgress > 0.8 ? 1 - (rawProgress - 0.8) / 0.2 : 1;

      fly.style.transform = `translate(${x - 20}px, ${y - 20}px) scale(${scale})`;
      fly.style.opacity = opacity;

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // 到达购物车 → 弹性震动
        fly.style.display = 'none';
        if (cartEl) {
          cartEl.style.transition = 'transform 0.1s ease';
          cartEl.style.transform = 'scale(1.3)';
          setTimeout(() => {
            cartEl.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            cartEl.style.transform = 'scale(1)';
          }, 100);
        }
        clearFly();
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [clearFly]);

  // 监听触发
  useEffect(() => {
    if (!flyTrigger || flyTrigger._t === triggeredRef.current) return;
    triggeredRef.current = flyTrigger._t;

    // 延迟一帧确保 DOM 更新
    requestAnimationFrame(() => {
      animate(flyTrigger.x, flyTrigger.y, flyTrigger.image);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [flyTrigger, animate]);

  // 暴露 cartIconRef 给全局，TabBar 会注册它
  useEffect(() => {
    window.__flyToCartRef = cartIconRef;
    return () => { delete window.__flyToCartRef; };
  }, []);

  return (
    <>
      {/* 购物车目标位置标记（不可见，仅用于定位） */}
      <div
        ref={cartIconRef}
        data-fly-target="cart"
        className="pointer-events-none"
        style={{ position: 'fixed', bottom: 0, left: 0, width: 0, height: 0, opacity: 0 }}
      />

      {/* 飞行中的微缩商品图 */}
      <div
        ref={flyingRef}
        className="pointer-events-none"
        style={{
          position: 'fixed',
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          display: 'none',
          zIndex: 9998,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}
