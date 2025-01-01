import React, { useState } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { LottoBall } from './components/LottoBall';
import { PurchaseButton } from './components/PurchaseButton';
import { ResultSummary } from './components/ResultSummary';
import { InfoButton } from './components/InfoButton';
import { LottoInfoModal } from './components/LottoInfoModal';
import { AnimationToggle } from './components/AnimationToggle';
import { generateLottoNumbers, generateWinningNumbers, checkMatch, calculatePrize } from './utils/lottoLogic';
import type { Statistics, LottoNumbers, LottoResult } from './types/lotto';

function App() {
  const [statistics, setStatistics] = useState<Statistics>({
    totalSpent: 0,
    totalWon: 0,
    netProfit: 0
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<LottoResult | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [prizeCounts, setPrizeCounts] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const [gamesPurchased, setGamesPurchased] = useState(0);

  const playLotto = (games: number) => {
    setIsSpinning(true);
    setResult(null); // Reset previous result for animation
    
    const userNumbers = Array.from({ length: games }, () => generateLottoNumbers());
    const winningNumbers = generateWinningNumbers();
    
    const matches = userNumbers.map(numbers => checkMatch(numbers, winningNumbers));
    const prizes = matches.map(match => calculatePrize(match));
    
    const totalPrize = prizes.reduce((sum, prize) => sum + prize, 0);
    const cost = games * 1000;
    
    setStatistics(prev => ({
      totalSpent: prev.totalSpent + cost,
      totalWon: prev.totalWon + totalPrize,
      netProfit: prev.totalWon + totalPrize - (prev.totalSpent + cost)
    }));

    const newPrizeCounts = { ...prizeCounts };
    matches.forEach(match => {
      if (match > 0) {
        newPrizeCounts[match] = (newPrizeCounts[match] || 0) + 1;
      }
    });
    setPrizeCounts(newPrizeCounts);

    setGamesPurchased(prev => prev + games);

    setTimeout(() => {
      setResult({ userNumbers, winningNumbers, matches, prizes });
      setIsSpinning(false);
    }, animationsEnabled ? 500 : 0);
  };

  const resetStatistics = () => {
    setStatistics({
      totalSpent: 0,
      totalWon: 0,
      netProfit: 0
    });
    setGamesPurchased(0);
    setPrizeCounts({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });
    setResult(null);
  };

  const isNumberMatched = (number: number, gameNumbers: number[], winningNumbers: LottoNumbers) => {
    return winningNumbers.numbers.includes(number) || number === winningNumbers.bonusNumber;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Sparkles className="text-yellow-400" />
              로또 시뮬레이터
            </h1>
          </div>
        </div>

        <div className="mb-4">
          <AnimationToggle 
            enabled={animationsEnabled} 
            onToggle={() => setAnimationsEnabled(!animationsEnabled)} 
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-xl mt-4" style={{marginBottom : "1rem"}}>
          <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
            <div>
              <p className="text-gray-400">총 사용</p>
              <p className="text-lg font-bold text-red-400">
                {statistics.totalSpent.toLocaleString()}원
              </p>
              <p className="text-gray-400 text-xs">{gamesPurchased}장 구매</p>
              <button 
                onClick={resetStatistics} 
                className="mt-2 text-sm text-blue-400 hover:underline"
              >
                금액 리셋하기
              </button>
            </div>
            <div>
              <p className="text-gray-400">총 당첨금</p>
              <p className="text-lg font-bold text-green-400">
                {statistics.totalWon.toLocaleString()}원
              </p>
              <div className="text-gray-400 text-xs">
                {Object.entries(prizeCounts).map(([rank, count]) => (
                  count > 0 ? (
                    <div key={rank}>
                      {rank}등 {count}개
                    </div>
                  ) : null
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-400">순이익</p>
              <p className={`text-lg font-bold ${statistics.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {statistics.netProfit.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <PurchaseButton
            games={1}
            price={1000}
            onClick={() => playLotto(1)}
            disabled={isSpinning}
          />
          <PurchaseButton
            games={10}
            price={10000}
            onClick={() => playLotto(10)}
            disabled={isSpinning}
          />
          <PurchaseButton
            games={100}
            price={100000}
            onClick={() => playLotto(100)}
            disabled={isSpinning}
          />
        </div>

        {result && (
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
              <h2 className="text-xl font-bold mb-4">당첨 번호</h2>
              <div className="flex gap-4 items-center">
                {result.winningNumbers.numbers.map((num, idx) => (
                  <LottoBall 
                    key={idx} 
                    number={num} 
                    animationsEnabled={animationsEnabled}
                  />
                ))}
                <span className="text-2xl">+</span>
                <LottoBall 
                  number={result.winningNumbers.bonusNumber} 
                  isBonus 
                  animationsEnabled={animationsEnabled}
                />
              </div>
            </div>

            {result.userNumbers.length > 10 ? (
              <ResultSummary 
                result={result} 
                totalPrize={result.prizes.reduce((sum, prize) => sum + prize, 0)}
                animationsEnabled={animationsEnabled}
              />
            ) : (
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                <h2 className="text-xl font-bold mb-4">내 번호</h2>
                {result.userNumbers.map((numbers, gameIdx) => (
                  <div key={gameIdx} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-4 mb-2 justify-start">
                      <span className="text-gray-400">#{gameIdx + 1}</span>
                      <div className="flex gap-4 flex-1">
                        {numbers.map((num, numIdx) => (
                          <LottoBall 
                            key={numIdx} 
                            number={num} 
                            isMatched={isNumberMatched(num, numbers, result.winningNumbers)}
                            animationsEnabled={animationsEnabled}
                          />
                        ))}
                      </div>
                      {result.prizes[gameIdx] > 0 && (
                        <div className="text-green-400 font-bold whitespace-nowrap">
                          {result.matches[gameIdx]}등!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <InfoButton onClick={() => setIsModalOpen(true)} />
      <LottoInfoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        className="max-w-lg mx-auto p-4"
        animationsEnabled={animationsEnabled}
      />
    </div>
  );
}

export default App;