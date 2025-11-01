
import React from 'react';
import type { Passage } from '../types';

interface ResultsComponentProps {
  testData: Passage[];
  userAnswers: { [key: string]: string };
  score: number;
  onRestart: () => void;
  totalQuestions: number;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ testData, userAnswers, score, onRestart, totalQuestions }) => {
  const getCorrectAnswer = (passageId: number, questionId: number) => {
    const passage = testData.find(p => p.id === passageId);
    return passage?.answers.find(a => a.questionId === questionId)?.answer || '';
  };
  
  const correctCount = score / 0.25;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-slate-200 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Test Complete!</h2>
        <p className="text-slate-600 mb-6">Here is your performance summary.</p>
        <div className="bg-sky-100/50 border-2 border-sky-500 rounded-full w-48 h-48 mx-auto flex flex-col justify-center items-center mb-6">
          <span className="text-5xl font-extrabold text-sky-700">{score.toFixed(2)}</span>
          <span className="text-slate-600 font-medium">out of 10.00</span>
        </div>
        <p className="text-lg text-slate-700">You answered <span className="font-bold text-green-600">{correctCount}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly.</p>
        <button
          onClick={onRestart}
          className="mt-8 px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          Try Again
        </button>
      </div>

      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">Detailed Answer Review</h3>
        <div className="space-y-6">
          {testData.map(passage => (
            <div key={passage.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h4 className="text-xl font-semibold mb-4 text-slate-800 border-b pb-2">{passage.title}</h4>
              <ul className="space-y-4">
                {passage.questions.map((question, index) => {
                  const userAnswer = userAnswers[`${passage.id}-${question.id}`] || 'No answer';
                  const correctAnswer = getCorrectAnswer(passage.id, question.id);
                  const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

                  return (
                    <li key={question.id} className={`p-4 rounded-md ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border-l-4`}>
                      <p className="font-semibold text-slate-700 mb-2">
                        <span className="font-bold">{passage.questions.indexOf(question) + 1 + (passage.id - 1) * 4}.</span> {question.questionText}
                      </p>
                      <div className="text-sm">
                         <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                           Your answer: <span className="font-normal">{userAnswer}</span>
                         </p>
                         {!isCorrect && (
                           <p className="font-medium text-green-800">
                             Correct answer: <span className="font-normal">{correctAnswer}</span>
                           </p>
                         )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsComponent;
