// ═══════════════════════════════════════════════
// BottomSheet — 物理阻尼半屏弹窗
// 支持拖拽关闭、Spring 动画、AnimatePresence 退出
// ═══════════════════════════════════════════════
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { CloseIcon } from '../icons';

export default function BottomSheet({ isOpen, onClose, title, children }) {
  const [dragY, setDragY] = useState(0);
  const sheetRef = useRef(null);

  const handleDragEnd = (_, info) => {
    // 向下拖拽超过 120px 或速度 > 500 → 关闭
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose();
    }
    setDragY(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300]">
          {/* 遮罩层 — 渐显 + 点击关闭 */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            onClick={onClose}
          />

          {/* 弹窗主体 */}
          <motion.div
            ref={sheetRef}
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-hidden flex flex-col"
            style={{
              background: 'var(--color-bg-elevated)',
              borderRadius: '20px 20px 0 0',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{
              y: '100%',
              transition: {
                type: 'spring',
                stiffness: 350,
                damping: 35,
                mass: 0.8,
              },
            }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 28,
              mass: 0.8,
            }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {/* 拖拽手柄 */}
            <div
              className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                // 允许从手柄区域开始拖拽
                sheetRef.current?.setPointerCapture(e.pointerId);
              }}
            >
              <motion.div
                className="w-10 h-1 rounded-full"
                style={{ background: 'var(--color-text-tertiary)', opacity: 0.3 }}
                whileHover={{ opacity: 0.5, width: 48 }}
              />
            </div>

            {/* 标题栏 */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)]">
              <h3 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">
                {title}
              </h3>
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.85, rotate: 90 }}
                className="p-2 -mr-2 rounded-full"
                style={{ background: 'var(--color-bg-card)' }}
              >
                <CloseIcon size={18} color="var(--color-text-secondary)" />
              </motion.button>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
