
import React, { useState } from 'react';
import { loadData, saveData } from '../store/mockData';

const Settings: React.FC = () => {
  const [data, setData] = useState(loadData());

  const handleSave = () => {
    saveData(data);
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
          <p className="text-slate-400">Configure core streaming engine and dashboard preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Encoder Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
            <i className="fa-solid fa-sliders text-indigo-500"></i>
            FFmpeg Encoder Config
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Streaming Resolution</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>1920x1080 (1080p)</option>
                <option>1280x720 (720p)</option>
                <option>854x480 (480p)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Video Bitrate</label>
                <input type="text" defaultValue="4500k" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">FPS Control</label>
                <input type="number" defaultValue="30" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
              <div>
                <p className="text-sm font-bold text-white">Audio Passthrough</p>
                <p className="text-[11px] text-slate-500">Copy source audio stream directly (Lower CPU usage)</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
            <i className="fa-solid fa-shield-halved text-indigo-500"></i>
            Security & Persistence
          </h3>

          <div className="space-y-5">
             <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Admin Password</label>
              <input type="password" placeholder="••••••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <p className="mt-2 text-[10px] text-slate-500 font-bold uppercase">Hashed with BCrypt (Cost: 12)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Storage Path (Video Content)</label>
              <input type="text" defaultValue="/storage/videos" disabled className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed" />
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex gap-3">
                <i className="fa-solid fa-circle-exclamation text-yellow-500 mt-1"></i>
                <div>
                  <p className="text-xs font-bold text-yellow-500 uppercase mb-1">Warning</p>
                  <p className="text-xs text-yellow-200/70">Changing core encoder settings while a stream is running will trigger an immediate restart of the FFmpeg child process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
