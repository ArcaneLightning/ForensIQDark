'use client';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useDebateData } from '../../hooks/useDebateData';
import type { DebateRoom } from '../../hooks/useDebateData';

import { 
  Users, 
  Clock, 
  Mic,
  MicOff,
  Bot
} from 'lucide-react';

export default function Debate() {
  const {
    activeTab,
    setActiveTab,
    selectedRoom,
    setSelectedRoom,
    isInDebate,
    setIsInDebate,
    debateTime,
    isSpeaking,
    setIsSpeaking,
    debateRooms,
    userStats,
    recentDebates,
    aiDebate,
    startAIDebate,
    endAIDebate,
    addUserArgument
  } = useDebateData();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const joinRoom = (room: DebateRoom) => {
    setSelectedRoom(room);
    setIsInDebate(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Debate Arena
              </h1>
              <p className="text-gray-400 mt-1">Challenge opponents and improve your debating skills</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 rounded-lg px-4 py-2">
                <div className="text-sm text-gray-400">Rank</div>
                <div className="text-lg font-semibold text-yellow-400">{userStats.rank}</div>
              </div>
              <div className="bg-gray-800 rounded-lg px-4 py-2">
                <div className="text-sm text-gray-400">Points</div>
                <div className="text-lg font-semibold">{userStats.points}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 mb-8">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'rooms'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Debate Rooms
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'stats'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
          </button>
        </div>

        {activeTab === 'rooms' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Debate Rooms */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6">Available Rooms</h2>
              <div className="space-y-4">
                {debateRooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{room.topic}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {room.participants}/{room.maxParticipants}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {room.timeLimit} min
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            room.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            room.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {room.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          room.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          room.status === 'waiting' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {room.status === 'active' ? 'Active' :
                           room.status === 'waiting' ? 'Waiting' : 'Full'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{room.category}</span>
                      <button
                        onClick={() => joinRoom(room)}
                        disabled={room.status === 'full'}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          room.status === 'full'
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {room.status === 'full' ? 'Full' : 'Join Room'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Debate Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">AI Debate Practice</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="text-center mb-6">
                  <Bot className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Practice with AI</h3>
                  <p className="text-gray-400 mb-4">Challenge our AI opponent on any topic</p>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter debate topic..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        startAIDebate(e.currentTarget.value.trim());
                      }
                    }}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => startAIDebate('Should social media be regulated?')}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Social Media Regulation
                    </button>
                    <button
                      onClick={() => startAIDebate('Is remote work more productive?')}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Remote Work
                    </button>
                    <button
                      onClick={() => startAIDebate('Should college be free?')}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Free College
                    </button>
                    <button
                      onClick={() => startAIDebate('Are electric vehicles truly green?')}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Electric Vehicles
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Stats</h2>
              <div className="space-y-4">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{userStats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{userStats.totalDebates}</div>
                      <div className="text-sm text-gray-400">Total Debates</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{userStats.wins}</div>
                      <div className="text-sm text-gray-400">Wins</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{userStats.averageScore}</div>
                    <div className="text-sm text-gray-400">Average Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="font-semibold mb-4">Performance Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">This Week</span>
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">This Month</span>
                    <span className="text-sm font-medium">+8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Overall</span>
                    <span className="text-sm font-medium">+15%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="font-semibold mb-4">Strengths</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Logic</span>
                    <span className="text-sm text-green-400">9.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Evidence</span>
                    <span className="text-sm text-green-400">8.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Delivery</span>
                    <span className="text-sm text-yellow-400">7.5</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="font-semibold mb-4">Areas to Improve</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Rebuttal</span>
                    <span className="text-sm text-red-400">6.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Time Management</span>
                    <span className="text-sm text-red-400">7.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Cross-Examination</span>
                    <span className="text-sm text-yellow-400">7.3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Recent Debates</h2>
            <div className="space-y-4">
              {recentDebates.map((debate) => (
                <div key={debate.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{debate.topic}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>vs {debate.opponent}</span>
                        <span>Score: {debate.score}/10</span>
                        <span>{debate.date}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      debate.result === 'Win' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {debate.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Debate Modal */}
        {isInDebate && selectedRoom && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Active Debate</h2>
                <button
                  onClick={() => setIsInDebate(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">{selectedRoom.topic}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Time: {formatTime(debateTime)}</span>
                  <span>Participants: {selectedRoom.participants}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Your Turn</span>
                    <span className="text-sm text-gray-400">30s remaining</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsSpeaking(!isSpeaking)}
                      className={`p-3 rounded-full ${
                        isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {isSpeaking ? (
                        <MicOff className="w-5 h-5 text-white" />
                      ) : (
                        <Mic className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <span className="text-sm text-gray-300">
                      {isSpeaking ? 'Speaking...' : 'Click to speak'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Chat</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex space-x-2">
                      <span className="text-blue-400">Sarah:</span>
                      <span>Great point about the economic impact!</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-green-400">Mike:</span>
                      <span>But what about the social consequences?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Debate Modal */}
        {aiDebate.isActive && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Bot className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold">AI Debate</h2>
                </div>
                <button
                  onClick={endAIDebate}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">{aiDebate.debateTopic}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Time: {formatTime(aiDebate.timeRemaining)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    aiDebate.currentTurn === 'user' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {aiDebate.currentTurn === 'user' ? 'Your Turn' : 'AI Turn'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Arguments */}
                <div className="space-y-4">
                  <h4 className="font-medium text-blue-400">Your Arguments</h4>
                  {aiDebate.userArguments.length > 0 ? (
                    <div className="space-y-3">
                      {aiDebate.userArguments.map((argument, index) => (
                        <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <p className="text-sm">{argument}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-gray-400 text-sm">No arguments yet</p>
                    </div>
                  )}
                  
                  {aiDebate.currentTurn === 'user' && (
                    <div className="bg-gray-700 rounded-lg p-4">
                      <textarea
                        placeholder="Type your argument..."
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 text-sm"
                        rows={3}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && e.currentTarget.value.trim()) {
                            e.preventDefault();
                            addUserArgument(e.currentTarget.value.trim());
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                      <div className="mt-2 text-xs text-gray-400">
                        Press Enter to submit your argument
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Arguments */}
                <div className="space-y-4">
                  <h4 className="font-medium text-green-400">AI Arguments</h4>
                  {aiDebate.aiArguments.length > 0 ? (
                    <div className="space-y-3">
                      {aiDebate.aiArguments.map((argument, index) => (
                        <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <p className="text-sm">{argument}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-gray-400 text-sm">AI hasn&apos;t responded yet</p>
                    </div>
                  )}
                  
                  {aiDebate.currentTurn === 'ai' && aiDebate.aiResponse && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-sm">{aiDebate.aiResponse}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={endAIDebate}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition-colors"
                >
                  End Debate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
} 