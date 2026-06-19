import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhoneMockup({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [islandState, setIslandState] = useState('idle'); // idle | expanded | notification

  // 灵动岛：模拟偶尔的状态变化
  useEffect(() => {
    const cycle = () => {
      setIslandState('notification');
      setTimeout(() => setIslandState('expanded'), 600);
      setTimeout(() => setIslandState('idle'), 2600);
    };
    // 首次 5s 后触发一次，之后每 12s 循环
    const first = setTimeout(cycle, 5000);
    const interval = setInterval(cycle, 12000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 430);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 移动端直接渲染，不套壳
  if (isMobile) {
    return <div className="w-full h-screen overflow-hidden">{children}</div>;
  }

  // iPhone 15 Pro 精确尺寸: 393 × 852
  const W = 393;
  const H = 852;
  const R = 55;   // 外框圆角
  const r = 47;   // 屏幕圆角
  const BW = 12;  // 边框宽度

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0c] via-[#111114] to-[#0a0a0c] flex items-center justify-center p-8">
      {/* 外框 */}
      <div
        className="relative"
        style={{
          width: W + BW * 2,
          height: H + BW * 2,
          borderRadius: R,
          background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #0f0f12 100%)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.05),
            0 0 0 3px #1a1a1e,
            0 30px 80px rgba(0,0,0,0.7),
            0 0 100px rgba(201,169,110,0.03),
            inset 0 1px 0 rgba(255,255,255,0.06)
          `,
          padding: BW,
        }}
      >
        {/* ── 侧边按钮 ── */}
        {/* 静音键 */}
        <div className="absolute -left-[3px]" style={{ top: 160, width: 3, height: 28, background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)', borderRadius: '2px 0 0 2px' }} />
        {/* 音量+ */}
        <div className="absolute -left-[3px]" style={{ top: 210, width: 3, height: 52, background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)', borderRadius: '2px 0 0 2px' }} />
        {/* 音量- */}
        <div className="absolute -left-[3px]" style={{ top: 275, width: 3, height: 52, background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)', borderRadius: '2px 0 0 2px' }} />
        {/* 电源键 */}
        <div className="absolute -right-[3px]" style={{ top: 230, width: 3, height: 72, background: 'linear-gradient(180deg, #3a3a3e, #2a2a2e)', borderRadius: '0 2px 2px 0' }} />

        {/* ── 屏幕区域 ── */}
        <div
          className="w-full h-full overflow-hidden relative"
          style={{ borderRadius: r, background: '#000' }}
        >
          {/* 灵动岛 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[60]" style={{ top: 10 }}>
            <motion.div
              layout
              animate={{
                width: islandState === 'idle' ? 126 : islandState === 'notification' ? 140 : 200,
                height: islandState === 'idle' ? 37 : islandState === 'notification' ? 37 : 42,
                borderRadius: islandState === 'idle' ? 20 : 22,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative overflow-hidden"
              style={{ background: '#000' }}
            >
              {/* 摄像头圆点 */}
              <AnimatePresence>
                {islandState === 'idle' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-[26px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, #1a1a3a 30%, #0a0a1a 70%)',
                      boxShadow: '0 0 4px rgba(80,80,120,0.3)',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* 通知态：显示小图标 */}
              <AnimatePresence>
                {islandState === 'notification' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 展开态：显示播放控件 */}
              <AnimatePresence>
                {islandState === 'expanded' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center px-4 gap-3"
                  >
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#C9A96E] to-[#A68B4B]" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#C9A96E] font-medium truncate">正在播放</div>
                      <div className="text-[9px] text-[#666] truncate">Lofi Beats</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 border-l-2 border-t-2 border-[#888] rotate-[-45deg]" />
                      <div className="w-2.5 h-2.5 bg-[#888] rounded-sm" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* 顶部渐变遮罩（为灵动岛留空间） */}
          <div
            className="absolute top-0 left-0 right-0 z-50 pointer-events-none"
            style={{
              height: 54,
              background: 'linear-gradient(to bottom, #000 50%, transparent)',
              borderRadius: `${r}px ${r}px 0 0`,
            }}
          />

          {/* 内容区 */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#141414]">
            {children}
          </div>

          {/* 底部 Home Indicator */}
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div
              style={{
                width: 134,
                height: 5,
                background: 'rgba(255,255,255,0.18)',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>

      {/* 底部设备标注 */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
        <p className="text-gray-600 text-xs font-body tracking-wide">
          iPhone 15 Pro · 393 × 852
        </p>
      </div>
    </div>
  );
}
