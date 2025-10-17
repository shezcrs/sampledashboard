import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExamType, Subject, TestLevel, Chapter } from '../types';
import { mockChapters } from '../utils/mockData';
import { TestInterface } from './TestInterface';
import { BookOpen, AlertCircle, Target, Brain } from 'lucide-react';

interface TakeTestProps {
  examType: ExamType;
  onNavigate: (page: string) => void;
}

export function TakeTest({ examType, onNavigate }: TakeTestProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<TestLevel>('Mains');
  const [testStarted, setTestStarted] = useState(false);

  // Filter subjects based on exam type
  const availableSubjects: Subject[] = examType === 'JEE' 
    ? ['Math', 'Physics', 'Chemistry']
    : ['Biology', 'Physics', 'Chemistry'];

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleTestComplete = () => {
    setTestStarted(false);
    setSelectedChapter(null);
    setSelectedSubject(null);
    onNavigate('analytics');
  };

  if (testStarted && selectedChapter) {
    return (
      <TestInterface
        chapter={selectedChapter}
        level={selectedLevel}
        onComplete={handleTestComplete}
        onCancel={() => setTestStarted(false)}
      />
    );
  }

  if (selectedSubject) {
    const chapters = mockChapters[selectedSubject];

    return (
      <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-800">{selectedSubject} - Select Chapter</h1>
              <p className="text-gray-600 mt-1">Choose a chapter to practice</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectedSubject(null)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              ← Back to Subjects
            </Button>
          </div>

          {/* Level Selection */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Button
                  onClick={() => setSelectedLevel('Mains')}
                  className={selectedLevel === 'Mains' 
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
                >
                  Mains Level
                </Button>
                <Button
                  onClick={() => setSelectedLevel('Advanced')}
                  className={selectedLevel === 'Advanced' 
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
                >
                  Advanced Level
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Chapters */}
          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className="bg-slate-800 border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedChapter(chapter)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl text-white">{chapter.name}</h3>
                        {chapter.needsAttention && (
                          <Badge className={
                            chapter.needsAttention === 'proficiency' 
                              ? 'bg-red-500/20 text-red-400 border-red-500/30'
                              : chapter.needsAttention === 'efficiency'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : chapter.needsAttention === 'lti'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }>
                            {chapter.needsAttention === 'proficiency' ? (
                              <><AlertCircle className="w-3 h-3 mr-1" /> Low Proficiency</>
                            ) : chapter.needsAttention === 'efficiency' ? (
                              <><AlertCircle className="w-3 h-3 mr-1" /> Low Efficiency</>
                            ) : chapter.needsAttention === 'lti' ? (
                              <><Target className="w-3 h-3 mr-1" /> LTI Challenge Recommended</>
                            ) : (
                              <><Brain className="w-3 h-3 mr-1" /> High Anxiety Risk</>
                            )}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex gap-6 mt-4">
                        <div>
                          <p className="text-slate-400 text-sm">Proficiency</p>
                          <p className="text-white">{chapter.proficiency}%</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Efficiency</p>
                          <p className="text-white">{chapter.efficiency}%</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">LTI Potential</p>
                          <Badge className={
                            chapter.ltiPotential === 'High'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : chapter.ltiPotential === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                          }>
                            {chapter.ltiPotential}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-cyan-500 hover:bg-cyan-600">
                      Start Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-white">Take a Test</h1>
          <p className="text-slate-400 mt-1">
            Available subjects for {examType} students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableSubjects.map((subject) => (
            <Card
              key={subject}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer group"
              onClick={() => setSelectedSubject(subject)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                    subject === 'Math' ? 'bg-purple-500/20' :
                    subject === 'Physics' ? 'bg-blue-500/20' :
                    subject === 'Chemistry' ? 'bg-green-500/20' :
                    'bg-pink-500/20'
                  }`}>
                    <span className="text-4xl">
                      {subject === 'Math' ? '📐' :
                       subject === 'Physics' ? '⚛️' :
                       subject === 'Chemistry' ? '🧪' :
                       '🧬'}
                    </span>
                  </div>
                  <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl text-white mb-2">{subject}</h3>
                <p className="text-slate-400 text-sm">
                  {mockChapters[subject].length} chapters available
                </p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Avg. Proficiency</span>
                  <span className="text-cyan-400">
                    {Math.round(mockChapters[subject].reduce((sum, ch) => sum + ch.proficiency, 0) / mockChapters[subject].length)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
