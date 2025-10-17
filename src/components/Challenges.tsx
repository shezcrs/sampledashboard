import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, Target, TrendingUp, Clock, Users, Zap } from 'lucide-react';

export function Challenges() {
  const applicationChallenges = [
    {
      id: 1,
      title: 'Kinematics in Real-World Scenarios',
      description: 'Apply projectile motion concepts to solve budget optimization problems',
      subject: 'Physics',
      difficulty: 'Advanced',
      ltiBoost: 15,
      timeEstimate: '45 min',
      participants: 234,
      completed: false,
    },
    {
      id: 2,
      title: 'Chemical Equilibrium in Industry',
      description: 'Design an industrial process using equilibrium principles',
      subject: 'Chemistry',
      difficulty: 'Mains',
      ltiBoost: 20,
      timeEstimate: '60 min',
      participants: 189,
      completed: false,
    },
    {
      id: 3,
      title: 'Calculus for Economics Models',
      description: 'Use derivatives and integrals to analyze market behavior',
      subject: 'Math',
      difficulty: 'Advanced',
      ltiBoost: 18,
      timeEstimate: '50 min',
      participants: 312,
      completed: true,
    },
  ];

  const weeklyChallenge = {
    title: 'Cross-Domain Innovation Week',
    description: 'Combine concepts from all subjects to solve a complex real-world problem',
    daysLeft: 3,
    reward: '500 XP + Transfer Master Badge',
    participants: 1247,
  };

  const leaderboard = [
    { rank: 1, name: 'Priya K.', score: 2450, efficiency: 92 },
    { rank: 2, name: 'Rahul S.', score: 2380, efficiency: 89 },
    { rank: 3, name: 'Alex (You)', score: 2250, efficiency: 86 },
    { rank: 4, name: 'Sneha M.', score: 2180, efficiency: 88 },
    { rank: 5, name: 'Arjun P.', score: 2120, efficiency: 85 },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-white">Application Challenges</h1>
          <p className="text-slate-400 mt-1">Test your Learning Transferability Index (LTI)</p>
        </div>

        {/* Weekly Challenge Spotlight */}
        <Card className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl text-white">{weeklyChallenge.title}</h2>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Weekly Challenge
                  </Badge>
                </div>
                <p className="text-amber-100 mb-4">{weeklyChallenge.description}</p>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-amber-200">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{weeklyChallenge.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{weeklyChallenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-200">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">{weeklyChallenge.reward}</span>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                  Accept Challenge
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Challenges */}
        <div>
          <h2 className="text-xl text-white mb-4">Available Challenges</h2>
          <div className="grid gap-4">
            {applicationChallenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={`border-slate-700 ${
                  challenge.completed 
                    ? 'bg-slate-800/50' 
                    : 'bg-slate-800 hover:border-cyan-500/50 transition-all'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{challenge.title}</h3>
                        {challenge.completed && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            ✓ Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-400 mb-4">{challenge.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          {challenge.subject}
                        </Badge>
                        <Badge className={
                          challenge.difficulty === 'Advanced'
                            ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }>
                          {challenge.difficulty}
                        </Badge>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{challenge.timeEstimate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{challenge.participants} participants</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-green-400">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm">+{challenge.ltiBoost}% LTI Boost</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      {challenge.completed ? (
                        <Button variant="outline" className="border-slate-600 text-slate-400">
                          Review
                        </Button>
                      ) : (
                        <Button className="bg-cyan-500 hover:bg-cyan-600">
                          Start Challenge
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Adaptive Leaderboard
            </CardTitle>
            <p className="text-slate-400 text-sm">
              Rankings based on accuracy + efficiency + emotional calibration
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div 
                  key={entry.rank}
                  className={`p-4 rounded-lg flex items-center justify-between ${
                    entry.name.includes('You')
                      ? 'bg-cyan-900/30 border border-cyan-700/50'
                      : 'bg-slate-900/50 border border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      entry.rank === 1 ? 'bg-amber-500/20 text-amber-400' :
                      entry.rank === 2 ? 'bg-slate-400/20 text-slate-300' :
                      entry.rank === 3 ? 'bg-orange-600/20 text-orange-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      <span className="font-bold">#{entry.rank}</span>
                    </div>
                    <div>
                      <p className="text-white">{entry.name}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400">Score: <span className="text-cyan-400">{entry.score}</span></span>
                        <span className="text-slate-400">Efficiency: <span className="text-purple-400">{entry.efficiency}%</span></span>
                      </div>
                    </div>
                  </div>
                  {entry.rank <= 3 && (
                    <div className="text-2xl">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenge Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-3xl text-white mb-1">8</p>
              <p className="text-slate-400 text-sm">Challenges Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-3xl text-cyan-400 mb-1">+45%</p>
              <p className="text-slate-400 text-sm">Avg. LTI Improvement</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-2">⭐</div>
              <p className="text-3xl text-white mb-1">2250</p>
              <p className="text-slate-400 text-sm">Challenge Points</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
