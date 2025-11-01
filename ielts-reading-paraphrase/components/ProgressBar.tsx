
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  passageCurrent: number;
  passageTotal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, passageCurrent, passageTotal }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-full">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-sky-700">Overall Progress</span>
            <span className="text-sm font-medium text-slate-600">Passage {passageCurrent} of {passageTotal}</span>
        </div>
      <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-sky-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="text-right text-xs text-slate-500 mt-1">
        {current} / {total} questions answered
      </div>
    </div>
  );
};

export default ProgressBar;
