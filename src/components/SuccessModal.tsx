import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromToken: { symbol: string; icon: string };
  toToken: { symbol: string; icon: string };
  fromAmount: string;
  toAmount: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.1 
          }}
          className="flex flex-col items-center text-center py-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-900 dark:text-white mb-2"
          >
            Swap Successful!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-slate-400 mb-6"
          >
            Your transaction has been confirmed
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">Swapped</span>
              <div className="flex items-center gap-2">
                <span>{fromToken.icon}</span>
                <span className="text-slate-900 dark:text-white">
                  {fromAmount} {fromToken.symbol}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Received</span>
              <div className="flex items-center gap-2">
                <span>{toToken.icon}</span>
                <span className="text-slate-900 dark:text-white">
                  {toAmount} {toToken.symbol}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3 w-full"
          >
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open('https://etherscan.io', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Explorer
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
