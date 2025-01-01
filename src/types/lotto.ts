export interface LottoNumbers {
  numbers: number[];
  bonusNumber: number;
}

export interface LottoResult {
  userNumbers: number[][];
  winningNumbers: LottoNumbers;
  matches: number[];
  prizes: number[];
}

export interface Statistics {
  totalSpent: number;
  totalWon: number;
  netProfit: number;
}