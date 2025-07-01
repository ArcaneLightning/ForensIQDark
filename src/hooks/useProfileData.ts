import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  level: string;
  points: number;
  rank: string;
  bio: string;
  preferences: {
    practiceTime: string;
    difficulty: string;
    topics: string[];
    language: string;
    timezone: string;
  };
}

interface Achievement {
  name: string;
  description: string;
  earned: string;
  icon: any;
}

interface ProfileStats {
  totalSessions: number;
  totalHours: number;
  averageScore: number;
  winRate: number;
  streak: number;
  rank: string;
}

interface Notifications {
  email: boolean;
  push: boolean;
  weekly: boolean;
  achievements: boolean;
  reminders: boolean;
}

export const useProfileData = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState<Notifications>({
    email: true,
    push: false,
    weekly: true,
    achievements: true,
    reminders: false
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: '/api/placeholder/100/100',
    joinDate: 'March 2024',
    level: 'Advanced',
    points: 2847,
    rank: 'Gold',
    bio: 'Passionate about public speaking and debate. Always looking to improve my communication skills and help others do the same.',
    preferences: {
      practiceTime: '30 minutes',
      difficulty: 'Intermediate',
      topics: ['Technology', 'Politics', 'Environment', 'Education'],
      language: 'English',
      timezone: 'UTC-5'
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    { name: 'First Speech', description: 'Completed your first speech', earned: 'March 15, 2024', icon: Star },
    { name: 'Week Warrior', description: '7 days of consecutive practice', earned: 'March 22, 2024', icon: Target },
    { name: 'High Scorer', description: 'Achieved 9.0+ score', earned: 'March 28, 2024', icon: Award },
    { name: 'Debate Champion', description: 'Won 10 debates', earned: 'April 5, 2024', icon: Award },
    { name: 'Consistent Performer', description: '30 days of practice', earned: 'April 12, 2024', icon: Clock }
  ]);

  const [stats, setStats] = useState<ProfileStats>({
    totalSessions: 156,
    totalHours: 89,
    averageScore: 8.7,
    winRate: 68,
    streak: 12,
    rank: 'Top 15%'
  });

  return {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    notifications,
    setNotifications,
    userProfile,
    setUserProfile,
    achievements,
    setAchievements,
    stats,
    setStats
  };
}; 