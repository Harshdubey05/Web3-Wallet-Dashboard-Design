import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface FloatingThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export function FloatingThemeToggle({ isDarkMode, setIsDarkMode }: FloatingThemeToggleProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-4 border-white dark:border-slate-900"
        >
          <motion.div
            initial={false}
            animate={{ 
              rotate: isDarkMode ? 0 : 360,
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {isDarkMode ? (
              <Moon className="h-6 w-6 text-white" />
            ) : (
              <Sun className="h-6 w-6 text-white" />
            )}
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}