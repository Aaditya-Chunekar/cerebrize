import { useState, useEffect } from "react";

export default function Physical() {
  const [isConnected, setIsConnected] = useState(false);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyGoals, setWeeklyGoals] = useState({
    running: { target: 50, current: 0 },
    cycling: { target: 100, current: 0 },
    strength: { target: 3, current: 0 }
  });
  const [personalBests, setPersonalBests] = useState({
    longestRun: 0,
    fastestPace: 0,
    totalElevation: 0
  });
  const [bettermentScore, setBettermentScore] = useState(0);

  // Demo data simulation
  const demoActivities = [
    { id: 1, type: "🏃‍♂️", name: "Morning Run", distance: "5.2 km", duration: "26 min", date: "Today", calories: 312 },
    { id: 2, type: "🚴‍♀️", name: "Afternoon Cycle", distance: "15.8 km", duration: "42 min", date: "Yesterday", calories: 485 },
    { id: 3, type: "💪", name: "Strength Training", distance: "45 min", duration: "45 min", date: "2 days ago", calories: 320 },
    { id: 4, type: "🏃‍♂️", name: "Evening Jog", distance: "3.4 km", duration: "18 min", date: "3 days ago", calories: 210 }
  ];

  const connectStrava = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConnected(true);
      setActivities(demoActivities);
      setWeeklyGoals({
        running: { target: 50, current: 32.4 },
        cycling: { target: 100, current: 67.2 },
        strength: { target: 3, current: 2 }
      });
      setPersonalBests({
        longestRun: 21.1,
        fastestPace: 4.8,
        totalElevation: 1247
      });
      setBettermentScore(78);
      setIsLoading(false);
    }, 2000);
  };

  const disconnectStrava = () => {
    setIsConnected(false);
    setActivities([]);
    setWeeklyGoals({
      running: { target: 50, current: 0 },
      cycling: { target: 100, current: 0 },
      strength: { target: 3, current: 0 }
    });
    setPersonalBests({
      longestRun: 0,
      fastestPace: 0,
      totalElevation: 0
    });
    setBettermentScore(0);
  };

  if (isLoading) {
    return (
      <div className="chat-fullscreen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            {/* <div className="animate-spin text-6xl mb-4"></div> */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Connecting to Strava...</h2>
            <p className="text-gray-600">Syncing your physical betterment data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-fullscreen">
      {/* Header Bar */}
      <div className="chat-header bg-gradient-to-r from-orange-500 to-red-500">
        <div className="header-left">
          <span className="brand-text text-white flex items-center">
            Physical Betterment
          </span>
        </div>
        <div className="header-center">
          <div className="text-white text-sm font-medium">
            Holistic Development: Mind + Body
          </div>
        </div>
        <div className="header-right">
          {isConnected ? (
            <button onClick={disconnectStrava} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              Disconnect Strava
            </button>
          ) : (
            <button onClick={connectStrava} className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Connect Strava
            </button>
          )}
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
          <div className="text-center max-w-2xl mx-auto p-8">
            <div className="text-8xl mb-6">⚡</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Physical + Intellectual Enhancement</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Cerebrize believes in <span className="font-semibold text-orange-600">holistic development</span>. 
              While our AI enhances your <span className="italic">intellectual capabilities</span>, 
              physical fitness amplifies your <span className="italic">cognitive performance</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-bold text-gray-800 mb-2">Intellectual Development</h3>
                <p className="text-sm text-gray-600">AI-powered cognitive enhancement through Think & Gain modes</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl mb-3">💪</div>
                <h3 className="font-bold text-gray-800 mb-2">Physical Development</h3>
                <p className="text-sm text-gray-600">Fitness tracking that boosts mental clarity and focus</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Studies show physical exercise increases neuroplasticity by 200%, 
              enhancing learning capacity and creative problem-solving.
            </p>
            <button 
              onClick={connectStrava}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Begin Physical Betterment Journey
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-6xl mx-auto p-6">
            {/* Betterment Score Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Physical Betterment Score</h2>
                  <p className="text-orange-100">Your holistic development progress</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">{bettermentScore}/100</div>
                  <div className="text-orange-100 text-sm">+12% this week</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mt-4">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-1000"
                  style={{ width: `${bettermentScore}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weekly Goals */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  Weekly Goals
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>🏃‍♂️ Running</span>
                      <span>{weeklyGoals.running.current}/{weeklyGoals.running.target} km</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${(weeklyGoals.running.current / weeklyGoals.running.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>🚴‍♀️ Cycling</span>
                      <span>{weeklyGoals.cycling.current}/{weeklyGoals.cycling.target} km</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 rounded-full h-2"
                        style={{ width: `${(weeklyGoals.cycling.current / weeklyGoals.cycling.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>💪 Strength</span>
                      <span>{weeklyGoals.strength.current}/{weeklyGoals.strength.target} sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 rounded-full h-2"
                        style={{ width: `${(weeklyGoals.strength.current / weeklyGoals.strength.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Bests */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  🏆 Personal Bests
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Longest Run</span>
                    <span className="font-semibold">{personalBests.longestRun} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fastest Pace</span>
                    <span className="font-semibold">{personalBests.fastestPace} min/km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Elevation</span>
                    <span className="font-semibold">{personalBests.totalElevation}m</span>
                  </div>
                </div>
              </div>

              {/* Cognitive Benefits */}
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  Cognitive Benefits
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>+23% Focus Enhancement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>+18% Memory Retention</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>+31% Creative Thinking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>+15% Problem Solving</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-lg mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{activity.type}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">{activity.distance}</div>
                      <div className="text-sm text-gray-600">{activity.calories} cal</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}