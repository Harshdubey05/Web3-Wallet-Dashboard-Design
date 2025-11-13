import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface Pool {
  id: string;
  name: string;
  apy: number;
  stakedAmount: string;
  rewardsEarned: string;
  totalStaked: string;
  icon: string;
  color: string;
}

interface StakingPoolCardProps {
  pool: Pool;
  isWalletConnected: boolean;
  index: number;
}

export function StakingPoolCard({ pool, isWalletConnected, index }: StakingPoolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);

  const handleStake = () => {
    setIsStaking(true);
    setTimeout(() => setIsStaking(false), 1500);
  };

  const handleUnstake = () => {
    setIsUnstaking(true);
    setTimeout(() => setIsUnstaking(false), 1500);
  };

  // Calculate progress percentage (mock calculation)
  const progressPercentage = isWalletConnected 
    ? ((parseFloat(pool.rewardsEarned.replace(/,/g, '')) / parseFloat(pool.stakedAmount.replace(/,/g, ''))) * 100) % 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="group"
    >
      <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pool.color} flex items-center justify-center`}>
              <span className="text-white">{pool.icon}</span>
            </div>
            <div>
              <div className="text-slate-900 dark:text-white">{pool.name}</div>
              <div className="text-slate-600 dark:text-slate-400">
                APY: <span className="text-green-600 dark:text-green-400">{pool.apy}%</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-300" /> : <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" />}
          </Button>
        </div>

        {isWalletConnected && (
          <>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-600 dark:text-slate-400">Rewards Progress</span>
                <span className="text-slate-900 dark:text-white">{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Your Stake</span>
                  <span className="text-slate-900 dark:text-white">{pool.stakedAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Rewards Earned</span>
                  <span className="text-green-600 dark:text-green-400">+{pool.rewardsEarned}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total Staked</span>
                  <span className="text-slate-900 dark:text-white">{pool.totalStaked}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleStake}
                      disabled={isStaking}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      {isStaking ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⟳
                        </motion.div>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Stake
                        </>
                      )}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleUnstake}
                      disabled={isUnstaking}
                      variant="outline"
                      className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      {isUnstaking ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⟳
                        </motion.div>
                      ) : (
                        <>
                          <Minus className="mr-2 h-4 w-4" />
                          Unstake
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {!isWalletConnected && (
          <div className="text-center py-4 text-slate-500">
            Connect wallet to view your staking positions
          </div>
        )}
      </div>
    </motion.div>
  );
}