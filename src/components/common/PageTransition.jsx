// ═══════════════════════════════════════════════
// 页面切换动效 — Level 1 横向滑屏 + Level 2/3 纵向推入
// ═══════════════════════════════════════════════
import { motion } from 'framer-motion';

// Level 1 Tab 顺序（决定滑动方向）
const TAB_ORDER = ['/', '/category', '/cart', '/user'];

// 获取 Tab 索引，-1 表示非 Tab 页
const getTabIndex = (pathname) => {
  const idx = TAB_ORDER.findIndex(p => pathname === p || (p !== '/' && pathname.startsWith(p)));
  return idx;
};

// 根据路径判断动效类型
export function getTransitionMeta(fromPath, toPath) {
  const fromTab = getTabIndex(fromPath);
  const toTab = getTabIndex(toPath);

  // Level 1 Tab 间切换 → 横向滑动
  if (fromTab >= 0 && toTab >= 0) {
    return {
      type: 'slide',
      direction: toTab > fromTab ? 1 : -1,
    };
  }

  // 进入子页面 → 从右推入
  if (fromTab >= 0 && toTab < 0) {
    return { type: 'push', direction: 1 };
  }

  // 子页面返回 → 向右退出
  if (fromTab < 0 && toTab >= 0) {
    return { type: 'push', direction: -1 };
  }

  // 子页面间跳转 → 从右推入
  return { type: 'push', direction: 1 };
}

// 横向滑屏变体（Level 1 Tab）
const slideVariants = (direction) => ({
  initial: { x: `${direction * 100}%`, opacity: 0.6 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 350, damping: 35, mass: 0.8 } },
  exit: { x: `${direction * -40}%`, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
});

// 纵向推入变体（Level 2/3 子页面）
const pushVariants = (direction) => ({
  initial: { x: direction > 0 ? '80%' : '-80%', opacity: 0, scale: 0.96 },
  animate: { x: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } },
  exit: { x: direction > 0 ? '-30%' : '30%', opacity: 0, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } },
});

export default function PageTransition({ children, transitionMeta }) {
  const { type, direction } = transitionMeta;
  const variants = type === 'slide' ? slideVariants(direction) : pushVariants(direction);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
}
