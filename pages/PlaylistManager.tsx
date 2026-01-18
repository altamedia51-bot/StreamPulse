
import React, { useState } from 'react';
import { loadData, saveData } from '../store/mockData';
import { Playlist } from '../types';

const PlaylistManager: React.FC = () => {
  const [data, setData] = useState(loadData());
  const [showModal, setShowModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({ name: '', videoIds: [] as string[], loop: true });

  const toggleLoop = (id: string) => {
    const newData = {
      ...data,
      playlists: data.playlists.map(p => p.id === id ? { ...p, loop: !p.loop } : p)
    };
    setData(newData);
    saveData(newData);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Playlist Management</h2>
          <p className="text-slate-400">Group your videos into reusable streaming queues.</p>
        </div>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          onClick={() => setShowModal(true)}
        >
          <i className="fa-solid fa-plus"></i>
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.playlists.map((playlist) => (
          <div key={playlist.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/30 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center">
                  <i className="fa-solid fa-layer-group text-indigo-500 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{playlist.name}</h3>
                  <p className="text-sm text-slate-500">{playlist.videoIds.length} items in queue</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleLoop(playlist.id)}
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${
                    playlist.loop ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-rotate mr-1.5"></i>
                  {playlist.loop ? 'Loop Enabled' : 'No Loop'}
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {playlist.videoIds.slice(0, 3).map((vidId, idx) => {
                const video = data.videos.find(v => v.id === vidId);
                return (
                  <div key={idx} className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-lg border border-slate-700/30">
                    <span className="text-[10px] font-bold text-slate-600 w-4">{idx + 1}</span>
                    <p className="text-xs text-slate-300 truncate flex-1">{video?.filename || 'Unknown Video'}</p>
                    <span className="text-[10px] text-slate-500">{video?.duration || '--:--'}</span>
                  </div>
                );
              })}
              {playlist.videoIds.length > 3 && (
                <div className="text-center text-[10px] text-slate-500 font-bold py-1">
                  + {playlist.videoIds.length - 3} MORE ITEMS
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
              <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                <i className="fa-solid fa-pen-to-square"></i> Edit Playlist
              </button>
              <button className="text-xs font-bold text-red-500/70 hover:text-red-500 transition-colors flex items-center gap-1.5">
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistManager;
