
import React from 'react';
import type { ParaphraseQuestion } from '../types';

interface ParaphraseQuestionCardProps {
  questionData: ParaphraseQuestion;
  questionNumber: number;
  userAnswer: string | null;
  onAnswerChange: (answer: string) => void;
  isSubmitted: boolean;
}

const ParaphraseQuestionCard: React.FC<ParaphraseQuestionCardProps> = ({
  questionData,
  questionNumber,
  userAnswer,
  onAnswerChange,
  isSubmitted,
}) => {

  const getOptionClasses = (option: string) => {
    let baseClasses = "flex items-center w-full p-4 rounded-lg border-2 cursor-pointer transition-all duration-200";
    
    if (!isSubmitted) {
        if (userAnswer === option) {
            return `${baseClasses} bg-sky-100 border-sky-500`;
        }
        return `${baseClasses} bg-white border-slate-300 hover:border-sky-400`;
    }

    // After submission
    const isCorrectAnswer = option === questionData.correctAnswer;
    const isSelectedAnswer = option === userAnswer;

    if (isCorrectAnswer) {
      return `${baseClasses} bg-green-100 border-green-500 cursor-default`;
    }
    if (isSelectedAnswer) { // and it must be wrong, since it didn't hit the first `if`
      return `${baseClasses} bg-red-100 border-red-500 cursor-default`;
    }
    
    return `${baseClasses} bg-slate-50 border-slate-200 text-slate-500 cursor-default`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="mb-4">
        <p className="text-lg font-semibold text-slate-800">
          <span className="text-sky-600 font-bold">{questionNumber}.</span> In an IELTS question, you see the phrase:
        </p>
        <p className="mt-2 text-center bg-slate-100 p-3 rounded-md text-lg font-mono text-slate-900">"{questionData.questionPhrase}"</p>
        <p className="text-center text-sm text-slate-500 mt-1 italic">{questionData.contextSentence}</p>
      </div>
      <p className="font-semibold text-slate-800 mb-3">Which of the following phrases from a reading passage means the same thing?</p>

      <div className="space-y-3">
        {questionData.options.map((option, index) => (
          <label key={index} className={getOptionClasses(option)}>
            <input
              type="radio"
              name={`question-${questionData.id}`}
              value={option}
              checked={userAnswer === option}
              onChange={(e) => onAnswerChange(e.target.value)}
              disabled={isSubmitted}
              className="h-5 w-5 mr-4 text-sky-600 border-slate-400 focus:ring-sky-500 shrink-0"
              aria-label={`Option ${index + 1}`}
            />
            <span className="flex-grow">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ParaphraseQuestionCard;
