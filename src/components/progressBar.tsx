import React from 'react';
import { twMerge } from 'tailwind-merge'

interface ProgressBarProps {
  value: number; // The value of the progress
  max: number; // The maximum value of the progress
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max,className }) => {
  // Calculate the width of the filled part of the progress bar
  const width = Math.min(100, (value / max) * 100);

  return (
    <div className={twMerge("w-full bg-[#C4D0FB]  rounded-full h-3", className) }>
      <div
        className="bg-white h-3 rounded-full"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
