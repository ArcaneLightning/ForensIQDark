import { useState, useEffect } from 'react';

// Types for our data structures
interface StatsData {
  practiceSessions: number;
  activeUsers: number;
  topicsAvailable: number;
  averageImprovement: number;
  practiceSessionsGrowth: string;
  activeUsersGrowth: string;
  topicsGrowth: string;
  improvementGrowth: string;
}

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

interface Testimonial {
  id: string;
  rating: number;
  text: string;
  author: {
    initials: string;
    name: string;
    role: string;
    avatarColor: string;
  };
}

interface FeatureData {
  key: string;
  icon: string;
  color: string;
  title: string;
  desc: string;
  benefits: string[];
}

export const useForensIQData = () => {
  // Stats state
  const [stats, setStats] = useState<StatsData>({
    practiceSessions: 10000,
    activeUsers: 5000,
    topicsAvailable: 100,
    averageImprovement: 40,
    practiceSessionsGrowth: '+15% this month',
    activeUsersGrowth: '+25% growth',
    topicsGrowth: 'New topics weekly',
    improvementGrowth: 'In 3 months'
  });

  // Feature selection state
  const [selectedFeature, setSelectedFeature] = useState<string>('speech');

  // Pricing state
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([
    {
      name: 'Free',
      price: 0,
      period: '/forever',
      features: [
        '5 practice sessions per month',
        'Basic AI feedback',
        '3 debate topics',
        'Basic analytics'
      ],
      ctaText: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: 19,
      period: '/month',
      features: [
        'Unlimited practice sessions',
        'Advanced AI analysis',
        'All debate topics',
        'Team collaboration',
        'Advanced analytics',
        'Achievement system'
      ],
      isPopular: true,
      ctaText: 'Start Free Trial'
    },
    {
      name: 'Team',
      price: 49,
      period: '/month',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Team analytics',
        'Custom topics',
        'Priority support',
        'API access'
      ],
      ctaText: 'Start Free Trial'
    }
  ]);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      rating: 5,
      text: "ForensIQ transformed how I train my students. The AI feedback is incredibly accurate and the analytics help track real progress.",
      author: {
        initials: 'SJ',
        name: 'Sarah Johnson',
        role: 'Public Speaking Coach',
        avatarColor: 'bg-cyan-900'
      }
    },
    {
      id: '2',
      rating: 5,
      text: "Our debate team improved dramatically using ForensIQ. The AI simulator provides realistic practice and the team features are excellent.",
      author: {
        initials: 'MC',
        name: 'Michael Chen',
        role: 'Debate Team Captain',
        avatarColor: 'bg-green-900'
      }
    },
    {
      id: '3',
      rating: 5,
      text: "The speech analysis helped me identify areas I never knew needed improvement. My presentations are now much more engaging.",
      author: {
        initials: 'ER',
        name: 'Emma Rodriguez',
        role: 'TEDx Speaker',
        avatarColor: 'bg-purple-900'
      }
    }
  ]);

  // Features data state
  const [features, setFeatures] = useState<FeatureData[]>([
    {
      key: 'speech',
      icon: '🎤',
      color: 'text-cyan-400',
      title: 'AI Speech Analysis',
      desc: 'Record your speeches and receive detailed feedback on clarity, pace, volume, tone, and engagement with real-time analysis.',
      benefits: ['Real-time feedback', 'Detailed metrics', 'Personalized tips']
    },
    {
      key: 'debate',
      icon: '🗣️',
      color: 'text-green-400',
      title: 'AI Debate Simulator',
      desc: 'Engage in structured debates with an intelligent AI opponent across various topics and difficulty levels.',
      benefits: ['Adaptive difficulty', 'Multiple topics', 'Performance tracking']
    },
    {
      key: 'team',
      icon: '👥',
      color: 'text-purple-400',
      title: 'Team Collaboration',
      desc: 'Create debate teams, manage members, and track collective progress together with built-in communication tools.',
      benefits: ['Team challenges', 'Member management', 'Progress sharing']
    },
    {
      key: 'analytics',
      icon: '📊',
      color: 'text-orange-400',
      title: 'Advanced Analytics',
      desc: 'Track your improvement over time with detailed performance metrics, insights, and personalized recommendations.',
      benefits: ['Progress tracking', 'Skill breakdown', 'Goal setting']
    },
    {
      key: 'achievements',
      icon: '🏆',
      color: 'text-yellow-300',
      title: 'Achievement System',
      desc: 'Earn badges and track milestones as you progress in your speaking journey with gamified learning.',
      benefits: ['Milestone badges', 'Leaderboards', 'Rewards system']
    },
    {
      key: 'goals',
      icon: '🎯',
      color: 'text-pink-400',
      title: 'Personalized Goals',
      desc: 'Set custom goals and receive tailored recommendations for improvement based on your performance data.',
      benefits: ['Custom goals', 'Smart recommendations', 'Progress alerts']
    }
  ]);

  // Simulate real-time updates for stats (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        practiceSessions: prev.practiceSessions + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Helper functions
  const updateStats = (newStats: Partial<StatsData>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const updatePricingPlan = (planIndex: number, updates: Partial<PricingPlan>) => {
    setPricingPlans(prev => 
      prev.map((plan, index) => 
        index === planIndex ? { ...plan, ...updates } : plan
      )
    );
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString()
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateFeature = (key: string, updates: Partial<FeatureData>) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.key === key ? { ...feature, ...updates } : feature
      )
    );
  };

  return {
    // Data
    stats,
    selectedFeature,
    pricingPlans,
    testimonials,
    features,
    
    // Setters
    setSelectedFeature,
    updateStats,
    updatePricingPlan,
    addTestimonial,
    updateFeature,
    
    // Helper getters
    getSelectedFeature: () => features.find(f => f.key === selectedFeature),
    getPopularPlan: () => pricingPlans.find(p => p.isPopular),
    getStatsFormatted: () => ({
      practiceSessions: stats.practiceSessions.toLocaleString(),
      activeUsers: stats.activeUsers.toLocaleString(),
      topicsAvailable: stats.topicsAvailable.toLocaleString(),
      averageImprovement: `${stats.averageImprovement}%`
    })
  };
}; 