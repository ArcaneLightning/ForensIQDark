import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Clock, 
  BarChart3,
  Calendar,
  Activity,
  Star,
  Users,
  MessageSquare,
  Mic
} from 'lucide-react';

// Types
interface PerformanceMetric {
  current: number;
  previous: number;
  change: string;
  trend: 'up' | 'down';
}

interface PerformanceData {
  overall: PerformanceMetric;
  clarity: PerformanceMetric;
  confidence: PerformanceMetric;
  structure: PerformanceMetric;
  delivery: PerformanceMetric;
}

interface WeeklyProgress {
  day: string;
  speeches: number;
  debates: number;
  score: number;
}

interface TopTopic {
  topic: string;
  count: number;
  avgScore: number;
}

interface Achievement {
  name: string;
  description: string;
  earned: string;
  icon: any;
}

interface PerformanceTime {
  timeSlot: string;
  averageScore: number;
}

interface ImprovementArea {
  area: string;
  change: string;
}

export const useAnalyticsData = () => {
  // Time range and metric selection
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  // Performance data
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    overall: {
      current: 8.7,
      previous: 8.2,
      change: '+6.1%',
      trend: 'up'
    },
    clarity: {
      current: 8.9,
      previous: 8.5,
      change: '+4.7%',
      trend: 'up'
    },
    confidence: {
      current: 8.3,
      previous: 7.8,
      change: '+6.4%',
      trend: 'up'
    },
    structure: {
      current: 8.6,
      previous: 8.9,
      change: '-3.4%',
      trend: 'down'
    },
    delivery: {
      current: 8.8,
      previous: 8.1,
      change: '+8.6%',
      trend: 'up'
    }
  });

  // Weekly progress
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([
    { day: 'Mon', speeches: 3, debates: 2, score: 8.2 },
    { day: 'Tue', speeches: 2, debates: 1, score: 8.5 },
    { day: 'Wed', speeches: 4, debates: 3, score: 8.8 },
    { day: 'Thu', speeches: 1, debates: 2, score: 7.9 },
    { day: 'Fri', speeches: 3, debates: 1, score: 8.6 },
    { day: 'Sat', speeches: 2, debates: 0, score: 8.3 },
    { day: 'Sun', speeches: 1, debates: 1, score: 8.7 }
  ]);

  // Top topics
  const [topTopics, setTopTopics] = useState<TopTopic[]>([
    { topic: 'Climate Change', count: 12, avgScore: 8.4 },
    { topic: 'AI & Technology', count: 10, avgScore: 8.7 },
    { topic: 'Education Reform', count: 8, avgScore: 8.1 },
    { topic: 'Healthcare Policy', count: 7, avgScore: 7.9 },
    { topic: 'Economic Inequality', count: 6, avgScore: 8.3 }
  ]);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    { name: 'First Speech', description: 'Completed your first speech', earned: '2 weeks ago', icon: Mic },
    { name: 'Debate Champion', description: 'Won 10 debates', earned: '1 week ago', icon: Award },
    { name: 'Consistent Performer', description: '7 days of practice', earned: '3 days ago', icon: Target },
    { name: 'High Scorer', description: 'Achieved 9.0+ score', earned: 'Yesterday', icon: Star }
  ]);

  // Performance times
  const [performanceTimes, setPerformanceTimes] = useState<PerformanceTime[]>([
    { timeSlot: 'Morning (9-12 AM)', averageScore: 9.1 },
    { timeSlot: 'Afternoon (2-5 PM)', averageScore: 8.3 },
    { timeSlot: 'Evening (7-10 PM)', averageScore: 7.8 }
  ]);

  // Improvement areas
  const [improvementAreas, setImprovementAreas] = useState<ImprovementArea[]>([
    { area: 'Voice Modulation', change: '-12%' },
    { area: 'Eye Contact', change: '+8%' },
    { area: 'Gesture Usage', change: '+3%' }
  ]);

  // Key metrics
  const [keyMetrics, setKeyMetrics] = useState({
    totalSessions: 156,
    averageScore: 8.7,
    practiceHours: 89,
    winRate: 68
  });

  // Helper functions
  const getMetricData = () => performanceData[selectedMetric as keyof PerformanceData];

  const updatePerformanceData = (metric: keyof PerformanceData, data: Partial<PerformanceMetric>) => {
    setPerformanceData(prev => ({
      ...prev,
      [metric]: { ...prev[metric], ...data }
    }));
  };

  const addAchievement = (achievement: Omit<Achievement, 'earned'>) => {
    const newAchievement = {
      ...achievement,
      earned: 'Just now'
    };
    setAchievements(prev => [newAchievement, ...prev.slice(0, 3)]); // Keep only 4 most recent
  };

  const updateWeeklyProgress = (day: string, updates: Partial<WeeklyProgress>) => {
    setWeeklyProgress(prev => 
      prev.map(item => 
        item.day === day ? { ...item, ...updates } : item
      )
    );
  };

  return {
    // State
    timeRange,
    selectedMetric,
    performanceData,
    weeklyProgress,
    topTopics,
    achievements,
    performanceTimes,
    improvementAreas,
    keyMetrics,
    
    // Setters
    setTimeRange,
    setSelectedMetric,
    
    // Actions
    updatePerformanceData,
    addAchievement,
    updateWeeklyProgress,
    
    // Computed values
    getMetricData,
    
    // Helper functions
    getTrendIcon: (trend: 'up' | 'down') => trend === 'up' ? TrendingUp : TrendingDown,
    getTrendColor: (trend: 'up' | 'down') => trend === 'up' ? 'text-green-400' : 'text-red-400'
  };
}; 