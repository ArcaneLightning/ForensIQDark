import { useState, useRef } from 'react';
import { Target, Clock, MessageSquare, BarChart3 } from 'lucide-react';
import React from 'react';

interface PracticeMode {
  id: string;
  name: string;
  duration: number;
  icon: React.ElementType;
}

interface Feedback {
  overallScore: number;
  categories: {
    clarity: number;
    confidence: number;
    structure: number;
    delivery: number;
  };
  suggestions: string[];
  transcript: string;
}

export const usePracticeData = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMode, setCurrentMode] = useState('persuasive');
  const [practiceTime, setPracticeTime] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomTopicInput, setShowCustomTopicInput] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const practiceModes: PracticeMode[] = [
    { id: 'persuasive', name: 'Persuasive Speech', duration: 5, icon: Target },
    { id: 'impromptu', name: 'Impromptu Speech', duration: 3, icon: Clock },
    { id: 'informative', name: 'Informative Speech', duration: 7, icon: MessageSquare },
    { id: 'debate', name: 'Debate Practice', duration: 10, icon: BarChart3 }
  ];

  const sampleTopics = [
    'Should social media be regulated?',
    'The impact of artificial intelligence on employment',
    'Climate change: Individual vs. government responsibility',
    'The future of remote work',
    'Should college education be free?',
    'The role of technology in education'
  ];

  const [selectedTopic, setSelectedTopic] = useState(sampleTopics[0]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedAudio(file);
      // Reset recording state when uploading file
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const removeUploadedAudio = () => {
    setUploadedAudio(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCurrentTopic = () => {
    if (showCustomTopicInput && customTopic.trim()) {
      return customTopic;
    }
    return selectedTopic;
  };

  return {
    isRecording,
    setIsRecording,
    isPlaying,
    setIsPlaying,
    currentMode,
    setCurrentMode,
    practiceTime,
    setPracticeTime,
    feedback,
    setFeedback,
    isAnalyzing,
    setIsAnalyzing,
    audioRef,
    timerRef,
    practiceModes,
    sampleTopics,
    selectedTopic,
    setSelectedTopic,
    uploadedAudio,
    setUploadedAudio,
    customTopic,
    setCustomTopic,
    showCustomTopicInput,
    setShowCustomTopicInput,
    fileInputRef,
    handleFileUpload,
    removeUploadedAudio,
    getCurrentTopic
  };
}; 