'use client';

import { usePracticeData } from '../../hooks/usePracticeData';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw, 
  Download,
  Volume2,
  Upload,
  X,
  Star
} from 'lucide-react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Practice() {
  const {
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
    timerRef,
    practiceModes,
    sampleTopics,
    selectedTopic,
    setSelectedTopic,
    uploadedAudio,
    customTopic,
    setCustomTopic,
    showCustomTopicInput,
    setShowCustomTopicInput,
    fileInputRef,
    handleFileUpload,
    removeUploadedAudio,
    getCurrentTopic
  } = usePracticeData();

  const startRecording = () => {
    setIsRecording(true);
    setPracticeTime(0);
    // Start timer
    timerRef.current = setInterval(() => {
      setPracticeTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setFeedback({
        overallScore: 8.2,
        categories: {
          clarity: 8.5,
          confidence: 7.8,
          structure: 8.7,
          delivery: 8.1
        },
        suggestions: [
          'Great use of vocal variety and pacing',
          'Consider adding more specific examples',
          'Strong opening and conclusion',
          'Work on reducing filler words'
        ],
        transcript: 'This is a sample transcript of your speech...'
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Speech Practice
              </h1>
              <p className="text-gray-400 mt-1">Practice your speaking skills with AI feedback</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 rounded-lg px-4 py-2">
                <div className="text-sm text-gray-400">Practice Time</div>
                <div className="text-lg font-semibold">{formatTime(practiceTime)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Practice Controls */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              {/* Mode Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Practice Mode</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {practiceModes.map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setCurrentMode(mode.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        currentMode === mode.id
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <mode.icon className="w-6 h-6 mb-2 text-blue-400" />
                      <div className="text-sm font-medium">{mode.name}</div>
                      <div className="text-xs text-gray-400">{mode.duration} min</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topic Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Practice Topic</h2>
                
                {/* Custom Topic Toggle */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowCustomTopicInput(!showCustomTopicInput)}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center space-x-2"
                  >
                    <span>{showCustomTopicInput ? 'Use Sample Topics' : 'Add Custom Topic'}</span>
                  </button>
                </div>

                {showCustomTopicInput ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="Enter your custom topic..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                    <div className="text-sm text-gray-400">
                      Enter a topic you&apos;d like to practice speaking about
                    </div>
                  </div>
                ) : (
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    {sampleTopics.map((topic) => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Audio Upload Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Audio Input</h2>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-4">Upload Audio File</h3>
                    <p className="text-gray-400 mb-4">Upload a pre-recorded audio file for analysis</p>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    {!uploadedAudio ? (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Choose Audio File</span>
                      </button>
                    ) : (
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Volume2 className="w-5 h-5 text-blue-400" />
                            <div>
                              <div className="font-medium">{uploadedAudio.name}</div>
                              <div className="text-sm text-gray-400">
                                {(uploadedAudio.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={removeUploadedAudio}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            setIsAnalyzing(true);
                            setTimeout(() => {
                              setFeedback({
                                overallScore: 7.8,
                                categories: {
                                  clarity: 7.5,
                                  confidence: 8.0,
                                  structure: 7.2,
                                  delivery: 8.1
                                },
                                suggestions: [
                                  'Good vocal clarity and projection',
                                  'Consider improving speech structure',
                                  'Work on reducing filler words',
                                  'Add more vocal variety'
                                ],
                                transcript: 'This is a sample transcript of your uploaded audio...'
                              });
                              setIsAnalyzing(false);
                            }, 3000);
                          }}
                          className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Analyze Uploaded Audio
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recording Interface */}
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{getCurrentTopic()}</h3>
                  <p className="text-gray-400">Prepare your speech and click record when ready</p>
                </div>

                <div className="flex items-center justify-center space-x-6 mb-8">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-6 rounded-full transition-all duration-300 ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {isRecording ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </button>

                  {!isRecording && practiceTime > 0 && (
                    <>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white" />
                        )}
                      </button>
                      <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                        <RotateCcw className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </div>

                {isAnalyzing && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-blue-400">Analyzing your speech...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          <div>
            <h2 className="text-xl font-semibold mb-6">AI Feedback</h2>
            
            {feedback ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {feedback.overallScore}/10
                    </div>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(feedback.overallScore / 2)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category Scores */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="font-semibold mb-4">Performance Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(feedback.categories).map(([category, score]) => (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize">{category}</span>
                          <span className="text-blue-400">{score}/10</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${(score / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="font-semibold mb-4">Suggestions for Improvement</h3>
                  <ul className="space-y-2">
                    {feedback.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Practice Again
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <Volume2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Record a speech to get AI feedback</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
} 