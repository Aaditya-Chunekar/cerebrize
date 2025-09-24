import './App.css';
import logoImg from './assets/icons/logo.png';
import TipTapTest from "./components/TipTapTest";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

{/* <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/editor" element={<EditorPage />} /> 
</Routes> */}

function App() {  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<TipTapTest />} />
      </Routes>
    </Router>
  );}
function Home() {
  return (
    // <Router>
    <div className="cerebrize-container font-[OpenSauce]">
      {/* Header */}
      <div className="flex justify-between px-10 py-5 font-bold text-sm tracking-wide relative z-10">
        <span className="text-base flex items-center">cerebrize<img src={logoImg} alt="Cerebrize Logo" className="inline-block ml-2 h-10 w-10" /></span>
        <div className="flex gap-10">
          {/* <span>ABILITIES</span>
          <span>HOW IT WORKS</span>
          <span>STAY CONNECTED</span> */}
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-2 p-2 relative z-10">
        {/* Grid Square 1 */}
        <div className="grid-square group cursor-pointer">
          <div className="h-full w-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Abilities</h3>
              <p className="text-sm opacity-70">Discover what you can achieve</p>
            </div>
          </div>
        </div>

        {/* Grid Square 2 */}
        <div className="grid-square group cursor-pointer">
          <div className="h-full w-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Process</h3>
              <p className="text-sm opacity-70">See how it works</p>
            </div>
          </div>
        </div>

        {/* Grid Square 3 */}
        <div className="grid-square group cursor-pointer">
          <div className="h-full w-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Connect</h3>
              <p className="text-sm opacity-70">Stay in touch</p>
            </div>
          </div>
        </div>

        {/* Grid Square 4 - Main Content */}
        <div className="grid-square group cursor-pointer col-span-2">
          <div className="h-full w-full p-8 flex flex-col justify-center">
            <div className="text-[60px] font-bold leading-none mb-6">
              <span className="instrument-serif-regular-italic m-3">meet</span><span className="border-2 rounded-[40px] px-4 py-2">cerebrize</span>
            </div>
            <p className="text-lg leading-relaxed max-w-lg">Cerebrize redefines how you work with AI,
               empowering you to think <span className='instrument-serif-regular-italic'>critically</span>, stay <span className='instrument-serif-regular-italic'>creative</span>, and maintain <span className='instrument-serif-regular-italic'>focus</span>, unlocking your
              <span className="text-[#0066ff] font-bold"> full potential.</span>
            </p>
          </div>
        </div>

        {/* Grid Square 5 */}
        {/* <Link to="/editor" style={{ color: 'black', textDecoration: 'none' }} className="grid-square group cursor-pointer"> */}
          <div className="h-full w-full p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Explore</h3>
              <p className="text-sm opacity-70">Start your journey</p>
            </div>
          </div>
        {/* </Link> */}
      </div>
      
    </div>
    // </Router>
  );
}

export default App;
