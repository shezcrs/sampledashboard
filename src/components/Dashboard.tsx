import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { User, TestResult } from '../types';
import { mockTestResults, weeklyStressData, overallProgressData, achievements } from '../utils/mockData';
import { TrendingUp, Award, Target, Brain, Zap, Trophy } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const recentTests = mockTestResults.slice(0, 3);
  const overallProficiency = 82;
  const averageEfficiency = 75;

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-800">Welcome back, {user.name}! 👋</h1>
            <p className="text-gray-600 mt-1">Here&apos;s your learning overview</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => onNavigate('test')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg"
            >
              Take Test
            </Button>
            <Button 
              onClick={() => onNavigate('challenges')}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 shadow-md"
            >
              View Challenges
            </Button>
          </div>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Level & XP</p>
                  <p className="text-2xl text-gray-900 mt-1">Level {user.level}</p>
                  <p className="text-cyan-600 text-sm mt-1">{user.xp} XP</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Global Rank</p>
                  <p className="text-2xl text-gray-900 mt-1">#{user.rank}</p>
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Top 5%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Learning Streak</p>
                  <p className="text-2xl text-gray-900 mt-1">{user.streak} Days</p>
                  <p className="text-orange-600 text-sm mt-1">🔥 Keep it up!</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Optimal State</p>
                  <p className="text-2xl text-gray-900 mt-1">{user.optimalLearningState.focus}%</p>
                  <p className="text-purple-600 text-sm mt-1">{user.optimalLearningState.timeOfDay}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Overall Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="text-5xl text-cyan-600">{overallProficiency}%</div>
                  <div className="mb-2">
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                      +4% this month
                    </Badge>
                  </div>
                </div>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overallProgressData}>
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#0891b2" 
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Average Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end gap-4">
                  <div className="text-5xl text-purple-600">{averageEfficiency}%</div>
                  <div className="mb-2">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                      Efficient Strategy
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 items-end h-24">
                  {[85, 70, 78, 65, 75, 82, 75].map((val, i) => (
                    <div key={i} className="flex-1 bg-purple-400 rounded-t" style={{ height: `${val}%` }} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insight & Cognitive Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-cyan-100 to-blue-100 border-cyan-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-600" />
                Next Targeted Skill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-lg text-gray-900">Chemistry: Quantum Mechanics</p>
                  <p className="text-gray-700 mt-2">High LTI Potential - Ready for application challenges</p>
                </div>
                <Button 
                  onClick={() => onNavigate('challenges')}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-md"
                >
                  Start Application Challenge
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Cognitive Load Trends (Weekly)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={weeklyStressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Bar dataKey="stress" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tests */}
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Tests (Strategy Focus)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div 
                  key={test.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => onNavigate('analytics')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      test.subject === 'Physics' ? 'bg-blue-100' :
                      test.subject === 'Math' ? 'bg-purple-100' :
                      'bg-green-100'
                    }`}>
                      <span className="text-2xl">
                        {test.subject === 'Physics' ? '⚛️' : test.subject === 'Math' ? '📐' : '🧪'}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-900">{test.subject} - {test.chapter}</p>
                      <p className="text-gray-600 text-sm">{new Date(test.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-cyan-600">{test.score}%</p>
                      <Badge className={
                        test.strategyBreakdown.efficient > 70 
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : test.strategyBreakdown.efficient > 50
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                          : 'bg-red-100 text-red-700 border-red-300'
                      }>
                        {test.strategyBreakdown.efficient > 70 ? 'Efficient' : 
                         test.strategyBreakdown.trialAndError > 50 ? 'Trial & Error' : 'Mixed'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg text-center transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-400 shadow-md'
                      : 'bg-gray-100 border border-gray-300 opacity-50'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className="text-gray-900 text-sm">{achievement.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
