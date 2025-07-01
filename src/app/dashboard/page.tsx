'use client';

import { useDashboardData } from '../../hooks/useDashboardData';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Dashboard() {
  const { stats, recentActivities, quickActions, weeklyProgressPercentage } = useDashboardData();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-gray-400 mt-1">Welcome back! Ready to improve your skills?</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Weekly Goal</div>
                  <div className="text-lg font-semibold">{stats.weeklyProgress}/{stats.weeklyGoal} sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Speeches</p>
                  <p className="text-2xl font-bold">{stats.totalSpeeches}</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  {/* Mic icon is in quickActions */}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Debate Wins</p>
                  <p className="text-2xl font-bold">{stats.debateWins}</p>
                </div>
                <div className="bg-green-500/20 p-3 rounded-lg">
                  {/* Award icon is in quickActions */}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold">{stats.averageScore}</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  {/* Target icon is in quickActions */}
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Practice Hours</p>
                  <p className="text-2xl font-bold">{stats.practiceHours}h</p>
                </div>
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  {/* Clock icon is in quickActions */}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:bg-gray-800/70"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`${action.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{action.title}</h3>
                        <p className="text-gray-400 text-sm">{action.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {/* Icon based on activity type */}
                        <span className="text-sm font-medium">{activity.title}</span>
                      </div>
                      <span className="text-xs text-gray-400">{activity.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-400">{activity.duration}</span>
                        {activity.type === 'speech' && (
                          <span className="text-blue-400">Score: {activity.score}</span>
                        )}
                        {activity.type === 'debate' && (
                          <span className="text-green-400">{activity.result}</span>
                        )}
                      </div>
                      <span className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer">▶</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6">Weekly Progress</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Practice Sessions</span>
                  <span className="text-white">{stats.weeklyProgress}/{stats.weeklyGoal}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${weeklyProgressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">
                  {weeklyProgressPercentage}%
                </div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 