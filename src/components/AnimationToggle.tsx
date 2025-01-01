import React from 'react';
import { Sparkles } from 'lucide-react';

interface AnimationToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const AnimationToggle: React.FC<AnimationToggleProps> = ({ enabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 text-sm transition-colors"
      style={{ color: enabled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)' }}
    >
      <Sparkles size={16} />
      <span>애니메이션 {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
};