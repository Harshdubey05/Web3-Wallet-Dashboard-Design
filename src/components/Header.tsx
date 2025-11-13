import { Wallet, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isWalletConnected: boolean;
  setIsWalletConnected: (value: boolean) => void;
}

export function Header({ isDarkMode, setIsDarkMode, isWalletConnected, setIsWalletConnected }: HeaderProps) {
  return (
    <header className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-slate-900 dark:text-white">DeFi Protocol</span>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-full relative overflow-hidden border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 transition-colors"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                  animate={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  initial={false}
                  animate={{ 
                    rotate: isDarkMode ? 0 : 180,
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="relative z-10"
                >
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Sun className="h-5 w-5 text-orange-500" />
                  )}
                </motion.div>
              </Button>
            </motion.div>

            {isWalletConnected ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  onClick={() => setIsWalletConnected(false)}
                  className="relative overflow-hidden border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-900 dark:text-white"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Wallet className="mr-2 h-4 w-4" />
                  <span className="relative">0x742d...4e89</span>
                </Button>
              </motion.div>
            ) : (
              <Button
                onClick={() => setIsWalletConnected(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg shadow-pink-500/25"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}