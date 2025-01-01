import React from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoButtonProps {
  onClick: () => void;
}

export const InfoButton: React.FC<InfoButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 p-3 rounded-full shadow-lg transition-colors"
      aria-label="로또 게임 규칙 안내"
    >
      <HelpCircle className="text-blue-400" />
    </button>
  );
};