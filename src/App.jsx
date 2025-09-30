import './App.css';
import logoImg from './assets/icons/logo.png';
import TipTapTest from "./components/TipTapTest";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat";
import Physical from "./components/Physical";
import Dashboard from "./components/Dashboard";

{/* <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/editor" element={<EditorPage />} /> 
</Routes> */}

function App() {  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Chat />} />
        <Route path="/physical" element={<Physical />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );}
function Home() {
  return (
    // <Router>
    <div className="cerebrize-container font-[OpenSauce]">
      {/* Main Content - Meet Cerebrize */}
      <div className="px-2 my-4 relative z-10">
        <div className="grid-square group cursor-pointer">
          <div className="h-full w-full p-8 flex items-center justify-between">
            <div className="flex-1 pr-8">
              <div className="text-[60px] font-bold leading-none mb-6">
                <span className="instrument-serif-regular-italic m-3 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">meet</span>
                <span className="border-3 border-gradient-to-r from-blue-500 to-purple-500 rounded-[40px] px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 text-transparent bg-clip-text" style={{background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent'}}>cerebrize</span>
              </div>
              <p className="text-xl leading-relaxed max-w-4xl text-gray-700">Cerebrize revolutionizes <span className='font-semibold text-indigo-600'>holistic human development</span> through intelligent AI collaboration and physical wellness tracking,
                 empowering you to think <span className='instrument-serif-regular-italic font-semibold text-purple-600'>critically</span>, 
                 stay <span className='instrument-serif-regular-italic font-semibold text-emerald-600'>creative</span>, 
                 maintain laser-sharp <span className='instrument-serif-regular-italic font-semibold text-blue-600'>focus</span>, 
                 while building <span className='instrument-serif-regular-italic font-semibold text-orange-600'>physical resilience</span> that amplifies your
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold"> extraordinary potential.</span>
              </p>
              <div className="mt-6 flex space-x-2 flex-wrap">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-2">Intellectual Growth</span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-semibold mb-2">Physical Wellness</span>
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-sm font-semibold mb-2">Cognitive Boost</span>
                <span className="px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 rounded-full text-sm font-semibold mb-2">Holistic Development</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img src='src/assets/icons/logo.png' alt='Brain Icon' className='brain-icon w-32 h-32 filter drop-shadow-2xl'/>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row - Begin Conversation */}
      <div className="px-2 mb-4 relative z-10">
        <Link to="/editor" style={{ color: 'inherit', textDecoration: 'none' }} className="block">
          <div className="grid-square group cursor-pointer hover:scale-[1.01] transition-transform duration-300">
            <div className="h-full w-full p-8 flex items-center justify-center">
              <div className="text-center">
                {/* <div className="text-6xl mb-4 animate-bounce">🚀</div> */}
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Begin Conversation</h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">Start your intellectual enhancement journey with AI-powered Think & Gain modes for deeper understanding and creative problem-solving</p>
                <div className="mt-6 flex justify-center space-x-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold">Think Mode</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-sm font-semibold">Gain Mode</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Row - Physical and Progress */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-2 relative z-10">
        {/* Physical Betterment Section - Full Width */}
        <Link to="/physical" style={{ color: 'inherit', textDecoration: 'none' }} className="grid-square group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="h-full w-full p-8 flex items-center justify-center">
            <div className="text-center">
              {/* <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.5s' }}>🏃‍♂️</div> */}
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Physical Betterment</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">Enhance cognitive performance through fitness tracking and holistic mind-body development with comprehensive Strava integration</p>
              <div className="mt-4 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-xs font-semibold">Fitness Tracking</span>
                <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-800 rounded-full text-xs font-semibold">Cognitive Boost</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Dashboard Section - Full Width */}
        <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }} className="grid-square group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
          <div className="h-full w-full p-8 flex items-center justify-center">
            <div className="text-center">
              {/* <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '1s' }}>📊</div> */}
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Progress Dashboard</h3>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">Track your holistic development with detailed insights into intellectual and physical growth metrics and achievements</p>
              <div className="mt-4 flex justify-center space-x-2">
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-xs font-semibold">Analytics</span>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-xs font-semibold">Achievements</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      
    </div>
    // </Router>
  );
}

export default App;
