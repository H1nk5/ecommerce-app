import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon } from '../components/icons';
import useStore from '../store/useStore';

const mainCategories = [
  { id: 1, name: '手机数码' },
  { id: 2, name: '电脑办公' },
  { id: 3, name: '家用电器' },
  { id: 4, name: '服饰鞋包' },
  { id: 5, name: '美妆护肤' },
  { id: 6, name: '食品饮料' },
  { id: 7, name: '家居家装' },
  { id: 8, name: '母婴玩具' },
  { id: 9, name: '运动户外' },
  { id: 10, name: '图书音像' }
];

const subCategories = {
  1: ['手机', '耳机', '平板', '智能手表', '充电器', '数据线', '手机壳', '音箱'],
  2: ['笔记本', '台式机', '显示器', '键盘鼠标', '打印机', 'U盘'],
  3: ['电视', '冰箱', '洗衣机', '空调', '微波炉', '吸尘器'],
  4: ['男装', '女装', '鞋靴', '箱包', '配饰'],
  5: ['面部护理', '彩妆', '香水', '美容仪器'],
  6: ['零食', '饮料', '生鲜', '粮油'],
  7: ['家具', '灯具', '家纺', '收纳'],
  8: ['奶粉', '纸尿裤', '玩具', '童装'],
  9: ['运动鞋', '运动服', '健身器材', '户外装备'],
  10: ['图书', '音乐', '影视', '教育']
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(1);
  const products = useStore(state => state.products);

  const filteredProducts = products.filter(p => {
    if (activeCategory === 1) return ['手机', '数码'].includes(p.category);
    if (activeCategory === 2) return p.category === '电脑';
    if (activeCategory === 4) return p.category === '鞋靴';
    return true;
  });

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Search Header */}
      <div className="glass border-b border-[var(--color-border)] px-5 pt-safe pb-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <SearchIcon size={16} color="var(--color-text-tertiary)" className="absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索商品"
              className="w-full h-10 pl-10 pr-4 bg-[var(--color-bg-card)] rounded-full text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none border border-[var(--color-border)] focus:border-[var(--color-gold)] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Categories */}
        <div className="w-24 overflow-y-auto" style={{ background: 'var(--color-bg-deep)' }}>
          {mainCategories.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full py-4 px-2 text-xs text-center transition-all ${
                activeCategory === cat.id
                  ? 'text-[var(--color-gold)] font-medium border-l-2 border-[var(--color-gold)]'
                  : 'text-[var(--color-text-secondary)]'
              }`}
              style={{
                background: activeCategory === cat.id ? 'var(--color-bg-primary)' : 'transparent'
              }}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Sub Categories */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {subCategories[activeCategory]?.map((sub, index) => (
              <motion.button
                key={sub}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors"
                style={{ background: 'var(--color-bg-card)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ background: 'var(--color-bg-elevated)' }}>
                  {['📱', '💻', '📺', '👕', '💄', '🍜', '🏠', '🧸', '⚽', '📚'][activeCategory - 1]}
                </div>
                <span className="text-xs text-[var(--color-text-primary)]">{sub}</span>
              </motion.button>
            ))}
          </div>

          {/* Recommended Products */}
          <h3 className="text-sm font-medium mb-4 text-[var(--color-text-primary)]">热门推荐</h3>
          <div className="space-y-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="card flex gap-3 p-3"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <h4 className="text-sm line-clamp-2 text-[var(--color-text-primary)]">{product.title}</h4>
                  <span className="text-[var(--color-gold)] font-semibold">¥{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
