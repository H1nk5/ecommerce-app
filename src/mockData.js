// ═══════════════════════════════════════════════
// 单一数据源 — 所有商品信息从此处统一导出
// 图片使用 Picsum 高清稳定图源
// ═══════════════════════════════════════════════

// 优雅的灰色占位图（图片加载失败时兜底）
export const FALLBACK_IMG =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#222224"/>
      <rect x="160" y="160" width="80" height="80" rx="12" fill="#333336"/>
      <path d="M180 200l10-10 10 10M210 190l-10 10-10-10" stroke="#555" stroke-width="2" fill="none"/>
    </svg>`
  );

// 商品主图 — 使用 Picsum 按 ID 获取稳定高清图
const IMG = {
  airpods:   'https://picsum.photos/seed/airpods/800/800',
  iphone:    'https://picsum.photos/seed/iphone15/800/800',
  macbook:   'https://picsum.photos/seed/macbook/800/800',
  ipad:      'https://picsum.photos/seed/ipadpro/800/800',
  watch:     'https://picsum.photos/seed/applewatch/800/800',
  nike:      'https://picsum.photos/seed/nikeaf1/800/800',
  adidas:    'https://picsum.photos/seed/adidasub/800/800',
  sony:      'https://picsum.photos/seed/sonyxm5/800/800',
  dyson:     'https://picsum.photos/seed/dysonv15/800/800',
  lego:      'https://picsum.photos/seed/legolambo/800/800',
  skii:      'https://picsum.photos/seed/skiisk2/800/800',
  xiaomi:    'https://picsum.photos/seed/xiaomi14/800/800',
  // 详情页辅图（同商品不同角度）
  airpods2:  'https://picsum.photos/seed/airpods2/800/800',
  iphone2:   'https://picsum.photos/seed/iphone15b/800/800',
  macbook2:  'https://picsum.photos/seed/macbook2/800/800',
  nike2:     'https://picsum.photos/seed/nikeaf1b/800/800',
  sony2:     'https://picsum.photos/seed/sonyxm5b/800/800',
  ipad2:     'https://picsum.photos/seed/ipadpro2/800/800',
  dyson2:    'https://picsum.photos/seed/dysonv15b/800/800',
  lego2:     'https://picsum.photos/seed/legolambo2/800/800',
  skii2:     'https://picsum.photos/seed/skiisk2b/800/800',
  xiaomi2:   'https://picsum.photos/seed/xiaomi14b/800/800',
  adidas2:   'https://picsum.photos/seed/adidasubb/800/800',
  watch2:    'https://picsum.photos/seed/applewatch2/800/800',
  // 用户头像
  avatar1:   'https://picsum.photos/seed/avatar1/200/200',
  avatar2:   'https://picsum.photos/seed/avatar2/200/200',
  avatar3:   'https://picsum.photos/seed/avatar3/200/200',
  avatar4:   'https://picsum.photos/seed/avatar4/200/200',
  avatar5:   'https://picsum.photos/seed/avatar5/200/200',
};

// ─────────────────────────────────────────────
// 商品数据
// ─────────────────────────────────────────────
export const products = [
  {
    id: 1,
    title: 'Apple AirPods Pro (第二代) MagSafe充电盒 主动降噪无线蓝牙耳机',
    price: 1899,
    originalPrice: 2499,
    sales: 28600,
    rating: 4.9,
    reviewCount: 5280,
    images: [IMG.airpods, IMG.airpods2],
    specs: [
      { name: '颜色', options: ['白色', '午夜色'] },
      { name: '版本', options: ['标准版', 'MagSafe版'] },
    ],
    coupons: [
      { id: 1, amount: 100, condition: '满1000可用', expire: '2026-06-30' },
      { id: 2, amount: 50, condition: '满500可用', expire: '2026-06-25' },
    ],
    reviews: [
      { id: 1, user: '数码达人', avatar: IMG.avatar1, rating: 5, content: '降噪效果非常好，音质也很棒！通勤路上完全隔绝噪音，强烈推荐。', time: '2026-06-10', images: [] },
      { id: 2, user: '音乐爱好者', avatar: IMG.avatar2, rating: 5, content: '佩戴舒适，续航也不错，推荐购买！空间音频效果很沉浸。', time: '2026-06-08', images: [] },
      { id: 3, user: '上班族', avatar: IMG.avatar3, rating: 4, content: '通勤必备，降噪效果明显。就是长时间佩戴耳朵稍微有点胀。', time: '2026-06-05', images: [] },
    ],
    category: '数码',
    shop: { name: 'Apple官方旗舰店', rating: 4.9 },
  },
  {
    id: 2,
    title: 'iPhone 15 Pro Max 256GB 钛金属设计 A17Pro芯片',
    price: 9999,
    originalPrice: 10999,
    sales: 15200,
    rating: 4.8,
    reviewCount: 3200,
    images: [IMG.iphone, IMG.iphone2],
    specs: [
      { name: '颜色', options: ['原色钛金属', '蓝色钛金属', '白色钛金属', '黑色钛金属'] },
      { name: '存储', options: ['256GB', '512GB', '1TB'] },
    ],
    coupons: [
      { id: 3, amount: 500, condition: '满5000可用', expire: '2026-06-30' },
    ],
    reviews: [
      { id: 6, user: '果粉一号', avatar: IMG.avatar4, rating: 5, content: '钛金属手感真的不一样，轻了很多！A17Pro芯片玩游戏丝滑流畅。', time: '2026-06-12', images: [] },
      { id: 7, user: '摄影达人', avatar: IMG.avatar5, rating: 5, content: '4800万像素主摄太强了，拍出来的照片细节丰富，夜景也很清晰。', time: '2026-06-09', images: [] },
    ],
    category: '手机',
    shop: { name: 'Apple官方旗舰店', rating: 4.9 },
  },
  {
    id: 3,
    title: 'MacBook Pro 14英寸 M3 Pro芯片 18GB+512GB 深空黑色',
    price: 14999,
    originalPrice: 16999,
    sales: 8900,
    rating: 4.9,
    reviewCount: 2100,
    images: [IMG.macbook, IMG.macbook2],
    specs: [
      { name: '配置', options: ['M3 Pro', 'M3 Max'] },
      { name: '内存', options: ['18GB', '36GB'] },
    ],
    coupons: [],
    reviews: [
      { id: 8, user: '程序员老王', avatar: IMG.avatar1, rating: 5, content: '编译速度飞快，续航一整天没问题。深空黑颜值太高了！', time: '2026-06-11', images: [] },
    ],
    category: '电脑',
    shop: { name: 'Apple官方旗舰店', rating: 4.9 },
  },
  {
    id: 4,
    title: 'Nike Air Force 1 空军一号 经典白色低帮板鞋',
    price: 749,
    originalPrice: 899,
    sales: 56800,
    rating: 4.7,
    reviewCount: 12800,
    images: [IMG.nike, IMG.nike2],
    specs: [
      { name: '尺码', options: ['38', '39', '40', '41', '42', '43', '44'] },
      { name: '颜色', options: ['纯白', '黑白'] },
    ],
    coupons: [
      { id: 4, amount: 30, condition: '满300可用', expire: '2026-06-28' },
    ],
    reviews: [
      { id: 9, user: '潮流玩家', avatar: IMG.avatar2, rating: 5, content: '经典款永不过时，百搭！鞋底软硬适中，日常穿很舒服。', time: '2026-06-10', images: [] },
      { id: 10, user: '学生党', avatar: IMG.avatar3, rating: 4, content: '性价比很高，就是白色容易脏，需要勤打理。', time: '2026-06-07', images: [] },
    ],
    category: '鞋靴',
    shop: { name: 'Nike官方旗舰店', rating: 4.8 },
  },
  {
    id: 5,
    title: 'Sony WH-1000XM5 头戴式无线降噪耳机 黑色',
    price: 2699,
    originalPrice: 2999,
    sales: 18900,
    rating: 4.8,
    reviewCount: 4200,
    images: [IMG.sony, IMG.sony2],
    specs: [
      { name: '颜色', options: ['黑色', '银色', '午夜蓝'] },
    ],
    coupons: [
      { id: 5, amount: 200, condition: '满2000可用', expire: '2026-06-30' },
    ],
    reviews: [
      { id: 4, user: '耳机发烧友', avatar: IMG.avatar4, rating: 5, content: '降噪效果业界顶级，佩戴舒适度极佳！30小时续航太给力了。', time: '2026-06-12', images: [] },
    ],
    category: '数码',
    shop: { name: 'Sony官方旗舰店', rating: 4.8 },
  },
  {
    id: 6,
    title: 'iPad Pro 11英寸 M4芯片 256GB WiFi版',
    price: 8999,
    originalPrice: 9999,
    sales: 12300,
    rating: 4.9,
    reviewCount: 2800,
    images: [IMG.ipad, IMG.ipad2],
    specs: [
      { name: '颜色', options: ['银色', '深空灰'] },
      { name: '存储', options: ['256GB', '512GB', '1TB'] },
    ],
    coupons: [
      { id: 6, amount: 400, condition: '满5000可用', expire: '2026-06-30' },
    ],
    reviews: [
      { id: 11, user: '设计师小陈', avatar: IMG.avatar5, rating: 5, content: 'OLED屏幕色彩太棒了，画画修图首选！M4芯片性能溢出。', time: '2026-06-08', images: [] },
    ],
    category: '数码',
    shop: { name: 'Apple官方旗舰店', rating: 4.9 },
  },
  {
    id: 7,
    title: '戴森 V15 Detect 无绳吸尘器 激光探测灰尘',
    price: 4990,
    originalPrice: 5990,
    sales: 8700,
    rating: 4.7,
    reviewCount: 1900,
    images: [IMG.dyson, IMG.dyson2],
    specs: [
      { name: '型号', options: ['V15 Detect', 'V12 Detect'] },
    ],
    coupons: [
      { id: 7, amount: 300, condition: '满3000可用', expire: '2026-06-28' },
    ],
    reviews: [],
    category: '家电',
    shop: { name: 'Dyson官方旗舰店', rating: 4.8 },
  },
  {
    id: 8,
    title: 'LEGO 乐高 机械组 兰博基尼 Sián FKP 37',
    price: 2999,
    originalPrice: 3499,
    sales: 5600,
    rating: 4.9,
    reviewCount: 1200,
    images: [IMG.lego, IMG.lego2],
    specs: [
      { name: '系列', options: ['机械组', '城市组'] },
    ],
    coupons: [],
    reviews: [
      { id: 5, user: '乐高迷', avatar: IMG.avatar1, rating: 5, content: '做工精致，拼装体验很棒！成品摆在桌上太帅了。', time: '2026-06-11', images: [] },
    ],
    category: '玩具',
    shop: { name: 'LEGO官方旗舰店', rating: 4.9 },
  },
  {
    id: 9,
    title: 'SK-II 神仙水 230ml 护肤精华液',
    price: 1590,
    originalPrice: 1790,
    sales: 32100,
    rating: 4.8,
    reviewCount: 8900,
    images: [IMG.skii, IMG.skii2],
    specs: [
      { name: '容量', options: ['75ml', '160ml', '230ml'] },
    ],
    coupons: [
      { id: 8, amount: 100, condition: '满1000可用', expire: '2026-06-30' },
    ],
    reviews: [
      { id: 12, user: '护肤达人', avatar: IMG.avatar2, rating: 5, content: '坚持用了一个月，皮肤状态明显改善，毛孔细腻了很多。', time: '2026-06-09', images: [] },
    ],
    category: '美妆',
    shop: { name: 'SK-II官方旗舰店', rating: 4.9 },
  },
  {
    id: 10,
    title: '小米14 Ultra 骁龙8Gen3 徕卡光学镜头',
    price: 5999,
    originalPrice: 6499,
    sales: 21500,
    rating: 4.7,
    reviewCount: 5600,
    images: [IMG.xiaomi, IMG.xiaomi2],
    specs: [
      { name: '颜色', options: ['黑色', '白色', '蓝色'] },
      { name: '存储', options: ['256GB', '512GB', '1TB'] },
    ],
    coupons: [
      { id: 9, amount: 300, condition: '满3000可用', expire: '2026-06-28' },
    ],
    reviews: [
      { id: 13, user: '米粉老张', avatar: IMG.avatar3, rating: 5, content: '徕卡影像太强了，直出照片质感拉满。骁龙8Gen3性能也很顶。', time: '2026-06-10', images: [] },
    ],
    category: '手机',
    shop: { name: '小米官方旗舰店', rating: 4.8 },
  },
  {
    id: 11,
    title: 'Adidas Ultraboost Light 轻量跑鞋',
    price: 1099,
    originalPrice: 1299,
    sales: 28700,
    rating: 4.6,
    reviewCount: 6700,
    images: [IMG.adidas, IMG.adidas2],
    specs: [
      { name: '尺码', options: ['39', '40', '41', '42', '43', '44', '45'] },
      { name: '颜色', options: ['黑色', '白色', '灰色'] },
    ],
    coupons: [
      { id: 10, amount: 50, condition: '满500可用', expire: '2026-06-25' },
    ],
    reviews: [],
    category: '鞋靴',
    shop: { name: 'Adidas官方旗舰店', rating: 4.7 },
  },
  {
    id: 12,
    title: 'Apple Watch Ultra 2 钛金属表壳 49mm',
    price: 6499,
    originalPrice: 6999,
    sales: 9800,
    rating: 4.8,
    reviewCount: 2300,
    images: [IMG.watch, IMG.watch2],
    specs: [
      { name: '表带', options: ['高山回环', '野径回环', '海洋表带'] },
    ],
    coupons: [
      { id: 11, amount: 300, condition: '满3000可用', expire: '2026-06-30' },
    ],
    reviews: [],
    category: '数码',
    shop: { name: 'Apple官方旗舰店', rating: 4.9 },
  },
];

// ─────────────────────────────────────────────
// 分类数据
// ─────────────────────────────────────────────
export const categories = [
  { name: '手机', icon: '📱' },
  { name: '电脑', icon: '💻' },
  { name: '耳机', icon: '🎧' },
  { name: '手表', icon: '⌚' },
  { name: '鞋靴', icon: '👟' },
  { name: '服饰', icon: '👕' },
  { name: '美妆', icon: '💄' },
  { name: '食品', icon: '🍜' },
];

// ─────────────────────────────────────────────
// Banner 数据
// ─────────────────────────────────────────────
export const banners = [
  { id: 1, gradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]', text: '618 年中大促', sub: '全场低至5折', accent: 'var(--color-gold)' },
  { id: 2, gradient: 'from-[#2d1b2e] via-[#1a1a2e] to-[#0a0a0a]', text: '新品首发', sub: '限时体验价', accent: 'var(--color-accent)' },
  { id: 3, gradient: 'from-[#1a2e1a] via-[#0a1a0a] to-[#0a0a0a]', text: '限时秒杀', sub: '每日10点开抢', accent: '#4ade80' },
];

// ─────────────────────────────────────────────
// 聊天 Mock 数据
// ─────────────────────────────────────────────
export const mockMessages = [
  { id: 1, type: 'system', content: '欢迎咨询客服，请问有什么可以帮您？', time: '14:30' },
  { id: 2, type: 'user', content: '请问这个耳机支持降噪吗？', time: '14:31' },
  { id: 3, type: 'service', content: '亲，这款AirPods Pro支持主动降噪功能哦，降噪效果非常好~', time: '14:31' },
  { id: 4, type: 'user', content: '好的，续航怎么样？', time: '14:32' },
  { id: 5, type: 'service', content: '单次充电聆听时间最长可达6小时，搭配充电盒使用可达30小时呢！', time: '14:32' },
];
