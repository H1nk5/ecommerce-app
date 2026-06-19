// ═══════════════════════════════════════════════
// App — 路由 + 方向感知页面切换 + 12 视图状态管理
// ═══════════════════════════════════════════════
import { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PhoneMockup from './components/common/PhoneMockup';
import TabBar from './components/common/TabBar';
import PageTransition, { getTransitionMeta } from './components/common/PageTransition';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import UserPage from './pages/UserPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReviewsPage from './pages/ReviewsPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import GalleryPage from './pages/GalleryPage';
import ChatPage from './pages/ChatPage';

// 隐藏 TabBar 的路径
const HIDE_TAB_PATHS = ['/product/', '/reviews/', '/checkout', '/payment-success', '/gallery/', '/chat'];

function AppContent() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const [transitionMeta, setTransitionMeta] = useState({ type: 'slide', direction: 1 });

  useEffect(() => {
    const meta = getTransitionMeta(prevPathRef.current, location.pathname);
    setTransitionMeta(meta);
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  const hideTabBar = HIDE_TAB_PATHS.some(p => location.pathname.startsWith(p));

  return (
    <div className="relative h-full">
      <AnimatePresence mode="popLayout" initial={false}>
        <PageTransition key={location.pathname} transitionMeta={transitionMeta}>
          <Routes location={location}>
            {/* ═══ Level 1: 核心主干 (4 个 Tab) ═══ */}
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/user" element={<UserPage />} />

            {/* ═══ Level 2: 详情纵深 ═══ */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/reviews/:id" element={<ReviewsPage />} />

            {/* ═══ Level 3: 高阶交互 ═══ */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route path="/gallery/:id" element={<GalleryPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>

      {/* TabBar — Level 1 页面可见 */}
      {!hideTabBar && <TabBar />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PhoneMockup>
        <AppContent />
      </PhoneMockup>
    </BrowserRouter>
  );
}
