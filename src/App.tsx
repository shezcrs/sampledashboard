import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TakeTest } from './components/TakeTest';
import { Analytics } from './components/Analytics';
import { Learning } from './components/Learning';
import { Challenges } from './components/Challenges';
import { ParentDashboard } from './components/ParentDashboard';
import { Settings } from './components/Settings';
import { Toaster } from './components/ui/sonner';
import { mockUser } from './utils/mockData';
import { User, ExamType } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState<User>(mockUser);

  const handleLogin = (username: string, examType: ExamType) => {
    // Update user with selected exam type
    setUser({
      ...mockUser,
      name: username,
      examType: examType,
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          examType={user.examType}
        />
        
        {currentPage === 'dashboard' && <Dashboard user={user} onNavigate={handleNavigate} />}
        {currentPage === 'test' && <TakeTest examType={user.examType} onNavigate={handleNavigate} />}
        {currentPage === 'analytics' && <Analytics examType={user.examType} />}
        {currentPage === 'learning' && <Learning examType={user.examType} />}
        {currentPage === 'challenges' && <Challenges />}
        {currentPage === 'parent' && <ParentDashboard user={user} />}
        {currentPage === 'settings' && <Settings user={user} onUpdateUser={handleUpdateUser} />}
      </div>
      <Toaster />
    </>
  );
}
