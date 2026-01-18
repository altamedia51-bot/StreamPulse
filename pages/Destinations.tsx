
import React, { useState } from 'react';
import { loadData, saveData } from '../store/mockData';
import { RTMPDestination } from '../types';

const Destinations: React.FC = () => {
  const [data, setData] = useState(loadData());
  const [showForm, setShowForm] = useState(false);

  const toggleDestination = (id: string) => {
    const newData = {
      ...data,
      destinations: data.destinations.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d)
    };
    setData(newData);
    saveData(newData);
  };

  const deleteDestination = (id: string) => {
    if (confirm('Delete this destination?')) {
      const newData = {
        ...data,
        destinations: data.destinations.filter(d => d.id !== id)
      };
      setData(newData);
      saveData(newData);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Broadcast Destinations</h2>
          <p className="text-slate-400">Configure RTMP endpoints for simultaneous multi-streaming.</p>
        </div>
        <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all"
          onClick={() => setShowForm(true)}
        >
          <i className="fa-solid fa-plus"></i>
          Add Destination
        </button>
      </div>

      <div className="space-y-4">
        {data.destinations.map((dest) => (
          <div key={dest.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center gap-6 group hover:border-indigo-500/40 transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              dest.platform === 'youtube' ? 'bg-red-500/10 text-red-500' : 
              dest.platform === 'facebook' ? 'bg-blue-600/10 text-blue-500' : 'bg-slate-700/50 text-indigo-400'
            }`}>
              <i className={`fa-brands fa-${dest.platform} text-2xl`}></i>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-bold text-white text-lg">{dest.name}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                  {dest.platform}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <i className="fa-solid fa-link text-[10px]"></i>
                <code className="bg-slate-950/50 px-2 py-0.5 rounded text-xs truncate max-w-md">{dest.url}</code>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status</p>
                <div className="flex items-center justify-end gap-2">
                   <span className={`text-xs font-bold ${dest.enabled ? 'text-green-500' : 'text-slate-500'}`}>
                    {dest.enabled ? 'Enabled' : 'Disabled'}
                   </span>
                   <button 
                    onClick={() => toggleDestination(dest.id)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${dest.enabled ? 'bg-indigo-600' : 'bg-slate-600'}`}
                   >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${dest.enabled ? 'left-6' : 'left-1'}`}></div>
                   </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 border-l border-slate-700 pl-6">
                <button className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-colors">
                  <i className="fa-solid fa-pen text-xs text-white"></i>
                </button>
                <button 
                  onClick={() => deleteDestination(dest.id)}
                  className="w-8 h-8 rounded bg-slate-700 hover:bg-red-900/50 group/del flex items-center justify-center transition-colors"
                >
                  <i className="fa-solid fa-trash-can text-xs text-white group-hover/del:text-red-400"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.destinations.length === 0 && (
          <div className="py-12 bg-slate-800/20 border-2 border-dashed border-slate-700 rounded-2xl text-center">
            <i className="fa-solid fa-broadcast-tower text-4xl text-slate-700 mb-3"></i>
            <p className="text-slate-500 font-medium">No streaming destinations configured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
