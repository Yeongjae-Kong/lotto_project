import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface LottoBallProps {
  number: number;
  isBonus?: boolean;
  isMatched?: boolean;
  animationsEnabled?: boolean;
}

const getLottoBallColor = (number: number): string => {
  if (number <= 10) return 'bg-yellow-400';
  if (number <= 20) return 'bg-blue-400';
  if (number <= 30) return 'bg-red-400';
  if (number <= 40) return 'bg-gray-400';
  return 'bg-green-400';
};

export const LottoBall: React.FC<LottoBallProps> = ({ 
  number, 
  isBonus = false, 
  isMatched = false,
  animationsEnabled = true
}) => {
  const ballSize = isBonus ? 'w-8 h-8' : 'w-8 h-8';

  return (
    <motion.div
      initial={animationsEnabled ? { scale: 0, rotate: -180 } : undefined}
      animate={animationsEnabled ? { scale: 1, rotate: 0 } : undefined}
      transition={animationsEnabled ? { type: "spring", duration: 0.5 } : undefined}
      className={cn(
        getLottoBallColor(number),
        `${ballSize} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`,
        isBonus && 'ring-4 ring-yellow-300',
        isMatched && 'ring-2 ring-white ring-opacity-50'
      )}
    >
      {number}
    </motion.div>
  );
};