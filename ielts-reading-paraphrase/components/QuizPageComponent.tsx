
import React, { useState, useMemo } from 'react';
import type { QuizPage } from '../types';
import ParaphraseQuestionCard from './ParaphraseQuestionCard';

interface QuizPageComponentProps {
  pageData: QuizPage;
  pageNumber: number;
}

const QuizPageComponent: React.FC<QuizPageComponentProps> = ({ pageData, pageNumber }) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (questionId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const score = useMemo(() => {
    if (!isSubmitted) return 0;
    return pageData.questions.reduce((total, question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        return total + 2;
      }
      return total;
    }, 0);
  }, [isSubmitted, userAnswers, pageData]);
  
  const getScoreMessage = (finalScore: number) => {
    if (finalScore === 10) return "Excellent! You have a great understanding of paraphrasing.";
    if (finalScore >= 6) return "Good job! Keep practicing to master this skill.";
    return "Keep trying! Understanding paraphrases is key to a high score.";
  }

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const allQuestionsAnswered = Object.keys(userAnswers).length === pageData.questions.length;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-700">Practice Set {pageNumber}</h2>
        <p className="text-slate-500 mt-1">Choose the best paraphrase for each phrase from the question.</p>
      </div>

      {isSubmitted && (
         <div className="bg-white p-6 rounded-xl shadow-lg border border-sky-200 text-center transition-all duration-500 ease-in-out">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Page {pageNumber} Score</h3>
          <p className="text-4xl font-extrabold text-sky-600 mb-2">{score}/10</p>
          <p className="text-slate-600">{getScoreMessage(score)}</p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {pageData.questions.map((question, index) => (
          <ParaphraseQuestionCard
            key={question.id}
            questionData={question}
            questionNumber={index + 1}
            userAnswer={userAnswers[question.id] || null}
            onAnswerChange={(answer) => handleAnswerChange(question.id, answer)}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>

      {!isSubmitted && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="px-10 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Check Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPageComponent;
