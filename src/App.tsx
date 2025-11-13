import { useState } from 'react';
import { Header } from './components/Header';
import { TokenSwap } from './components/TokenSwap';
import { StakingStats } from './components/StakingStats';
import { FloatingThemeToggle } from './components/FloatingThemeToggle';
import { FloatingTokens } from './components/FloatingTokens';
import { HeroSection } from './components/HeroSection';
import { motion } from 'motion/react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-purple-950 transition-colors duration-500 relative overflow-hidden">
        {/* Floating animated tokens background */}
        <FloatingTokens />
        
        {/* Gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 dark:from-purple-900/20 dark:via-transparent dark:to-blue-900/20 pointer-events-none z-0" />
        
        <div className="relative z-10">
          <Header 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isWalletConnected={isWalletConnected}
            setIsWalletConnected={setIsWalletConnected}
          />
          
          <main className="container mx-auto px-4 py-12 max-w-7xl">
            <HeroSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <TokenSwap isWalletConnected={isWalletConnected} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="lg:row-span-2"
              >
                <StakingStats isWalletConnected={isWalletConnected} />
              </motion.div>
            </div>
          </main>

          <FloatingThemeToggle 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>
      </div>
    </div>
  );
}