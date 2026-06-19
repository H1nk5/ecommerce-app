import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackIcon, StarIcon, ImageIcon } from '../components/icons';
import SafeImg from '../components/SafeImg';
import useStore from '../store/useStore';

export default function ReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useStore(state => state.products);
  const product = products.find(p => p.id === Number(id));

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-[var(--color-border)] px-5 pt-safe pb-3">
        <div className="flex items-center justify-between">
          <motion.button onClick={() => navigate(-1)} whileTap={{ scale: 0.9 }} className="p-2 -ml-2">
            <BackIcon size={20} color="var(--color-text-primary)" />
          </motion.button>
          <h1 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">商品评价</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mx-5 mt-4 p-5"
      >
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold font-display text-[var(--color-gold)]">{product.rating}</div>
            <div className="text-xs text-[var(--color-text-tertiary)] mt-1">综合评分</div>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs w-6 text-[var(--color-text-secondary)]">{rating}星</span>
                <div className="flex-1 h-1.5 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: 'var(--color-gold)' }}
                  />
                </div>
                <span className="text-xs text-[var(--color-text-tertiary)] w-10">
                  {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="px-5 py-4 flex gap-2 overflow-x-auto">
        {['全部', '有图', '好评', '中评', '差评'].map((tab, index) => (
          <motion.button
            key={tab}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
              index === 0
                ? 'btn-gold'
                : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="px-5">
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="py-5 border-b border-[var(--color-border)] last:border-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <SafeImg src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{review.user}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} size={14} filled={i < review.rating} color="var(--color-gold)" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[var(--color-text-tertiary)]">{review.time}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {review.content}
              </p>
              {review.images.length > 0 && (
                <div className="flex gap-2">
                  {review.images.map((img, i) => (
                    <SafeImg
                      key={i}
                      src={img}
                      alt=""
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="py-16 text-center">
            <ImageIcon size={48} color="var(--color-text-tertiary)" className="mx-auto mb-4" />
            <p className="text-[var(--color-text-tertiary)]">暂无评价</p>
          </div>
        )}
      </div>
    </div>
  );
}
