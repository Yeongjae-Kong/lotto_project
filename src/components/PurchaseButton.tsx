import React from 'react';
import { motion } from 'framer-motion';

interface PurchaseButtonProps {
  games: number;
  price: number;
  onClick: () => void;
  disabled: boolean;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  games,
  price,
  onClick,
  disabled
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl
        font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all
        disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
    >
      {disabled ? '추첨중...' : `${games}게임 구매하기 (${price.toLocaleString()}원)`}
    </motion.button>
  );
};