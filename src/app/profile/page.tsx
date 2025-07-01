'use client';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useProfileData } from '../../hooks/useProfileData';

import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  Download,
  Edit3,
  Camera,
  Save,
  X,
  Check,
  Star,
  Award,
  Target,
  Clock
} from 'lucide-react';

export default function Profile() {
  const {
    activeTab,
    setActiveTab,
    isEditing,
    setIsEditing,
    notifications,
    setNotifications,
    userProfile,
    achievements,
    stats
  } = useProfileData();

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
                Profile
              </h1>
              <p className="text-gray-400 mt-1">Manage your account and preferences</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 sticky top-8">
              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                <p className="text-gray-400 text-sm">{userProfile.email}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="bg-yellow-500/20 px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-xs font-medium">{userProfile.rank}</span>
                  </div>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">{userProfile.level}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Points</span>
                  <span className="text-sm font-medium">{userProfile.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Member since</span>
                  <span className="text-sm font-medium">{userProfile.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Rank</span>
                  <span className="text-sm font-medium">{stats.rank}</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'achievements'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Achievements
                </button>
                <button
                  onClick={() => setActiveTab('billing')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === 'billing'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  Billing
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">About</h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  {isEditing ? (
                    <div className="space-y-4">
                      <textarea
                        defaultValue={userProfile.bio}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        rows={4}
                      />
                      <div className="flex space-x-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                          <Save className="w-4 h-4 inline mr-2" />
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 inline mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300">{userProfile.bio}</p>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.totalSessions}</div>
                    <div className="text-sm text-gray-400">Total Sessions</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.totalHours}h</div>
                    <div className="text-sm text-gray-400">Practice Hours</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-purple-400">{stats.averageScore}</div>
                    <div className="text-sm text-gray-400">Avg Score</div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.winRate}%</div>
                    <div className="text-sm text-gray-400">Win Rate</div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">Practice Time</label>
                      <p className="font-medium">{userProfile.preferences.practiceTime}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Difficulty Level</label>
                      <p className="font-medium">{userProfile.preferences.difficulty}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Language</label>
                      <p className="font-medium">{userProfile.preferences.language}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Timezone</label>
                      <p className="font-medium">{userProfile.preferences.timezone}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm text-gray-400">Preferred Topics</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userProfile.preferences.topics.map((topic) => (
                        <span key={topic} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Account Settings */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                      <input
                        type="text"
                        defaultValue={userProfile.name}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={userProfile.email}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium capitalize">{key}</div>
                          <div className="text-sm text-gray-400">
                            {key === 'email' && 'Receive email notifications'}
                            {key === 'push' && 'Push notifications'}
                            {key === 'weekly' && 'Weekly progress reports'}
                            {key === 'achievements' && 'Achievement notifications'}
                            {key === 'reminders' && 'Practice reminders'}
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            value ? 'transform translate-x-6' : 'transform translate-x-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Profile Visibility</div>
                        <div className="text-sm text-gray-400">Make your profile public to other users</div>
                      </div>
                      <button className="w-12 h-6 bg-blue-500 rounded-full">
                        <div className="w-4 h-4 bg-white rounded-full transform translate-x-6"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Activity Sharing</div>
                        <div className="text-sm text-gray-400">Share your achievements on social media</div>
                      </div>
                      <button className="w-12 h-6 bg-gray-600 rounded-full">
                        <div className="w-4 h-4 bg-white rounded-full transform translate-x-1"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-6">Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                        <div className="bg-yellow-500/20 p-3 rounded-lg">
                          <achievement.icon className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-gray-400">{achievement.description}</div>
                          <div className="text-xs text-blue-400">{achievement.earned}</div>
                        </div>
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-semibold">Pro Plan</h4>
                        <p className="text-blue-100">$19.99/month</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-blue-100">Next billing</div>
                        <div className="font-semibold">May 15, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="font-medium">•••• •••• •••• 4242</div>
                        <div className="text-sm text-gray-400">Expires 12/25</div>
                      </div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300">Edit</button>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <div className="font-medium">Pro Plan - April 2024</div>
                        <div className="text-sm text-gray-400">April 15, 2024</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$19.99</div>
                        <div className="text-sm text-green-400">Paid</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <div className="font-medium">Pro Plan - March 2024</div>
                        <div className="text-sm text-gray-400">March 15, 2024</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$19.99</div>
                        <div className="text-sm text-green-400">Paid</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
} 