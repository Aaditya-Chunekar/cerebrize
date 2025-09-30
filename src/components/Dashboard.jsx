import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [intellectualData, setIntellectualData] = useState({
    thinkSessions: 12,
    gainSessions: 8,
    totalQuestions: 156,
    averageDepth: 8.4,
    weeklyGrowth: 23,
    cognitiveScore: 84
  });

  const [physicalData, setPhysicalData] = useState({
    totalActivities: 24,
    totalDistance: 187.3,
    totalCalories: 5420,
    averagePace: 5.2,
    weeklyGoalCompletion: 78,
    fitnessScore: 76
  });

  const [holisticScore, setHolisticScore] = useState(80);
  
  const weeklyData = [
    { day: 'Mon', intellectual: 85, physical: 70 },
    { day: 'Tue', intellectual: 78, physical: 85 },
    { day: 'Wed', intellectual: 92, physical: 65 },
    { day: 'Thu', intellectual: 88, physical: 80 },
    { day: 'Fri', intellectual: 75, physical: 90 },
    { day: 'Sat', intellectual: 90, physical: 75 },
    { day: 'Sun', intellectual: 82, physical: 85 }
  ];

  const achievements = [
    { icon: "🧠", title: "Deep Thinker", description: "Completed 10+ Think sessions", unlocked: true },
    { icon: "💡", title: "Knowledge Seeker", description: "Asked 100+ questions in Gain mode", unlocked: true },
    { icon: "🏃‍♂️", title: "Consistent Runner", description: "5 consecutive days of running", unlocked: true },
    { icon: "🎯", title: "Goal Crusher", description: "Met weekly fitness goals", unlocked: false },
    { icon: "⚡", title: "Holistic Hero", description: "80+ score in both categories", unlocked: false },
    { icon: "🏆", title: "Peak Performance", description: "90+ holistic score for a week", unlocked: false }
  ];

  return (
    <div className="chat-fullscreen">
      {/* Header */}
      <div className="chat-header bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="header-left">
          <span className="brand-text text-white flex items-center">
            📊 Holistic Dashboard
          </span>
        </div>
        <div className="header-center">
          <div className="text-white text-sm font-medium">
            Complete Development Tracking
          </div>
        </div>
        <div className="header-right">
          <Link to="/" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Main Score Card */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{intellectualData.cognitiveScore}</div>
                <div className="text-indigo-200">Intellectual Score</div>
                <div className="text-sm text-indigo-100 mt-1">+{intellectualData.weeklyGrowth}% this week</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-yellow-300">{holisticScore}</div>
                <div className="text-lg font-semibold">Holistic Development</div>
                <div className="text-sm text-indigo-100 mt-1">Mind + Body Synergy</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{physicalData.fitnessScore}</div>
                <div className="text-indigo-200">Physical Score</div>
                <div className="text-sm text-indigo-100 mt-1">{physicalData.weeklyGoalCompletion}% weekly goals</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-center mb-3">
                <span className="text-indigo-200 text-sm">Overall Progress</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full h-4 transition-all duration-1000"
                  style={{ width: `${holisticScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Intellectual Development */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  🧠 Intellectual Development
                </h2>
                <Link to="/editor" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                  Continue Learning →
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-indigo-600">{intellectualData.thinkSessions}</div>
                  <div className="text-sm text-gray-600">Think Sessions</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600">{intellectualData.gainSessions}</div>
                  <div className="text-sm text-gray-600">Gain Sessions</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">{intellectualData.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions Asked</div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-600">{intellectualData.averageDepth}</div>
                  <div className="text-sm text-gray-600">Avg Depth Score</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Recent Insights</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Explored complex problem-solving strategies</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Deep dive into creative thinking methods</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Enhanced analytical reasoning skills</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Development */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  💪 Physical Development
                </h2>
                <Link to="/physical" className="text-orange-600 hover:text-orange-800 font-semibold">
                  View Activities →
                </Link>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-600">{physicalData.totalActivities}</div>
                  <div className="text-sm text-gray-600">Activities</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">{physicalData.totalDistance}</div>
                  <div className="text-sm text-gray-600">Total km</div>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">{physicalData.totalCalories}</div>
                  <div className="text-sm text-gray-600">Calories Burned</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600">{physicalData.averagePace}</div>
                  <div className="text-sm text-gray-600">Avg Pace (min/km)</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Physical Benefits</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>+25% improved focus from cardio</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>+18% better memory retention</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>+30% enhanced creativity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Development Progress</h3>
            <div className="grid grid-cols-7 gap-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-sm font-semibold text-gray-600 mb-2">{day.day}</div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 rounded-full h-20 w-4 mx-auto relative">
                      <div 
                        className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full w-4 absolute bottom-0"
                        style={{ height: `${day.intellectual}%` }}
                      ></div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-20 w-4 mx-auto relative">
                      <div 
                        className="bg-gradient-to-t from-orange-500 to-red-500 rounded-full w-4 absolute bottom-0"
                        style={{ height: `${day.physical}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    <div>🧠 {day.intellectual}</div>
                    <div>💪 {day.physical}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded"></div>
                <span className="text-sm text-gray-600">Intellectual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Physical</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Achievements & Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                        {achievement.title}
                      </h4>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-500 text-xl">✓</div>
                    )}
                  </div>
                  <p className={`text-sm ${achievement.unlocked ? 'text-green-700' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}