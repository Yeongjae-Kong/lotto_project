import React from 'react';
import { motion } from 'framer-motion';
import type { LottoResult } from '../types/lotto';

interface ResultSummaryProps {
  result: LottoResult;
  totalPrize: number;
  animationsEnabled?: boolean;
}

const PRIZE_AMOUNTS: Record<number, number> = {
  1: 2000000000,
  2: 50000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

export const ResultSummary: React.FC<ResultSummaryProps> = ({ 
  result, 
  totalPrize,
  animationsEnabled = true 
}) => {
  const rankCounts = result.matches.reduce((acc, rank) => {
    if (rank > 0) {
      acc[rank] = (acc[rank] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const rankNames = {
    1: '1등',
    2: '2등',
    3: '3등',
    4: '4등',
    5: '5등'
  };

  const MotionWrapper = animationsEnabled ? motion.div : 'div';

  return (
    <MotionWrapper
      initial={animationsEnabled ? { opacity: 0, y: 20 } : undefined}
      animate={animationsEnabled ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 p-6 rounded-xl"
    >
      <h3 className="text-lg font-bold mb-4">당첨 결과 요약</h3>
      <div className="space-y-2">
        {Object.entries(rankCounts).map(([rank, count]) => {
          const rankNumber = parseInt(rank) as 1 | 2 | 3 | 4 | 5;
          const prizeAmount = PRIZE_AMOUNTS[rankNumber] * count;
          
          return (
            <div key={rank} className="flex justify-between items-center">
              <span>{rankNames[rankNumber]}</span>
              <div className="text-right">
                <span className="text-green-400 font-bold">{count}개</span>
                <span className="text-gray-400 text-sm ml-2">
                  (+{prizeAmount.toLocaleString()}원)
                </span>
              </div>
            </div>
          );
        })}
        {Object.keys(rankCounts).length === 0 && (
          <p className="text-gray-400">당첨된 번호가 없습니다.</p>
        )}
        <div className="border-t border-gray-700 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">총 당첨금</span>
            <span className="text-green-400 font-bold">
              {totalPrize.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};