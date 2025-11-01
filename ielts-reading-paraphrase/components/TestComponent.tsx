
import React from 'react';
import type { Passage } from '../types';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

interface TestComponentProps {
  passage: Passage;
  userAnswers: { [key: string]: string };
  onAnswerChange: (passageId: number, questionId: number, answer: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  currentPassageIndex: number;
  totalPassages: number;
  totalQuestionsAnswered: number;
  totalQuestions: number;
}

const TestComponent: React.FC<TestComponentProps> = ({
  passage,
  userAnswers,
  onAnswerChange,
  onNext,
  onPrev,
  onSubmit,
  currentPassageIndex,
  totalPassages,
  totalQuestionsAnswered,
  totalQuestions,
}) => {
  const isLastPassage = currentPassageIndex === totalPassages - 1;

  return (
    <div className="flex flex-col gap-8">
      <ProgressBar 
        current={totalQuestionsAnswered} 
        total={totalQuestions} 
        passageCurrent={currentPassageIndex + 1}
        passageTotal={totalPassages}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="lg:sticky top-8 self-start bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">{passage.title}</h2>
          <div className="prose max-w-none max-h-[60vh] overflow-y-auto pr-4 text-slate-600 leading-relaxed">
            {passage.text.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-slate-700">Questions {currentPassageIndex * 4 + 1} - {currentPassageIndex * 4 + 4}</h3>
          {passage.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={currentPassageIndex * 4 + index + 1}
              userAnswer={userAnswers[`${passage.id}-${question.id}`] || ''}
              onAnswerChange={(answer) => onAnswerChange(passage.id, question.id, answer)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm py-4 border-t border-slate-200 -mx-4 -mb-8 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={currentPassageIndex === 0}
            className="px-6 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {isLastPassage ? (
            <button
              onClick={onSubmit}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Finish & See Score
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
