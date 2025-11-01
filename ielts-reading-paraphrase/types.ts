
export interface ParaphraseQuestion {
  id: number;
  questionPhrase: string;
  contextSentence: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizPage {
  id: number;
  questions: ParaphraseQuestion[];
}

// Fix: Add missing type definitions for Passage, Question, and QuestionType.
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  GAP_FILLING = 'GAP_FILLING',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  options?: string[];
  wordLimit?: number;
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface Passage {
  id: number;
  title: string;
  text: string;
  questions: Question[];
  answers: Answer[];
}
