import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { User, ExamType } from '../types';
import { Badge } from './ui/badge';
import { Moon, Sun, Bell, Eye, Keyboard, Shield, User as UserIcon } from 'lucide-react';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export function Settings({ user, onUpdateUser }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [webcamTracking, setWebcamTracking] = useState(true);
  const [keystrokeTracking, setKeystrokeTracking] = useState(true);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSaveProfile = () => {
    onUpdateUser({
      ...user,
      name,
      email,
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-cyan-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Exam Type</Label>
              <div className="flex gap-3">
                <Badge className={
                  user.examType === 'JEE'
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                    : 'bg-slate-700 text-slate-400 border-slate-600'
                }>
                  JEE
                </Badge>
                <Badge className={
                  user.examType === 'NEET'
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                    : 'bg-slate-700 text-slate-400 border-slate-600'
                }>
                  NEET
                </Badge>
              </div>
              <p className="text-slate-500 text-sm">Contact admin to change exam type</p>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Account Stats</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Level</p>
                  <p className="text-white text-xl">{user.level}</p>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-slate-400 text-sm">XP</p>
                  <p className="text-white text-xl">{user.xp}</p>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Global Rank</p>
                  <p className="text-white text-xl">#{user.rank}</p>
                </div>
                <div className="p-3 bg-slate-900/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Streak</p>
                  <p className="text-white text-xl">{user.streak} days</p>
                </div>
              </div>
            </div>

            <Button onClick={handleSaveProfile} className="bg-cyan-500 hover:bg-cyan-600">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {darkMode ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-cyan-400" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Dark Mode</Label>
                <p className="text-slate-400 text-sm">Use dark theme across the platform</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Enable Notifications</Label>
                <p className="text-slate-400 text-sm">Receive updates about tests, challenges, and achievements</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Privacy */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Data Privacy & Tracking
            </CardTitle>
            <p className="text-slate-400 text-sm">
              Control what data is collected for AI-powered analytics
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-yellow-400" />
                  <Label className="text-white">Webcam-based Emotion Detection (PEC)</Label>
                </div>
                <p className="text-yellow-200 text-sm">
                  Tracks facial expressions to analyze emotional states during tests. Used for Focus Pulse and Emotion Timeline features.
                </p>
              </div>
              <Switch
                checked={webcamTracking}
                onCheckedChange={setWebcamTracking}
                className="ml-4"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Keyboard className="w-4 h-4 text-blue-400" />
                  <Label className="text-white">Keystroke & Mouse Tracking (MCA)</Label>
                </div>
                <p className="text-blue-200 text-sm">
                  Monitors typing patterns and mouse movements to classify problem-solving strategies (Efficient/Trial-Error/Guessing).
                </p>
              </div>
              <Switch
                checked={keystrokeTracking}
                onCheckedChange={setKeystrokeTracking}
                className="ml-4"
              />
            </div>

            <Separator className="bg-slate-700" />

            <div className="p-4 bg-slate-900/50 rounded-lg">
              <h4 className="text-white mb-2">Data Usage Policy</h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>All collected data is encrypted and stored securely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Data is used only for personalized learning analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>No personally identifiable information (PII) is shared with third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>You can request data deletion at any time</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
              <p className="text-red-200 text-sm">
                ⚠️ <strong>Important:</strong> Figma Make is not designed for collecting PII or securing highly sensitive data. 
                This is a demonstration platform. For production use, implement proper security measures.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
              Change Password
            </Button>
            <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-900/20">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
