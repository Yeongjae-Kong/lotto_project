import { LottoNumbers } from '../types/lotto';

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateLottoNumbers = (): number[] => {
  const numbers: Set<number> = new Set();
  while (numbers.size < 6) {
    numbers.add(generateRandomNumber(1, 45));
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

export const generateWinningNumbers = (): LottoNumbers => {
  const numbers = generateLottoNumbers();
  let bonusNumber: number;
  do {
    bonusNumber = generateRandomNumber(1, 45);
  } while (numbers.includes(bonusNumber));
  
  return { numbers, bonusNumber };
};

export const checkMatch = (userNumbers: number[], winningNumbers: LottoNumbers): number => {
  const matchCount = userNumbers.filter(num => winningNumbers.numbers.includes(num)).length;
  
  if (matchCount === 6) return 1; // 1등
  if (matchCount === 5 && userNumbers.includes(winningNumbers.bonusNumber)) return 2; // 2등
  if (matchCount === 5) return 3; // 3등
  if (matchCount === 4) return 4; // 4등
  if (matchCount === 3) return 5; // 5등
  return 0; // 꽝
};

export const calculatePrize = (rank: number): number => {
  switch (rank) {
    case 1: return 2000000000; // 20억
    case 2: return 50000000;   // 5천만원
    case 3: return 1500000;    // 150만원
    case 4: return 50000;      // 5만원
    case 5: return 5000;       // 5천원
    default: return 0;
  }
};