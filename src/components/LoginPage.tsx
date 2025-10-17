import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ExamType } from '../types';

interface LoginPageProps {
  onLogin: (username: string, examType: ExamType) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [examType, setExamType] = useState<ExamType>('JEE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, examType);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4">
      <Card className="w-full max-w-md border-blue-200 bg-white/80 backdrop-blur shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🎓</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-gray-800">NeetJEEt</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Your Path to JEE & NEET Success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700">Select Exam Type</Label>
              <RadioGroup value={examType} onValueChange={(value) => setExamType(value as ExamType)}>
                <div className={`flex items-center space-x-2 p-3 border rounded-lg transition-all ${
                  examType === 'JEE' 
                    ? 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/50 shadow-md' 
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value="JEE" id="jee" className="border-gray-400" />
                  <Label htmlFor="jee" className="flex-1 cursor-pointer text-gray-800">
                    <div>JEE (Joint Entrance Examination)</div>
                    <div className="text-sm text-gray-600">Math, Physics, Chemistry</div>
                  </Label>
                </div>
                <div className={`flex items-center space-x-2 p-3 border rounded-lg transition-all ${
                  examType === 'NEET' 
                    ? 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-500/50 shadow-md' 
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}>
                  <RadioGroupItem value="NEET" id="neet" className="border-gray-400" />
                  <Label htmlFor="neet" className="flex-1 cursor-pointer text-gray-800">
                    <div>NEET (National Eligibility Entrance Test)</div>
                    <div className="text-sm text-gray-600">Biology, Physics, Chemistry</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
