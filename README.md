<div align="center">

# 🛒 E-Commerce App

**移动端电商应用 · React 19 + Tailwind CSS 4 + Framer Motion**

<br>

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<br>

手机模型展示 · 完整购物流程 · 方向感知页面切换动画

[功能特性](#功能特性) · [技术栈](#技术栈) · [快速启动](#快速启动) · [项目结构](#项目结构)

</div>

---

## 功能特性

| 页面 | 功能 |
|------|------|
| 🏠 **首页** | 轮播 Banner、商品推荐、快捷入口 |
| 📂 **分类** | 商品分类浏览 |
| 🛒 **购物车** | 加购、数量修改、SKU 选择、优惠券 |
| 👤 **个人中心** | 用户信息、订单管理 |
| 📦 **商品详情** | 图片画廊、规格选择、评价查看 |
| 💬 **客服聊天** | 即时对话界面 |
| 💳 **结算流程** | 确认订单 → 支付成功 |
| 🎨 **页面动画** | Framer Motion 方向感知切换 |

---

## 技术栈

| 技术 | 职责 |
|------|------|
| [React 19](https://react.dev/) | UI 框架 |
| [Vite 8](https://vitejs.dev/) | 构建工具 |
| [Tailwind CSS 4](https://tailwindcss.com/) | 原子化 CSS |
| [React Router 7](https://reactrouter.com/) | 路由管理 |
| [Framer Motion](https://www.framer.com/motion/) | 动画引擎 |
| [Zustand](https://zustand-demo.pmnd.rs/) | 状态管理 |

---

## 快速启动

```bash
git clone https://github.com/H1nk5/ecommerce-app.git
cd ecommerce-app
npm install
npm run dev
```

---

## 项目结构

```
ecommerce-app/
├── src/
│   ├── main.jsx                     # 入口
│   ├── App.jsx                      # 路由 + 页面切换动画
│   ├── mockData.js                  # 模拟数据
│   ├── pages/
│   │   ├── HomePage.jsx             # 首页
│   │   ├── CategoryPage.jsx         # 分类
│   │   ├── CartPage.jsx             # 购物车
│   │   ├── ProductDetailPage.jsx    # 商品详情
│   │   ├── CheckoutPage.jsx         # 结算
│   │   └── ChatPage.jsx             # 客服聊天
│   ├── components/
│   │   ├── common/
│   │   │   ├── PhoneMockup.jsx      # 手机模型容器
│   │   │   ├── TabBar.jsx           # 底部标签栏
│   │   │   └── PageTransition.jsx   # 页面切换动画
│   │   ├── SkuSheet.jsx             # SKU 选择弹窗
│   │   └── FlyToCart.jsx            # 飞入购物车动画
│   └── store/useStore.js            # Zustand 状态
└── dist/
```

---

## 开源许可

MIT © [H1nk5](https://github.com/H1nk5)
