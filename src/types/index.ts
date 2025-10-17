// Core Types for NeetJEEt Platform

export type ExamType = 'JEE' | 'NEET';
export type Subject = 'Math' | 'Physics' | 'Chemistry' | 'Biology';
export type TestLevel = 'Mains' | 'Advanced';
export type Strategy = 'Efficient' | 'Trial-and-Error' | 'Guessing';
export type CognitiveState = 'Focus' | 'Stress' | 'Confusion' | 'Boredom';

export interface User {
  id: string;
  name: string;
  email: string;
  examType: ExamType;
  xp: number;
  level: number;
  streak: number;
  rank: number;
  stressIndex: number;
  optimalLearningState: {
    focus: number;
    timeOfDay: string;
  };
}

export interface Question {
  id: string;
  subject: Subject;
  chapter: string;
  difficulty: number;
  text: string;
  options: string[];
  correctAnswer: number;
  complexityIndex: number;
}

export interface TestAttempt {
  questionId: string;
  selectedAnswer: number | null;
  timeSpent: number;
  cognitiveState: CognitiveState;
  strategy: Strategy;
  isCorrect: boolean;
}

export interface TestResult {
  id: string;
  subject: Subject;
  level: TestLevel;
  chapter: string;
  date: string;
  score: number;
  attempted: number;
  unattempted: number;
  correct: number;
  wrong: number;
  efficiency: number;
  cognitiveLoadIndex: 'Low' | 'Moderate' | 'High';
  lti: number;
  attempts: TestAttempt[];
  emotionalTimeline: Array<{
    questionNumber: number;
    state: CognitiveState;
    intensity: number;
  }>;
  strategyBreakdown: {
    efficient: number;
    trialAndError: number;
    guessing: number;
  };
  comparedToMajority: {
    questionId: string;
    studentGotWrong: boolean;
    majorityGotRight: boolean;
  }[];
}

export interface Chapter {
  id: string;
  name: string;
  subject: Subject;
  proficiency: number;
  efficiency: number;
  ltiPotential: 'Low' | 'Medium' | 'High';
  needsAttention: 'proficiency' | 'efficiency' | 'lti' | 'anxiety' | null;
}

export interface LTIData {
  concept: string;
  applications: string[];
  score: number;
}
