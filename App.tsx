
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VideoLibrary from './pages/VideoLibrary';
import Logs from './pages/Logs';
import PlaylistManager from './pages/PlaylistManager';
import Destinations from './pages/Destinations';
import Scheduler from './pages/Scheduler';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'library': return <VideoLibrary />;
      case 'playlists': return <PlaylistManager />;
      case 'destinations': return <Destinations />;
      case 'scheduler': return <Scheduler />;
      case 'settings': return <Settings />;
      case 'logs': return <Logs />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Header (Top bar) */}
        <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-8 py-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Status</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
              <span className="text-sm font-semibold text-white">All systems operational</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-r border-slate-800 pr-6 mr-6">
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">Disk Space</p>
                <p className="text-sm font-bold text-white leading-tight">124GB / 500GB</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <i className="fa-solid fa-hard-drive text-slate-400"></i>
              </div>
            </div>
            
            <button className="relative w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
              <i className="fa-solid fa-bell text-slate-400"></i>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
