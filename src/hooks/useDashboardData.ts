import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Mic, Users, TrendingUp, Calendar } from 'lucide-react';
=======
import { 
  Mic, 
  Users, 
  TrendingUp, 
  Calendar, 
  Play, 
  Target, 
  Award,
  Clock,
  BarChart3,
  MessageSquare
} from 'lucide-react';
>>>>>>> parent of 6f13a25 (Deployment fixes)

// Types
interface DashboardStats {
  totalSpeeches: number;
  debateWins: number;
  averageScore: number;
  practiceHours: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface RecentActivity {
  id: number;
  type: 'speech' | 'debate';
  title: string;
  score?: number;
  result?: string;
  duration: string;
  date: string;
}

export const useDashboardData = () => {
  // Dashboard Stats
  const [stats, setStats] = useState<DashboardStats>({
    totalSpeeches: 47,
    debateWins: 23,
    averageScore: 8.7,
    practiceHours: 156,
    weeklyGoal: 5,
    weeklyProgress: 3
  });

  // Recent Activities
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'speech',
      title: 'Persuasive Speech Practice',
      score: 8.5,
      duration: '12 min',
      date: '2 hours ago'
    },
    {
      id: 2,
      type: 'debate',
      title: 'Policy Debate - Healthcare Reform',
      result: 'Win',
      duration: '45 min',
      date: 'Yesterday'
    },
    {
      id: 3,
      type: 'speech',
      title: 'Impromptu Speech Challenge',
      score: 7.8,
      duration: '8 min',
      date: '2 days ago'
    }
  ]);

  // Quick Actions
  const [quickActions] = useState([
    { label: 'Start Practice', icon: Mic },
    { label: 'Join Debate', icon: Users },
    { label: 'View Analytics', icon: TrendingUp },
    { label: 'Set Goal', icon: Calendar }
  ]);

  // Update functions
  const updateStats = (newStats: Partial<DashboardStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const addActivity = (activity: Omit<RecentActivity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Date.now()
    };
    setRecentActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep only 5 most recent
  };

  const updateWeeklyProgress = (progress: number) => {
    setStats(prev => ({ ...prev, weeklyProgress: progress }));
  };

  // Simulate real-time updates (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional activity updates
      if (Math.random() > 0.95) {
        updateWeeklyProgress(stats.weeklyProgress + 1);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [stats.weeklyProgress]);

  return {
    // Data
    stats,
    recentActivities,
    quickActions,
    
    // Actions
    updateStats,
    addActivity,
    updateWeeklyProgress,
    
    // Computed values
    weeklyProgressPercentage: Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)
  };
}; 