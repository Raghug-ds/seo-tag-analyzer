import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ 
  score, 
  size = 'md', 
  showLabel = true,
  className 
}) => {
  // Get color based on score
  const getColor = () => {
    if (score >= 90) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (score >= 70) return 'bg-gradient-to-r from-yellow-400 to-green-400';
    if (score >= 50) return 'bg-gradient-to-r from-orange-400 to-yellow-400';
    return 'bg-gradient-to-r from-red-500 to-orange-400';
  };

  // Get text color
  const getTextColor = () => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  // Get size variant styles
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-2 w-24';
      case 'lg': return 'h-4 w-48';
      default: return 'h-3 w-36';
    }
  };

  // Get font size based on size prop
  const getFontSize = () => {
    switch (size) {
      case 'sm': return 'text-lg';
      case 'lg': return 'text-4xl';
      default: return 'text-2xl';
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {showLabel && (
        <div className="flex items-baseline mb-1.5">
          <span className={cn("font-bold tracking-tighter", getFontSize(), getTextColor())}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground ml-1">/100</span>
        </div>
      )}
      <div className={cn("relative w-full", getSizeClass())}>
        <div className={cn("w-full h-full rounded-full bg-slate-100")}></div>
        <div 
          className={cn("absolute top-0 left-0 h-full rounded-full", getColor())}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ScoreGauge;