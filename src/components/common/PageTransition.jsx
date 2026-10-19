// ═══════════════════════════════════════════════
// 页面切换动效 — Level 1 横向滑屏 + Level 2/3 纵向推入
// ═══════════════════════════════════════════════
import { motion } from 'framer-motion';

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
