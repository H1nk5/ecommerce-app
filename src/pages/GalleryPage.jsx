import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloseIcon } from '../components/icons';
import useStore from '../store/useStore';

export default function GalleryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useStore(state => state.products);
  const product = products.find(p => p.id === Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-bg-deep)] z-[400] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-safe pb-3">
        <motion.button onClick={() => navigate(-1)} whileTap={{ scale: 0.9 }} className="p-2">
          <CloseIcon size={24} color="var(--color-text-primary)" />
        </motion.button>
        <span className="text-sm text-[var(--color-text-secondary)] font-display">
          {currentIndex + 1} / {product.images.length}
        </span>
        <div className="w-10" />
      </div>

      {/* Images */}
      <div className="flex-1 flex items-center">
        <div
          className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onScroll={(e) => {
            const scrollLeft = e.target.scrollLeft;
            const width = e.target.offsetWidth;
            setCurrentIndex(Math.round(scrollLeft / width));
          }}
        >
          <div className="flex">
            {product.images.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-full snap-center">
                <motion.img
                  src={img}
                  alt=""
                  className="w-full aspect-square object-contain"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 pb-safe py-6">
        {product.images.map((_, index) => (
          <motion.div
            key={index}
            className="h-1.5 rounded-full transition-all duration-500"
            animate={{
              width: currentIndex === index ? 24 : 6,
              backgroundColor: currentIndex === index ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
