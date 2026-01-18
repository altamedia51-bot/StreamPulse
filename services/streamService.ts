
import { StreamStatus, StreamLog } from '../types';

export class StreamService {
  private static logs: StreamLog[] = [];
  private static statusListeners: ((status: StreamStatus) => void)[] = [];
  private static logListeners: ((logs: StreamLog[]) => void)[] = [];

  static getStatus(): StreamStatus {
    return (localStorage.getItem('stream_status') as StreamStatus) || StreamStatus.IDLE;
  }

  static setStatus(status: StreamStatus) {
    localStorage.setItem('stream_status', status);
    this.statusListeners.forEach(l => l(status));
    this.addLog('info', `Stream status changed to: ${status}`);
  }

  static addLog(level: 'info' | 'warn' | 'error', message: string) {
    const log: StreamLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message
    };
    this.logs = [log, ...this.logs].slice(0, 100);
    this.logListeners.forEach(l => l(this.logs));
  }

  static async startStream(playlistId: string) {
    if (this.getStatus() === StreamStatus.RUNNING) return;

    this.setStatus(StreamStatus.STARTING);
    this.addLog('info', `Initializing stream for playlist: ${playlistId}`);
    
    // Simulate FFmpeg startup delay
    setTimeout(() => {
      this.setStatus(StreamStatus.RUNNING);
      this.addLog('info', 'FFmpeg process started successfully (PID: 8842)');
      this.addLog('info', 'RTMP handshake verified with YouTube');
      this.addLog('info', 'Broadcasting at 4500kbps, 1080p@30fps');
    }, 1500);
  }

  static async stopStream() {
    this.setStatus(StreamStatus.STOPPING);
    this.addLog('info', 'Sending SIGTERM to FFmpeg process...');
    
    setTimeout(() => {
      this.setStatus(StreamStatus.IDLE);
      this.addLog('info', 'Stream terminated gracefully.');
    }, 1000);
  }

  static subscribeStatus(callback: (status: StreamStatus) => void) {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(l => l !== callback);
    };
  }

  static subscribeLogs(callback: (logs: StreamLog[]) => void) {
    this.logListeners.push(callback);
    return () => {
      this.logListeners = this.logListeners.filter(l => l !== callback);
    };
  }

  static getLogs() {
    return this.logs;
  }
}
