import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Sparkles } from 'lucide-react';
import { AnimationToggle } from './AnimationToggle';

interface LottoInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  animationsEnabled: boolean;
}

export const LottoInfoModal: React.FC<LottoInfoModalProps> = ({ isOpen, onClose, className, animationsEnabled }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`modal max-w-lg bg-gray-800 rounded-xl shadow-xl p-4 overflow-y-auto max-h-[80vh] ${className}`}
            style={{ 
              top: '10%', 
              left: '10%', 
              right: '10%',
              position: 'absolute' 
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="text-yellow-400" />
                  로또 시뮬레이터
                </h1>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 text-gray-200">
              <section>
                <h3 className="font-bold text-lg mb-2">게임 방법</h3>
                <p>1게임당 1,000원을 지불하고 6개의 번호를 선택합니다.</p>
                <p>당첨번호 6개와 보너스 번호 1개가 추첨됩니다.</p>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2">당첨 기준</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>1등: 6개 번호 일치 (보너스 번호 제외)</li>
                  <li>2등: 5개 번호 + 보너스 번호 일치</li>
                  <li>3등: 5개 번호 일치</li>
                  <li>4등: 4개 번호 일치</li>
                  <li>5등: 3개 번호 일치</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2">당첨금 및 세금</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>1등: 약 20억원 - 세금 33% 공제</li>
                  <li>2등: 약 5천만원 - 세금 22% 공제</li>
                  <li>3등: 약 150만원 - 세금 22% 공제</li>
                  <li>4등: 5만원 (비과세)</li>
                  <li>5등: 5천원 (비과세)</li>
                </ul>
                <p className="text-sm text-gray-400 mt-2">
                  * 당첨금은 실제 로또 통계를 바탕으로 한 근사치입니다.
                </p>
              </section>
            </div>
            <div className="mt-4">
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};