import { Card } from './ui/card';
import { StakingPoolCard } from './StakingPoolCard';
import { motion } from 'motion/react';
import { TrendingUp, Coins, Zap } from 'lucide-react';

const STAKING_POOLS = [
  {
    id: '1',
    name: 'ETH Staking',
    apy: 4.5,
    stakedAmount: '1.2500',
    rewardsEarned: '0.0234',
    totalStaked: '125,420',
    icon: '⟠',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    name: 'USDC Liquidity',
    apy: 8.2,
    stakedAmount: '2,500.00',
    rewardsEarned: '45.80',
    totalStaked: '8,240,120',
    icon: '💵',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '3',
    name: 'WBTC Pool',
    apy: 6.8,
    stakedAmount: '0.0850',
    rewardsEarned: '0.0012',
    totalStaked: '2,840',
    icon: '₿',
    color: 'from-orange-500 to-yellow-500'
  },
];

interface StakingStatsProps {
  isWalletConnected: boolean;
}

export function StakingStats({ isWalletConnected }: StakingStatsProps) {
  const totalStakedValue = isWalletConnected ? '$6,420.50' : '$0.00';
  const totalRewards = isWalletConnected ? '$89.45' : '$0.00';
  const avgApy = isWalletConnected ? '6.5%' : '0%';

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-purple-200/50 dark:border-slate-700/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 dark:bg-purple-500/30 flex items-center justify-center">
                <Coins className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-slate-900 dark:text-white mb-1">{totalStakedValue}</div>
            <div className="text-slate-600 dark:text-slate-400">Total Staked</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-green-200/50 dark:border-slate-700/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-slate-900 dark:text-white mb-1">{totalRewards}</div>
            <div className="text-slate-600 dark:text-slate-400">Total Rewards</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-orange-200/50 dark:border-slate-700/50 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 dark:bg-orange-500/30 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="text-slate-900 dark:text-white mb-1">{avgApy}</div>
            <div className="text-slate-600 dark:text-slate-400">Avg. APY</div>
          </Card>
        </motion.div>
      </div>

      {/* Staking Pools */}
      <Card className="p-6 bg-white/90 dark:bg-slate-900/80 backdrop-blur-2xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        <h2 className="text-slate-900 dark:text-white mb-4">Staking Pools</h2>
        <div className="space-y-3">
          {STAKING_POOLS.map((pool, index) => (
            <StakingPoolCard
              key={pool.id}
              pool={pool}
              isWalletConnected={isWalletConnected}
              index={index}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}