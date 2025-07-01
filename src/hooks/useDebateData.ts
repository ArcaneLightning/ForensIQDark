import { useState } from 'react';
import { Users, Clock, Trophy, MessageSquare, Mic, MicOff, Play, Pause, Settings, BarChart3, Target, Award, Bot } from 'lucide-react';

export interface DebateRoom {
  id: number;
  topic: string;
  participants: number;
  maxParticipants: number;
  difficulty: string;
  timeLimit: number;
  status: string;
  category: string;
  isAI?: boolean;
}

interface UserStats {
  totalDebates: number;
  wins: number;
  winRate: number;
  averageScore: number;
  rank: string;
  points: number;
}

interface RecentDebate {
  id: number;
  topic: string;
  opponent: string;
  score: number;
  date: string;
  result: 'Win' | 'Loss';
}

interface AIDebateState {
  isActive: boolean;
  currentTurn: 'user' | 'ai';
  aiResponse: string;
  userArguments: string[];
  aiArguments: string[];
  debateTopic: string;
  timeRemaining: number;
}

export const useDebateData = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [selectedRoom, setSelectedRoom] = useState<DebateRoom | null>(null);
  const [isInDebate, setIsInDebate] = useState(false);
  const [debateTime, setDebateTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiDebate, setAiDebate] = useState<AIDebateState>({
    isActive: false,
    currentTurn: 'user',
    aiResponse: '',
    userArguments: [],
    aiArguments: [],
    debateTopic: '',
    timeRemaining: 300 // 5 minutes
  });

  const [debateRooms, setDebateRooms] = useState<DebateRoom[]>([
    {
      id: 1,
      topic: 'Should social media platforms be held accountable for misinformation?',
      participants: 8,
      maxParticipants: 12,
      difficulty: 'Intermediate',
      timeLimit: 15,
      status: 'active',
      category: 'Technology'
    },
    {
      id: 2,
      topic: 'Is remote work more productive than office work?',
      participants: 5,
      maxParticipants: 10,
      difficulty: 'Beginner',
      timeLimit: 10,
      status: 'waiting',
      category: 'Business'
    },
    {
      id: 3,
      topic: 'Should college education be free for all students?',
      participants: 12,
      maxParticipants: 12,
      difficulty: 'Advanced',
      timeLimit: 20,
      status: 'full',
      category: 'Education'
    },
    {
      id: 4,
      topic: 'Are electric vehicles truly environmentally friendly?',
      participants: 6,
      maxParticipants: 8,
      difficulty: 'Intermediate',
      timeLimit: 12,
      status: 'active',
      category: 'Environment'
    }
  ]);

  const [userStats, setUserStats] = useState<UserStats>({
    totalDebates: 47,
    wins: 23,
    winRate: 48.9,
    averageScore: 8.2,
    rank: 'Gold',
    points: 1250
  });

  const [recentDebates, setRecentDebates] = useState<RecentDebate[]>([
    {
      id: 1,
      topic: 'Should social media be regulated?',
      opponent: 'Alex Johnson',
      score: 8.5,
      date: '2024-01-15',
      result: 'Win'
    },
    {
      id: 2,
      topic: 'The future of remote work',
      opponent: 'Sarah Chen',
      score: 7.8,
      date: '2024-01-12',
      result: 'Loss'
    },
    {
      id: 3,
      topic: 'Climate change responsibility',
      opponent: 'Mike Rodriguez',
      score: 9.1,
      date: '2024-01-10',
      result: 'Win'
    }
  ]);

  const startAIDebate = (topic: string) => {
    setAiDebate({
      isActive: true,
      currentTurn: 'user',
      aiResponse: '',
      userArguments: [],
      aiArguments: [],
      debateTopic: topic,
      timeRemaining: 300
    });
    setIsInDebate(true);
  };

  const endAIDebate = () => {
    setAiDebate({
      isActive: false,
      currentTurn: 'user',
      aiResponse: '',
      userArguments: [],
      aiArguments: [],
      debateTopic: '',
      timeRemaining: 300
    });
    setIsInDebate(false);
  };

  const addUserArgument = (argument: string) => {
    setAiDebate(prev => ({
      ...prev,
      userArguments: [...prev.userArguments, argument],
      currentTurn: 'ai',
      aiResponse: 'I understand your point. Let me respond to that...'
    }));
  };

  return {
    activeTab,
    setActiveTab,
    selectedRoom,
    setSelectedRoom,
    isInDebate,
    setIsInDebate,
    debateTime,
    setDebateTime,
    isSpeaking,
    setIsSpeaking,
    debateRooms,
    setDebateRooms,
    userStats,
    setUserStats,
    recentDebates,
    setRecentDebates,
    aiDebate,
    setAiDebate,
    startAIDebate,
    endAIDebate,
    addUserArgument
  };
}; 