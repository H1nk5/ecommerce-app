import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackIcon, ChevronRightIcon } from '../components/icons';
import useStore from '../store/useStore';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useStore(state => state.cart);
  const checkedItems = cart.filter(item => item.checked);
  const totalPrice = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [paymentMethod, setPaymentMethod] = useState('alipay');

  const handlePay = () => {
    navigate('/payment-success');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-[var(--color-border)] px-5 pt-safe pb-3">
        <div className="flex items-center justify-between">
          <motion.button onClick={() => navigate(-1)} whileTap={{ scale: 0.9 }} className="p-2 -ml-2">
            <BackIcon size={20} color="var(--color-text-primary)" />
          </motion.button>
          <h1 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">确认订单</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mx-5 mt-4 p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-[var(--color-gold-glow)] flex items-center justify-center">
          <span className="text-lg">📍</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-[var(--color-text-primary)]">小辞</span>
            <span className="text-sm text-[var(--color-text-tertiary)]">138****8888</span>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            北京市朝阳区建国路88号SOHO现代城A座1201室
          </p>
        </div>
        <ChevronRightIcon size={20} color="var(--color-text-tertiary)" />
      </motion.div>

      {/* Products */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="card mx-5 mt-4 p-4"
      >
        <h3 className="font-medium mb-4 text-[var(--color-text-primary)]">商品信息</h3>
        <div className="space-y-4">
          {checkedItems.map((item, index) => (
            <div key={index} className="flex gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="text-sm line-clamp-2 mb-2 text-[var(--color-text-primary)]">{item.title}</h4>
                <div className="flex gap-2 mb-2">
                  {Object.entries(item.specs).map(([key, value]) => (
                    <span key={key} className="text-xs bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
                      {value}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-gold)] font-semibold">¥{item.price}</span>
                  <span className="text-sm text-[var(--color-text-tertiary)]">x{item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Payment Options */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mx-5 mt-4 p-4"
      >
        <h3 className="font-medium mb-4 text-[var(--color-text-primary)]">支付方式</h3>
        <div className="space-y-3">
          {[
            { id: 'alipay', name: '支付宝', icon: '💳' },
            { id: 'wechat', name: '微信支付', icon: '💚' },
            { id: 'card', name: '银行卡支付', icon: '🏦' }
          ].map(method => (
            <motion.button
              key={method.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPaymentMethod(method.id)}
              className="w-full flex items-center gap-3 py-2"
            >
              <span className="text-xl">{method.icon}</span>
              <span className="flex-1 text-sm text-left text-[var(--color-text-primary)]">{method.name}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                paymentMethod === method.id
                  ? 'border-[var(--color-gold)]'
                  : 'border-[var(--color-text-tertiary)]'
              }`}>
                {paymentMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 rounded-full bg-[var(--color-gold)]"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card mx-5 mt-4 p-4"
      >
        <div className="space-y-3">
          {[
            { label: '商品金额', value: `¥${totalPrice.toFixed(2)}` },
            { label: '运费', value: '免运费', highlight: true },
            { label: '优惠', value: '-¥0.00' }
          ].map(item => (
            <div key={item.label} className="flex justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">{item.label}</span>
              <span className={item.highlight ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-primary)]'}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Pay Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] glass border-t border-[var(--color-border)] px-5 py-3 pb-safe">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-[var(--color-text-secondary)]">合计 </span>
            <span className="text-[var(--color-gold)] text-xl font-bold font-display">¥{totalPrice.toFixed(2)}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handlePay}
            className="btn-gold px-8 py-3 rounded-full font-medium"
          >
            提交订单
          </motion.button>
        </div>
      </div>
    </div>
  );
}
