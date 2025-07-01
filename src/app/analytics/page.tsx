'use client';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAnalyticsData } from '../../hooks/useAnalyticsData';

import { 
  Target, 
  Award, 
  Clock, 
  Activity
} from 'lucide-react';

export default function Analytics() {
  const {
    timeRange,
    setTimeRange,
    selectedMetric,
    setSelectedMetric,
    performanceData,
    weeklyProgress,
    topTopics,
    achievements,
    performanceTimes,
    improvementAreas,
    keyMetrics,
    getMetricData,
    getTrendColor
  } = useAnalyticsData();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Analytics
              </h1>
              <p className="text-gray-400 mt-1">Track your progress and performance insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold">{keyMetrics.totalSessions}</p>
                <p className="text-green-400 text-sm">+12% from last month</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold">{keyMetrics.averageScore}</p>
                <p className="text-green-400 text-sm">+0.5 from last month</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Target className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Practice Hours</p>
                <p className="text-2xl font-bold">{keyMetrics.practiceHours}</p>
                <p className="text-green-400 text-sm">+8 hours this month</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Win Rate</p>
                <p className="text-2xl font-bold">{keyMetrics.winRate}%</p>
                <p className="text-green-400 text-sm">+5% from last month</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Breakdown */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Performance Breakdown</h2>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="overall">Overall</option>
                  <option value="clarity">Clarity</option>
                  <option value="confidence">Confidence</option>
                  <option value="structure">Structure</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {getMetricData().current}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  {getMetricData().trend === 'up' ? (
                    <span className="text-green-400">↑</span>
                  ) : (
                    <span className="text-red-400">↓</span>
                  )}
                  <span className={`text-sm ${getTrendColor(getMetricData().trend)}`}>
                    {getMetricData().change}
                  </span>
                  <span className="text-sm text-gray-400">vs last period</span>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(performanceData).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{key}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${(data.current / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{data.current}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-6">Weekly Progress</h2>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="flex space-x-1">
                        {[...Array(day.speeches)].map((_, i) => (
                          <div key={i} className="w-2 h-6 bg-blue-500 rounded"></div>
                        ))}
                        {[...Array(day.debates)].map((_, i) => (
                          <div key={i} className="w-2 h-6 bg-green-500 rounded"></div>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400 w-12">{day.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Topics */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-4">Top Topics</h3>
              <div className="space-y-3">
                {topTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{topic.topic}</div>
                      <div className="text-xs text-gray-400">{topic.count} sessions</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{topic.avgScore}</div>
                      <div className="text-xs text-gray-400">avg score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <achievement.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{achievement.name}</div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                      <div className="text-xs text-purple-400">{achievement.earned}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Streak */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-4">Practice Streak</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">12</div>
                <div className="text-sm text-gray-400">Days in a row</div>
                <div className="mt-4 flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="font-semibold mb-4">Best Performance Times</h3>
            <div className="space-y-3">
              {performanceTimes.map((pt, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm text-gray-400">{pt.timeSlot}</span>
                  <span className="text-sm font-medium text-green-400">{pt.averageScore} avg</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="font-semibold mb-4">Improvement Areas</h3>
            <div className="space-y-3">
              {improvementAreas.map((area, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm text-gray-400">{area.area}</span>
                  <span className="text-sm font-medium text-red-400">{area.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
} 