import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackIcon } from '../components/icons';
import { mockMessages } from '../mockData';

const quickReplies = ['发货时间', '退换货政策', '发票问题', '优惠活动'];

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'service',
        content: '好的，已为您记录，稍后会有专人回复您~',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="glass border-b border-[var(--color-border)] px-5 pt-safe pb-3">
        <div className="flex items-center justify-between">
          <motion.button onClick={() => navigate(-1)} whileTap={{ scale: 0.9 }} className="p-2 -ml-2">
            <BackIcon size={20} color="var(--color-text-primary)" />
          </motion.button>
          <h1 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">在线客服</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.type === 'service' && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0" style={{ background: 'var(--color-gold-glow)', border: '1px solid var(--color-gold)' }}>
                <span className="text-[var(--color-gold)] text-xs font-semibold">客</span>
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                msg.type === 'user'
                  ? 'rounded-br-md'
                  : 'rounded-bl-md'
              }`}
              style={{
                background: msg.type === 'user' ? 'var(--color-gold)' : 'var(--color-bg-card)',
                color: msg.type === 'user' ? 'var(--color-bg-deep)' : 'var(--color-text-primary)',
                border: msg.type !== 'user' ? '1px solid var(--color-border)' : 'none'
              }}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="px-5 py-3 flex gap-2 overflow-x-auto border-t border-[var(--color-border)]">
        {quickReplies.map(reply => (
          <motion.button
            key={reply}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInput(reply)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
          >
            {reply}
          </motion.button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="glass border-t border-[var(--color-border)] px-5 py-3 pb-safe">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..."
            className="flex-1 h-10 px-4 bg-[var(--color-bg-card)] rounded-full text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] outline-none border border-[var(--color-border)] focus:border-[var(--color-gold)] transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{
              background: input.trim() ? 'var(--color-gold)' : 'var(--color-bg-card)',
              opacity: input.trim() ? 1 : 0.5
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke={input.trim() ? 'var(--color-bg-deep)' : 'var(--color-text-tertiary)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
