import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon } from '../components/icons';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20" style={{ background: 'var(--color-gold)', filter: 'blur(100px)' }} />

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8 relative"
        style={{ background: 'var(--color-gold-glow)', border: '2px solid var(--color-gold)' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <CheckIcon size={48} color="var(--color-gold)" />
        </motion.div>
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid var(--color-gold)' }}
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.5, 0, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-display font-semibold text-[var(--color-text-primary)] mb-2"
      >
        支付成功
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[var(--color-text-secondary)] mb-10 text-sm"
      >
        您的订单已提交成功
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/')}
          className="btn-outline-gold px-6 py-2.5 rounded-full text-sm"
        >
          继续购物
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/user')}
          className="btn-gold px-6 py-2.5 rounded-full text-sm"
        >
          查看订单
        </motion.button>
      </motion.div>
    </div>
  );
}
