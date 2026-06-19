# 🛒 E-Commerce App

移动端电商应用 UI，使用手机模型展示，包含完整的购物流程和流畅的页面切换动画。

## ✨ 功能特性

- 🏠 **首页** — 轮播 Banner、商品推荐、快捷入口
- 📂 **分类** — 商品分类浏览
- 🛒 **购物车** — 加购、数量修改、SKU 选择、优惠券
- 👤 **个人中心** — 用户信息、订单管理
- 📦 **商品详情** — 图片画廊、规格选择、评价查看
- 💬 **客服聊天** — 即时对话界面
- 💳 **结算流程** — 确认订单 → 支付成功
- 🎨 **页面动画** — Framer Motion 驱动的方向感知切换动画

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| [React 19](https://react.dev/) | UI 框架 |
| [Vite 8](https://vitejs.dev/) | 构建工具 |
| [Tailwind CSS 4](https://tailwindcss.com/) | 原子化 CSS |
| [React Router 7](https://reactrouter.com/) | 路由管理 |
| [Framer Motion](https://www.framer.com/motion/) | 动画库 |
| [Zustand](https://zustand-demo.pmnd.rs/) | 状态管理 |

## 📦 安装与运行

```bash
# 克隆项目
git clone https://github.com/H1nk5/ecommerce-app.git
cd ecommerce-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
ecommerce-app/
├── index.html
├── vite.config.js
├── eslint.config.js
├── src/
│   ├── main.jsx              # 入口
│   ├── App.jsx               # 路由 + 页面切换动画
│   ├── mockData.js           # 模拟数据
│   ├── pages/
│   │   ├── HomePage.jsx      # 首页
│   │   ├── CategoryPage.jsx  # 分类
│   │   ├── CartPage.jsx      # 购物车
│   │   ├── UserPage.jsx      # 个人中心
│   │   ├── ProductDetailPage.jsx  # 商品详情
│   │   ├── ReviewsPage.jsx   # 评价页
│   │   ├── CheckoutPage.jsx  # 结算页
│   │   ├── PaymentSuccessPage.jsx # 支付成功
│   │   ├── GalleryPage.jsx   # 图片画廊
│   │   └── ChatPage.jsx      # 客服聊天
│   ├── components/
│   │   ├── common/
│   │   │   ├── PhoneMockup.jsx    # 手机模型容器
│   │   │   ├── TabBar.jsx         # 底部标签栏
│   │   │   ├── PageTransition.jsx # 页面切换动画
│   │   │   └── BottomSheet.jsx    # 底部弹窗
│   │   ├── SkuSheet.jsx      # SKU 选择弹窗
│   │   ├── CouponSheet.jsx   # 优惠券弹窗
│   │   ├── FlyToCart.jsx     # 飞入购物车动画
│   │   └── SafeImg.jsx       # 安全图片组件
│   ├── store/
│   │   └── useStore.js       # Zustand 状态管理
│   └── assets/               # 静态资源
└── dist/                     # 构建输出
```

## 📄 License

MIT
