import { useState } from 'react';
import { ArrowDown, Settings, Info, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { SuccessModal } from './SuccessModal';
import { motion, AnimatePresence } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', icon: '⟠', balance: '2.5431' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵', balance: '5,420.00' },
  { symbol: 'USDT', name: 'Tether', icon: '₮', balance: '3,200.00' },
  { symbol: 'DAI', name: 'Dai', icon: '◈', balance: '1,850.50' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿', balance: '0.1234' },
];

interface TokenSwapProps {
  isWalletConnected: boolean;
}

export function TokenSwap({ isWalletConnected }: TokenSwapProps) {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const gasFee = '0.0032';
  const slippage = '0.5';
  const rate = fromAmount && toAmount ? (parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4) : '0';

  return (
    <>
      <Card className="p-6 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-slate-900 dark:text-white">Swap Tokens</h2>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>

        <div className="space-y-2">
          {/* From Token */}
          <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">Sell</span>
              <span className="text-slate-500">
                Balance: {fromToken.balance}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={fromToken.symbol}
                onValueChange={(value) => {
                  const token = TOKENS.find(t => t.symbol === value);
                  if (token) setFromToken(token);
                }}
              >
                <SelectTrigger className="w-[140px] bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span>{fromToken.icon}</span>
                      <span className="text-slate-900 dark:text-white">{fromToken.symbol}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TOKENS.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center gap-2">
                        <span>{token.icon}</span>
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0"
                value={fromAmount}
                onChange={(e) => {
                  setFromAmount(e.target.value);
                  if (e.target.value) {
                    setToAmount((parseFloat(e.target.value) * 1850).toFixed(2));
                  } else {
                    setToAmount('');
                  }
                }}
                className="flex-1 border-none bg-transparent text-right text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
            {fromAmount && (
              <div className="text-right text-slate-500 mt-1">
                ${(parseFloat(fromAmount) * 1850).toFixed(2)}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwapTokens}
                className="rounded-full bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <ArrowDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </Button>
            </motion.div>
          </div>

          {/* To Token */}
          <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 dark:text-slate-400">Buy</span>
              <span className="text-slate-500">
                Balance: {toToken.balance}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Select
                value={toToken.symbol}
                onValueChange={(value) => {
                  const token = TOKENS.find(t => t.symbol === value);
                  if (token) setToToken(token);
                }}
              >
                <SelectTrigger className="w-[140px] bg-white dark:bg-slate-700/50 border-slate-300 dark:border-slate-600">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <span>{toToken.icon}</span>
                      <span className="text-slate-900 dark:text-white">{toToken.symbol}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TOKENS.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center gap-2">
                        <span>{token.icon}</span>
                        <span>{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="0"
                value={toAmount}
                readOnly
                className="flex-1 border-none bg-transparent text-right text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
            {toAmount && (
              <div className="text-right text-slate-500 mt-1">
                ${toAmount}
              </div>
            )}
          </div>
        </div>

        {/* Transaction Details */}
        <AnimatePresence>
          {fromAmount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/30"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">Rate</span>
                <span className="text-slate-900 dark:text-white">
                  1 {fromToken.symbol} = {rate} {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-slate-600 dark:text-slate-400">Gas Fee</span>
                  <Info className="h-3 w-3 text-slate-500" />
                </div>
                <span className="text-slate-900 dark:text-white">${gasFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-slate-600 dark:text-slate-400">Slippage</span>
                  <Info className="h-3 w-3 text-slate-500" />
                </div>
                <span className="text-slate-900 dark:text-white">{slippage}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swap Button */}
        <motion.div
          whileHover={{ scale: isWalletConnected && fromAmount ? 1.02 : 1 }}
          whileTap={{ scale: isWalletConnected && fromAmount ? 0.98 : 1 }}
        >
          <Button
            onClick={handleSwap}
            disabled={!isWalletConnected || !fromAmount || isSwapping}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-500/25"
          >
            {isSwapping ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <span className="inline-block">⟳</span>
              </motion.div>
            ) : !isWalletConnected ? (
              'Connect Wallet'
            ) : !fromAmount ? (
              'Enter Amount'
            ) : (
              'Swap Tokens'
            )}
          </Button>
        </motion.div>
      </Card>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setFromAmount('');
          setToAmount('');
        }}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount}
      />
    </>
  );
}