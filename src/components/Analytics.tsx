import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockTestResults, subjectWiseAccuracy } from '../utils/mockData';
import { ExamType } from '../types';
import { 
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell 
} from 'recharts';
import { TrendingUp, Brain, Target, Zap } from 'lucide-react';

interface AnalyticsProps {
  examType: ExamType;
}

export function Analytics({ examType }: AnalyticsProps) {
  const [selectedTest, setSelectedTest] = useState(mockTestResults[0]);

  // Filter subjects based on exam type
  const relevantSubjects = examType === 'JEE' 
    ? ['Math', 'Physics', 'Chemistry'] 
    : ['Biology', 'Physics', 'Chemistry'];

  // Filter subject-wise accuracy
  const filteredSubjectAccuracy = Object.fromEntries(
    Object.entries(subjectWiseAccuracy).filter(([subject]) => relevantSubjects.includes(subject))
  );

  // Overall strategy data based on exam type
  const overallStrategyData = examType === 'JEE' ? [
    { strategy: 'Efficient', Math: 78, Physics: 70, Chemistry: 85 },
    { strategy: 'Trial & Error', Math: 15, Physics: 20, Chemistry: 10 },
    { strategy: 'Guessing', Math: 7, Physics: 10, Chemistry: 5 },
  ] : [
    { strategy: 'Efficient', Biology: 75, Physics: 70, Chemistry: 85 },
    { strategy: 'Trial & Error', Biology: 18, Physics: 20, Chemistry: 10 },
    { strategy: 'Guessing', Biology: 7, Physics: 10, Chemistry: 5 },
  ];

  // Radar chart data
  const radarData = [
    { subject: 'Accuracy', value: 82 },
    { subject: 'Speed', value: 75 },
    { subject: 'Focus', value: 78 },
    { subject: 'Transferability', value: 72 },
    { subject: 'Efficiency', value: 80 },
  ];

  // Cognitive Load vs Accuracy
  const cognitiveLoadData = [
    { load: 20, accuracy: 92 },
    { load: 35, accuracy: 86 },
    { load: 50, accuracy: 78 },
    { load: 65, accuracy: 70 },
    { load: 80, accuracy: 62 },
  ];

  // LTI Heatmap data
  const ltiHeatmap = [
    { concept: 'Kinematics', app1: 85, app2: 72, app3: 68 },
    { concept: 'Thermodynamics', app1: 78, app2: 85, app3: 70 },
    { concept: 'Algebra', app1: 65, app2: 70, app3: 72 },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-gray-800">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Deep dive into your learning patterns</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white border border-gray-200 shadow-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tests">Test History</TabsTrigger>
            <TabsTrigger value="strategy">Strategy Analysis</TabsTrigger>
            <TabsTrigger value="lti">LTI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Performance Radar */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Overall Performance Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#d1d5db" />
                    <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                    <PolarRadiusAxis stroke="#6b7280" />
                    <Radar name="Your Profile" dataKey="value" stroke="#0891b2" fill="#0891b2" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject-wise Accuracy */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Subject-wise Accuracy ({examType})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(filteredSubjectAccuracy).map(([subject, accuracy]) => (
                    <div key={subject}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-800">{subject}</span>
                        <span className="text-cyan-600">{accuracy}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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

            {/* Cognitive Load vs Accuracy */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Cognitive Load vs Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="load" name="Cognitive Load" stroke="#6b7280" label={{ value: 'Cognitive Load (%)', position: 'insideBottom', offset: -5, fill: '#6b7280' }} />
                    <YAxis dataKey="accuracy" name="Accuracy" stroke="#6b7280" label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    />
                    <Scatter data={cognitiveLoadData} fill="#8b5cf6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6 mt-6">
            {/* Test Selection */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Select a Test for Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {mockTestResults.map((test) => (
                    <button
                      key={test.id}
                      onClick={() => setSelectedTest(test)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTest.id === test.id
                          ? 'border-cyan-500 bg-cyan-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-cyan-300 hover:shadow'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {test.subject === 'Physics' ? '⚛️' : 
                           test.subject === 'Math' ? '📐' : 
                           test.subject === 'Chemistry' ? '🧪' : '🧬'}
                        </span>
                        <div>
                          <p className="text-gray-900">{test.subject}</p>
                          <p className="text-gray-600 text-sm">{test.chapter}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-cyan-100 text-cyan-700 border-cyan-300">{test.score}%</Badge>
                        <span className="text-gray-500 text-sm">{new Date(test.date).toLocaleDateString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Test Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Score</p>
                      <p className="text-3xl text-gray-900 mt-1">{selectedTest.score}%</p>
                    </div>
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-cyan-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Efficiency</p>
                      <p className="text-3xl text-gray-900 mt-1">{selectedTest.efficiency}%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">LTI Score</p>
                      <p className="text-3xl text-gray-900 mt-1">{selectedTest.lti}%</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Question Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm">Correct</p>
                      <p className="text-2xl text-green-900 mt-1">{selectedTest.correct}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-red-700 text-sm">Wrong</p>
                      <p className="text-2xl text-red-900 mt-1">{selectedTest.wrong}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-700 text-sm">Skipped</p>
                      <p className="text-2xl text-gray-900 mt-1">{selectedTest.unattempted}</p>
                    </div>
                  </div>

                  {/* Advanced Metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <p className="text-purple-700 text-sm">Efficiency Score</p>
                      <p className="text-3xl text-gray-900 mt-2">{selectedTest.efficiency}%</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                      <p className="text-yellow-700 text-sm">Cognitive Load</p>
                      <p className="text-3xl text-gray-900 mt-2">{selectedTest.cognitiveLoadIndex}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                      <p className="text-cyan-700 text-sm">LTI</p>
                      <p className="text-3xl text-gray-900 mt-2">{selectedTest.lti}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Emotional Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={selectedTest.emotionalTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="questionNumber" stroke="#6b7280" label={{ value: 'Question #', position: 'insideBottom', offset: -5, fill: '#6b7280' }} />
                      <YAxis stroke="#6b7280" label={{ value: 'Intensity', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        labelStyle={{ color: '#374151' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="intensity" 
                        stroke="#0891b2" 
                        strokeWidth={2}
                        dot={{ fill: '#0891b2', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Compared to Majority */}
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Questions Where You Differ from Majority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedTest.comparedToMajority.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        item.studentGotWrong && item.majorityGotRight 
                          ? 'bg-red-50 border-red-200' 
                          : 'bg-green-50 border-green-200'
                      }`}
                    >
                      <p className="text-gray-900">
                        Question {item.questionId.replace('q', '')}:{' '}
                        {item.studentGotWrong && item.majorityGotRight 
                          ? 'You got wrong, but majority got right - Review this!' 
                          : 'You got wrong, and majority also struggled'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Strategy Distribution by Subject ({examType})</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={overallStrategyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="strategy" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Legend />
                    {relevantSubjects.map((subject, index) => {
                      const colors = ['#0891b2', '#8b5cf6', '#10b981', '#f59e0b'];
                      return (
                        <Bar key={subject} dataKey={subject} fill={colors[index]} radius={[4, 4, 0, 0]} />
                      );
                    })}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lti" className="space-y-6 mt-6">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-600" />
                  Learning Transferability Index (LTI) Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Shows how well you apply concepts across different contexts
                </p>
                <div className="space-y-3">
                  {ltiHeatmap.map((row) => (
                    <div key={row.concept} className="flex items-center gap-3">
                      <div className="w-40 text-gray-900">{row.concept}</div>
                      <div className="flex-1 flex gap-2">
                        <div 
                          className="flex-1 h-16 rounded-lg flex items-center justify-center"
                          style={{ 
                            backgroundColor: `rgba(8, 145, 178, ${row.app1 / 100})`,
                            color: row.app1 > 50 ? 'white' : '#1f2937'
                          }}
                        >
                          {row.app1}%
                        </div>
                        <div 
                          className="flex-1 h-16 rounded-lg flex items-center justify-center"
                          style={{ 
                            backgroundColor: `rgba(8, 145, 178, ${row.app2 / 100})`,
                            color: row.app2 > 50 ? 'white' : '#1f2937'
                          }}
                        >
                          {row.app2}%
                        </div>
                        <div 
                          className="flex-1 h-16 rounded-lg flex items-center justify-center"
                          style={{ 
                            backgroundColor: `rgba(8, 145, 178, ${row.app3 / 100})`,
                            color: row.app3 > 50 ? 'white' : '#1f2937'
                          }}
                        >
                          {row.app3}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
