
import React, { useState, useEffect, useRef } from 'react';
import { StreamService } from '../services/streamService';
import { StreamLog } from '../types';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<StreamLog[]>(StreamService.getLogs());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = StreamService.subscribeLogs(setLogs);
    return unsub;
  }, []);

  const getLevelStyles = (level: string) => {
    switch(level) {
      case 'error': return 'text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded';
      case 'warn': return 'text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded';
      default: return 'text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">System Logs</h2>
          <p className="text-slate-400">Real-time FFmpeg process and backend activity monitoring.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm border border-slate-700 transition-colors">
            Clear Logs
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm border border-slate-700 transition-colors">
            Download Log File
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-4">
            <span>TERMINAL SESSION: AS-CONSOLE-01</span>
            <span>PID: 8842</span>
          </div>
          <span>LIVE OUTPUT</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2 selection:bg-indigo-500/30">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic">Awaiting process start...</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex gap-4 group">
                <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                <span className={`shrink-0 font-bold uppercase text-[10px] self-center ${getLevelStyles(log.level)}`}>
                  {log.level}
                </span>
                <span className="text-slate-300 break-all">{log.message}</span>
              </div>
            ))
          )}
          <div ref={scrollRef}></div>
        </div>
        
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mt-1.5 shrink-0"></div>
          <p className="text-xs text-slate-500 italic">Streaming live log output from child_process system...</p>
        </div>
      </div>
    </div>
  );
};

export default Logs;
