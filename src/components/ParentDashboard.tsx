import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { User } from '../types';
import { weeklyStressData, mockTestResults, subjectWiseAccuracy } from '../utils/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Brain, Target, Clock, CheckCircle } from 'lucide-react';

interface ParentDashboardProps {
  user: User;
}

export function ParentDashboard({ user }: ParentDashboardProps) {
  const weeklyReport = {
    testsCompleted: 5,
    avgAccuracy: 82,
    avgStress: 35,
    consistencyScore: 78,
    studyHours: 12,
  };

  const areasToImprove = [
    {
      area: 'Strategy Efficiency',
      current: 75,
      target: 85,
      recommendation: 'Needs guidance on problem-solving approach, not more practice',
    },
    {
      area: 'Stress Management',
      current: 65,
      target: 80,
      recommendation: 'Performance drops under time pressure. Consider relaxation techniques',
    },
    {
      area: 'Application Skills (LTI)',
      current: 72,
      target: 85,
      recommendation: 'Strong theory, needs more cross-domain application practice',
    },
  ];

  const recentActivity = [
    { date: '2024-04-28', activity: 'Completed Physics Test', score: 86, duration: '45 min' },
    { date: '2024-04-27', activity: 'Watched Strategy Video', score: null, duration: '15 min' },
    { date: '2024-04-25', activity: 'Completed Math Test', score: 78, duration: '50 min' },
    { date: '2024-04-24', activity: 'Practice Session - Chemistry', score: null, duration: '30 min' },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-white">Parent Dashboard</h1>
          <p className="text-slate-400 mt-1">Weekly progress report for {user.name}</p>
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-3xl text-white mb-1">{weeklyReport.testsCompleted}</p>
              <p className="text-slate-400 text-sm">Tests Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-3xl text-white mb-1">{weeklyReport.avgAccuracy}%</p>
              <p className="text-slate-400 text-sm">Avg. Accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-3xl text-white mb-1">{weeklyReport.avgStress}%</p>
              <p className="text-slate-400 text-sm">Avg. Stress</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-3xl text-white mb-1">{weeklyReport.consistencyScore}%</p>
              <p className="text-slate-400 text-sm">Consistency</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-3xl text-white mb-1">{weeklyReport.studyHours}h</p>
              <p className="text-slate-400 text-sm">Study Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Stress Analysis */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-400" />
              Stress Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-yellow-200">
                      {user.name} spent <span className="font-semibold">15%</span> of test time in High-Stress/Confusion state this week.
                    </p>
                    <p className="text-yellow-300/70 text-sm mt-1">
                      This is within normal range but could be improved with stress management techniques.
                    </p>
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyStressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Bar dataKey="stress" fill="#eab308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(subjectWiseAccuracy).map(([subject, accuracy]) => (
                <div key={subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">{accuracy}%</span>
                      <Badge className={
                        accuracy >= 80 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : accuracy >= 70
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }>
                        {accuracy >= 80 ? 'Strong' : accuracy >= 70 ? 'Good' : 'Needs Work'}
                      </Badge>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Areas to Improve */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Areas to Improve - AI Insights</CardTitle>
            <p className="text-slate-400 text-sm">Evidence-based recommendations from learning analytics</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {areasToImprove.map((item, index) => (
              <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white">{item.area}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm">Current: <span className="text-cyan-400">{item.current}%</span></span>
                    <span className="text-slate-400 text-sm">Target: <span className="text-green-400">{item.target}%</span></span>
                  </div>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full" style={{ width: `${(item.current / item.target) * 100}%` }} />
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-xs">💡</span>
                  </div>
                  <p className="text-slate-300 text-sm">{item.recommendation}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Remediation Insight */}
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-700/50">
          <CardHeader>
            <CardTitle className="text-white">Key Remediation Insight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <p className="text-cyan-100 text-lg">
                "{user.name} needs <span className="text-cyan-300 font-semibold">strategy guidance</span>, not more facts."
              </p>
              <p className="text-cyan-200/70 text-sm mt-2">
                The AI analysis shows strong conceptual understanding but inefficient problem-solving approaches. 
                Focus on teaching systematic methods rather than additional content review.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.activity}</p>
                    <p className="text-slate-400 text-xs">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {activity.score !== null && (
                      <span className="text-cyan-400">{activity.score}%</span>
                    )}
                    <span className="text-slate-400 text-sm">{activity.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
