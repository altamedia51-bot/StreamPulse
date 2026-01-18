
import React from 'react';

const Scheduler: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Automation Scheduler</h2>
          <p className="text-slate-400">Schedule automatic broadcast start and stop times.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all">
          <i className="fa-solid fa-calendar-plus"></i>
          Add Schedule
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white uppercase text-xs tracking-widest">Upcoming Jobs</h3>
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-500/20">
              Cron System Active
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex flex-col items-center justify-center text-indigo-500 font-bold">
                <span className="text-xs">MON</span>
                <span className="text-lg leading-none">24</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white">Daily Morning News Loop</h4>
                <p className="text-xs text-slate-500">Playlist: Default Loop • Starts 08:00 AM • Stops 12:00 PM</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-slate-600 font-bold uppercase">Next Run</p>
                  <p className="text-xs text-indigo-400 font-mono">In 14h 22m</p>
                </div>
                <div className="w-10 h-6 bg-indigo-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex items-center gap-6 opacity-60 group">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex flex-col items-center justify-center text-slate-500 font-bold">
                <span className="text-xs">FRI</span>
                <span className="text-lg leading-none">28</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-300">Weekend Tech Marathon</h4>
                <p className="text-xs text-slate-500">Playlist: Tech Showcase • Starts 06:00 PM (Fri) • Stops 06:00 PM (Sun)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-slate-600 font-bold uppercase">Next Run</p>
                  <p className="text-xs text-slate-500 font-mono">Inactive</p>
                </div>
                <div className="w-10 h-6 bg-slate-700 rounded-full flex items-center justify-start px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/30 p-4 text-center">
          <p className="text-xs text-slate-500 italic">Cron engine running on Node-Schedule v2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
