import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AlertCircle, Target, Brain, TrendingDown, Video, FileText, CheckCircle } from 'lucide-react';
import { ExamType } from '../types';

interface LearningProps {
  examType: ExamType;
}

export function Learning({ examType }: LearningProps) {
  // Filter topics based on exam type
  const allLowEfficiencyTopics = [
    {
      id: 1,
      subject: 'Math',
      topic: 'Trigonometry - Identities',
      insight: 'Solved correctly, but used trial-and-error strategy',
      proficiency: 88,
      efficiency: 60,
      resources: 3,
    },
    {
      id: 2,
      subject: 'Physics',
      topic: 'Electrostatics - Gauss Law',
      insight: 'Multiple attempts needed, conceptual gaps detected',
      proficiency: 75,
      efficiency: 55,
      resources: 4,
    },
    {
      id: 3,
      subject: 'Biology',
      topic: 'Cell Division - Meiosis',
      insight: 'Correct answers but inefficient memorization approach',
      proficiency: 82,
      efficiency: 58,
      resources: 3,
    },
  ];

  const allLowLTITopics = [
    {
      id: 1,
      subject: 'Math',
      topic: 'Quadratic Equations',
      insight: 'Can recall facts but struggles with novel applications',
      lti: 65,
      applications: ['Optimization', 'Trajectory', 'Economics'],
    },
    {
      id: 2,
      subject: 'Chemistry',
      topic: 'Chemical Equilibrium',
      insight: 'Theory strong, application to real-world scenarios weak',
      lti: 58,
      applications: ['Buffer Solutions', 'Industrial Processes'],
    },
    {
      id: 3,
      subject: 'Biology',
      topic: 'Genetics - DNA Replication',
      insight: 'Memorizes steps but struggles with applying to new scenarios',
      lti: 62,
      applications: ['Genetic Engineering', 'Disease Diagnosis'],
    },
  ];

  const allHighAnxietyTopics = [
    {
      id: 1,
      subject: 'Physics',
      topic: 'Rotational Dynamics',
      insight: 'Score drops significantly when stress is detected',
      avgStress: 75,
      practiceTests: 8,
    },
    {
      id: 2,
      subject: 'Biology',
      topic: 'Human Anatomy',
      insight: 'High stress levels during detailed recall questions',
      avgStress: 70,
      practiceTests: 6,
    },
  ];

  // Filter based on exam type
  const relevantSubjects = examType === 'JEE' 
    ? ['Math', 'Physics', 'Chemistry'] 
    : ['Biology', 'Physics', 'Chemistry'];

  const lowEfficiencyTopics = allLowEfficiencyTopics.filter(topic => 
    relevantSubjects.includes(topic.subject)
  );

  const lowLTITopics = allLowLTITopics.filter(topic => 
    relevantSubjects.includes(topic.subject)
  );

  const highAnxietyTopics = allHighAnxietyTopics.filter(topic => 
    relevantSubjects.includes(topic.subject)
  );

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-gray-800">Personalized Learning</h1>
          <p className="text-gray-600 mt-1">Focus areas identified by AI analysis for {examType}</p>
        </div>

        {/* Low Efficiency - Strategy Guidance Needed */}
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Low Efficiency (Strategy Guidance Needed)
            </CardTitle>
            <p className="text-yellow-800 text-sm">
              These topics show correct answers but inefficient problem-solving approach
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowEfficiencyTopics.map((topic) => (
              <Card key={topic.id} className="bg-white border-yellow-200 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          {topic.subject}
                        </Badge>
                        <h3 className="text-xl text-gray-900">{topic.topic}</h3>
                      </div>
                      <p className="text-yellow-800 text-sm mb-4">💡 {topic.insight}</p>
                      <div className="flex gap-6">
                        <div>
                          <p className="text-gray-600 text-sm">Proficiency</p>
                          <p className="text-gray-900">{topic.proficiency}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Efficiency</p>
                          <p className="text-yellow-600">{topic.efficiency}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-900 text-sm mb-3">Recommended Resources:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 justify-start">
                        <Video className="w-4 h-4 mr-2" />
                        Strategy Video
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Method Guide
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        Practice Set
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Low LTI - Application Practice Needed */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Low LTI (Application Practice Needed)
            </CardTitle>
            <p className="text-blue-800 text-sm">
              Strong foundational knowledge, but needs work on transferring concepts to new contexts
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowLTITopics.map((topic) => (
              <Card key={topic.id} className="bg-white border-blue-200 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                          {topic.subject}
                        </Badge>
                        <h3 className="text-xl text-gray-900">{topic.topic}</h3>
                      </div>
                      <p className="text-blue-800 text-sm mb-4">💡 {topic.insight}</p>
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm mb-2">LTI Score</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
                              style={{ width: `${topic.lti}%` }}
                            />
                          </div>
                          <span className="text-blue-600">{topic.lti}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm mb-2">Application Areas:</p>
                        <div className="flex flex-wrap gap-2">
                          {topic.applications.map((app) => (
                            <Badge key={app} className="bg-gray-100 text-gray-700 border-gray-300">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700 justify-start shadow-md">
                        <Target className="w-4 h-4 mr-2" />
                        Start Application Challenge
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 justify-start">
                        <Video className="w-4 h-4 mr-2" />
                        Cross-Domain Examples
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* High Anxiety Risk - Emotional Support Needed */}
        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-300 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Brain className="w-5 h-5 text-red-600" />
              High Anxiety Risk (Emotional Support Needed)
            </CardTitle>
            <p className="text-red-800 text-sm">
              Performance affected by stress and anxiety in these areas
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {highAnxietyTopics.map((topic) => (
              <Card key={topic.id} className="bg-white border-red-200 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-red-100 text-red-800 border-red-300">
                          {topic.subject}
                        </Badge>
                        <h3 className="text-xl text-gray-900">{topic.topic}</h3>
                      </div>
                      <p className="text-red-800 text-sm mb-4">💡 {topic.insight}</p>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-gray-600 text-sm">Avg. Stress Level</p>
                          <p className="text-red-600">{topic.avgStress}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Practice Tests</p>
                          <p className="text-gray-900">{topic.practiceTests}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-900 text-sm mb-3">Recommended Approach:</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>Practice with reduced time pressure initially</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>Break down complex problems into smaller steps</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span>Use breathing exercises before attempting questions</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 justify-start">
                        <Brain className="w-4 h-4 mr-2" />
                        Stress Management Tips
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        Low-Pressure Practice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              Your Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-3xl text-gray-900 mb-1">12</p>
                <p className="text-gray-600 text-sm">Topics Completed</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                <div className="text-4xl mb-2">⏱️</div>
                <p className="text-3xl text-gray-900 mb-1">24h</p>
                <p className="text-gray-600 text-sm">Practice Time</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-3xl text-gray-900 mb-1">5</p>
                <p className="text-gray-600 text-sm">Topics in Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
