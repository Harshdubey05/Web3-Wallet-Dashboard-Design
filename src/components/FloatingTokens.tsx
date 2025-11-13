import { motion } from 'motion/react';

const TOKENS = [
  { icon: '⟠', color: 'from-blue-400 to-blue-600', size: 'w-32 h-32', delay: 0, x: '10%', y: '15%' },
  { icon: '💵', color: 'from-green-400 to-green-600', size: 'w-24 h-24', delay: 1, x: '85%', y: '20%' },
  { icon: '₿', color: 'from-orange-400 to-orange-600', size: 'w-28 h-28', delay: 2, x: '90%', y: '70%' },
  { icon: '◈', color: 'from-purple-400 to-purple-600', size: 'w-20 h-20', delay: 1.5, x: '5%', y: '60%' },
  { icon: '₮', color: 'from-cyan-400 to-cyan-600', size: 'w-24 h-24', delay: 0.5, x: '80%', y: '45%' },
  { icon: '⟠', color: 'from-indigo-400 to-indigo-600', size: 'w-20 h-20', delay: 2.5, x: '15%', y: '80%' },
];

export function FloatingTokens() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {TOKENS.map((token, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: token.x,
            top: token.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            delay: token.delay,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className={`${token.size} rounded-full bg-gradient-to-br ${token.color} flex items-center justify-center relative`}
            style={{
              filter: 'blur(40px)',
            }}
          >
            <div className="absolute inset-0 rounded-full animate-pulse" 
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
