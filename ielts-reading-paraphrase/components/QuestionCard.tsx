
import React from 'react';
import type { Question } from '../types';
import { QuestionType } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  userAnswer: string;
  onAnswerChange: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, questionNumber, userAnswer, onAnswerChange }) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div className="space-y-3 mt-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center p-3 rounded-lg border border-slate-200 hover:bg-sky-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="h-4 w-4 text-sky-600 border-slate-300 focus:ring-sky-500"
                />
                <span className="ml-3 text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case QuestionType.GAP_FILLING:
        const parts = question.questionText.split(/\[BLANK\]/i);
        return (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span>{parts[0]}</span>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm w-40"
              placeholder="Your answer"
            />
            <span>{parts[1]}</span>
          </div>
        );
      case QuestionType.SHORT_ANSWER:
        return (
          <div className="mt-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="mt-1 block w-full sm:w-2/3 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Your answer"
            />
            {question.wordLimit && <p className="text-xs text-slate-500 mt-1">NO MORE THAN {question.wordLimit} WORD(S)</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
      <p className="font-semibold text-slate-800">
        <span className="text-sky-600 font-bold">{questionNumber}.</span> {question.type !== QuestionType.GAP_FILLING ? question.questionText : ''}
      </p>
      {renderQuestionInput()}
    </div>
  );
};

export default QuestionCard;
