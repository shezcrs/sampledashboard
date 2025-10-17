import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Chapter, TestLevel } from '../types';
import { CheckCircle2, XCircle, Circle, AlertTriangle, TrendingUp, Brain, Target } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TestResultsProps {
  chapter: Chapter;
  level: TestLevel;
  answers: (number | null)[];
  questions: any[];
  onClose: () => void;
}

export function TestResults({ chapter, level, answers, questions, onClose }: TestResultsProps) {
  const attempted = answers.filter(a => a !== null).length;
  const unattempted = answers.filter(a => a === null).length;
  const correct = answers.filter((a, i) => a === questions[i].correctAnswer).length;
  const wrong = attempted - correct;
  const score = Math.round((correct / questions.length) * 100);

  // Mock data for compared to majority
  const comparedToMajority = [
    { questionNum: 2, studentWrong: true, majorityRight: true },
    { questionNum: 4, studentWrong: true, majorityRight: true },
  ];

  // Emotional timeline data
  const emotionalTimeline = [
    { question: 1, state: 'Focus', intensity: 85 },
    { question: 2, state: 'Focus', intensity: 80 },
    { question: 3, state: 'Stress', intensity: 65 },
    { question: 4, state: 'Confusion', intensity: 55 },
    { question: 5, state: 'Focus', intensity: 75 },
  ];

  // Strategy breakdown
  const strategyData = [
    { name: 'Efficient', value: 70, color: '#10b981' },
    { name: 'Trial & Error', value: 20, color: '#f59e0b' },
    { name: 'Guessing', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl text-white">Test Completed! 🎉</h1>
          <p className="text-slate-400">{chapter.name} - {level} Level</p>
        </div>

        {/* Score Card */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="text-7xl text-cyan-400">{score}%</div>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Efficiency</p>
                  <p className="text-2xl text-purple-400">86%</p>
                </div>
                <div className="w-px h-12 bg-slate-700" />
                <div className="text-center">
                  <p className="text-slate-400 text-sm">Cognitive Load</p>
                  <p className="text-2xl text-yellow-400">Moderate</p>
                </div>
                <div className="w-px h-12 bg-slate-700" />
                <div className="text-center">
                  <p className="text-slate-400 text-sm">LTI Score</p>
                  <p className="text-2xl text-green-400">72%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-3xl text-white mb-1">{attempted}</div>
              <div className="text-slate-400 text-sm">Attempted</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-slate-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Circle className="w-6 h-6 text-slate-400" />
              </div>
              <div className="text-3xl text-white mb-1">{unattempted}</div>
              <div className="text-slate-400 text-sm">Unattempted</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-3xl text-white mb-1">{correct}</div>
              <div className="text-slate-400 text-sm">Correct</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-3xl text-white mb-1">{wrong}</div>
              <div className="text-slate-400 text-sm">Wrong</div>
            </CardContent>
          </Card>
        </div>

        {/* Compared to Majority */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Questions Where You Struggled (Compared to Majority)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {comparedToMajority.map((item) => (
                <div 
                  key={item.questionNum}
                  className="p-4 bg-orange-900/20 border border-orange-700/50 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-white">{item.questionNum}</span>
                      </div>
                      <div>
                        <p className="text-white">Question {item.questionNum}</p>
                        <p className="text-orange-300 text-sm">
                          {item.majorityRight 
                            ? '75% of students got this correct - Review this topic'
                            : 'Most students also struggled with this question'}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      item.majorityRight
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }>
                      {item.majorityRight ? 'Need Review' : 'Difficult for All'}
                    </Badge>
                  </div>
                </div>
              ))}
              {comparedToMajority.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <p>Great job! You performed as well as or better than the majority on all questions.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Emotional Timeline */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Emotional Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={emotionalTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="question" 
                    stroke="#94a3b8"
                    label={{ value: 'Question Number', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
                  />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="intensity" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-slate-400">Focus</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-slate-400">Stress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" />
                  <span className="text-slate-400">Confusion</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Breakdown */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Strategy Usage Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={strategyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {strategyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {strategyData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Key Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <p className="text-cyan-300">✓ Strong efficient strategy usage (70%) - Keep it up!</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <p className="text-yellow-300">⚠ Stress levels increased on questions 3-4. Practice relaxation techniques.</p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg">
              <p className="text-purple-300">💡 High LTI potential detected. Ready for application challenges!</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            View Detailed Analytics
          </Button>
          <Button 
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Review Wrong Answers
          </Button>
        </div>
      </div>
    </div>
  );
}
