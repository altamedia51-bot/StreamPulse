
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
    { id: 'library', icon: 'fa-folder-open', label: 'Video Library' },
    { id: 'playlists', icon: 'fa-list-ul', label: 'Playlists' },
    { id: 'destinations', icon: 'fa-broadcast-tower', label: 'Destinations' },
    { id: 'scheduler', icon: 'fa-calendar-alt', label: 'Scheduler' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' },
    { id: 'logs', icon: 'fa-terminal', label: 'System Logs' },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-bolt text-white text-xl"></i>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">StreamPulse</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Administrator</p>
            <p className="text-xs text-slate-500 truncate">v1.2.0-stable</p>
          </div>
          <button className="text-slate-400 hover:text-red-400 transition-colors">
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
