import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Chapter, TestLevel, CognitiveState } from '../types';
import { TestResults } from './TestResults';
import { Clock, Eye, Brain, AlertCircle } from 'lucide-react';

interface TestInterfaceProps {
  chapter: Chapter;
  level: TestLevel;
  onComplete: () => void;
  onCancel: () => void;
}

// Mock questions
const mockQuestions = [
  {
    id: 'q1',
    text: 'A particle moves with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 4 seconds, what is the acceleration?',
    options: ['5 m/s²', '10 m/s²', '15 m/s²', '20 m/s²'],
    correctAnswer: 0,
  },
  {
    id: 'q2',
    text: 'What is the SI unit of force?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctAnswer: 1,
  },
  {
    id: 'q3',
    text: 'A projectile is launched at an angle of 45° with initial velocity 20 m/s. What is the maximum height reached? (g = 10 m/s²)',
    options: ['5 m', '10 m', '15 m', '20 m'],
    correctAnswer: 1,
  },
  {
    id: 'q4',
    text: 'Two forces of 3N and 4N act perpendicular to each other. What is the resultant force?',
    options: ['5 N', '7 N', '12 N', '1 N'],
    correctAnswer: 0,
  },
  {
    id: 'q5',
    text: 'A car accelerates uniformly from rest to 60 km/h in 10 seconds. What is the distance covered?',
    options: ['83.3 m', '166.6 m', '300 m', '600 m'],
    correctAnswer: 0,
  },
];

export function TestInterface({ chapter, level, onComplete, onCancel }: TestInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(mockQuestions.length).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [focusLevel, setFocusLevel] = useState<'high' | 'medium' | 'low'>('high');
  const [cognitiveState, setCognitiveState] = useState<CognitiveState>('Focus');
  const [showResults, setShowResults] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate focus detection
  useEffect(() => {
    const focusInterval = setInterval(() => {
      const random = Math.random();
      if (random > 0.7) {
        setFocusLevel('high');
        setCognitiveState('Focus');
      } else if (random > 0.4) {
        setFocusLevel('medium');
        setCognitiveState(Math.random() > 0.5 ? 'Stress' : 'Confusion');
      } else {
        setFocusLevel('low');
        setCognitiveState('Boredom');
      }
    }, 5000);

    return () => clearInterval(focusInterval);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const attempted = selectedAnswers.filter(a => a !== null).length;
  const progressPercentage = ((currentQuestion + 1) / mockQuestions.length) * 100;

  if (showResults) {
    return <TestResults chapter={chapter} level={level} answers={selectedAnswers} questions={mockQuestions} onClose={onComplete} />;
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-white">{chapter.name}</h1>
            <p className="text-slate-400">{level} Level Test</p>
          </div>
          <div className="flex gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-white">{formatTime(timeRemaining)}</span>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <div className={`w-3 h-3 rounded-full ${
                  focusLevel === 'high' ? 'bg-green-500' :
                  focusLevel === 'medium' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <span className="text-white text-sm">{cognitiveState}</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Question {currentQuestion + 1} of {mockQuestions.length}</span>
              <span className="text-slate-400 text-sm">Attempted: {attempted}/{mockQuestions.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        {/* Focus Alert */}
        {focusLevel === 'low' && (
          <Card className="bg-orange-900/20 border-orange-700/50">
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-orange-400">Focus seems low. Take a deep breath and refocus!</p>
                <p className="text-orange-300/70 text-sm">Consider taking a short break if needed.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  Question {currentQuestion + 1}
                </Badge>
                {selectedAnswers[currentQuestion] !== null && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Answered
                  </Badge>
                )}
              </div>
              <p className="text-white text-lg">{mockQuestions[currentQuestion].text}</p>
            </div>

            <div className="space-y-3">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-cyan-500 bg-cyan-500/10 text-white'
                      : 'border-slate-600 bg-slate-900/50 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-500'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            ← Previous
          </Button>

          <div className="flex gap-2">
            {mockQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg text-sm transition-all ${
                  index === currentQuestion
                    ? 'bg-cyan-500 text-white'
                    : selectedAnswers[index] !== null
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === mockQuestions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              Next →
            </Button>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-slate-600 text-slate-400 hover:bg-slate-800"
          >
            Save & Exit
          </Button>
        </div>
      </div>
    </div>
  );
}
