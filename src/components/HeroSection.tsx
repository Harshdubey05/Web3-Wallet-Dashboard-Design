import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="text-center mb-12 relative z-10"
    >
      <motion.h1
        className="text-slate-900 dark:text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Swap anytime,
        <br />
        anywhere.
      </motion.h1>
      <motion.p
        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Trade crypto and manage your staking positions across multiple networks
        <br />
        including Ethereum, Polygon, and more.
      </motion.p>
    </motion.div>
  );
}
