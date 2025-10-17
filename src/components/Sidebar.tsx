import { Home, FileText, BarChart3, BookOpen, Trophy, Users, Settings, LogOut } from 'lucide-react';
import { cn } from './ui/utils';
import { ExamType } from '../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  examType: ExamType;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'test', label: 'Take Test', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'challenges', label: 'Application Challenges', icon: Trophy },
  { id: 'parent', label: 'Parent', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, onLogout, examType }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <h1 className="text-gray-800">NeetJEEt</h1>
            <p className="text-xs text-gray-500">{examType} Prep</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
