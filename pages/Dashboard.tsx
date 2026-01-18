
import React, { useState, useEffect } from 'react';
import { StreamService } from '../services/streamService';
import { StreamStatus, RTMPDestination, Playlist } from '../types';
import { loadData } from '../store/mockData';

const Dashboard: React.FC = () => {
  const [status, setStatus] = useState<StreamStatus>(StreamService.getStatus());
  const [data, setData] = useState(loadData());
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>(data.playlists[0]?.id || '');

  useEffect(() => {
    const unsub = StreamService.subscribeStatus(setStatus);
    return unsub;
  }, []);

  const handleToggleStream = () => {
    if (status === StreamStatus.RUNNING) {
      StreamService.stopStream();
    } else {
      StreamService.startStream(selectedPlaylist);
    }
  };

  const activeDestinations = data.destinations.filter(d => d.enabled);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Control Dashboard</h2>
          <p className="text-slate-400">Manage your active broadcast and monitoring streams.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            status === StreamStatus.RUNNING ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
            status === StreamStatus.IDLE ? 'bg-slate-500/10 text-slate-400 border border-slate-500/20' : 
            'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              status === StreamStatus.RUNNING ? 'bg-green-500 animate-pulse' : 
              status === StreamStatus.IDLE ? 'bg-slate-500' : 'bg-yellow-500'
            }`}></span>
            {status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Controls Card */}
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Stream Controller</h3>
              <p className="text-sm text-slate-400">One-click broadcast management for your playlists.</p>
            </div>
            <i className="fa-solid fa-tower-broadcast text-slate-600 text-2xl"></i>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Active Playlist</label>
              <select 
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                disabled={status !== StreamStatus.IDLE}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {data.playlists.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.videoIds.length} videos)</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleToggleStream}
                disabled={status === StreamStatus.STARTING || status === StreamStatus.STOPPING}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  status === StreamStatus.RUNNING 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20'
                }`}
              >
                <i className={`fa-solid ${status === StreamStatus.RUNNING ? 'fa-stop' : 'fa-play'}`}></i>
                {status === StreamStatus.RUNNING ? 'STOP BROADCAST' : 'START BROADCAST'}
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-700/50 pt-8">
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Uptime</p>
              <p className="text-xl font-mono text-white">{status === StreamStatus.RUNNING ? '02:14:55' : '00:00:00'}</p>
            </div>
            <div className="text-center border-x border-slate-700/50">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Dropped Frames</p>
              <p className="text-xl font-mono text-white">0.02%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Current Speed</p>
              <p className="text-xl font-mono text-white">1.02x</p>
            </div>
          </div>
        </div>

        {/* Stats & Destinations Card */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Active Destinations</h3>
            <div className="space-y-4">
              {activeDestinations.length === 0 ? (
                <div className="text-center py-4 text-slate-500 text-sm italic">
                  No destinations configured.
                </div>
              ) : (
                activeDestinations.map(dest => (
                  <div key={dest.id} className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-slate-800">
                      <i className={`fa-brands fa-${dest.platform} text-indigo-400`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{dest.name}</p>
                      <p className="text-xs text-slate-500 truncate">{dest.url}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${status === StreamStatus.RUNNING ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-2xl p-6 text-white overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Resource Usage</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>CPU (FFmpeg)</span>
                    <span>12.4%</span>
                  </div>
                  <div className="h-1.5 w-full bg-indigo-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: status === StreamStatus.RUNNING ? '12.4%' : '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>RAM Utilization</span>
                    <span>422MB</span>
                  </div>
                  <div className="h-1.5 w-full bg-indigo-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '18%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <i className="fa-solid fa-microchip absolute -right-4 -bottom-4 text-8xl text-indigo-500/20 group-hover:scale-110 transition-transform duration-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
