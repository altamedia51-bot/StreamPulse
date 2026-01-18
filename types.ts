
export enum StreamStatus {
  IDLE = 'IDLE',
  STARTING = 'STARTING',
  RUNNING = 'RUNNING',
  STOPPING = 'STOPPING',
  ERROR = 'ERROR'
}

export interface VideoFile {
  id: string;
  filename: string;
  duration: string;
  resolution: string;
  size: string;
  thumbnail: string;
  createdAt: string;
}

export interface RTMPDestination {
  id: string;
  name: string;
  url: string;
  key: string;
  enabled: boolean;
  platform: 'youtube' | 'facebook' | 'twitch' | 'custom';
}

export interface Playlist {
  id: string;
  name: string;
  videoIds: string[];
  loop: boolean;
}

export interface Schedule {
  id: string;
  name: string;
  playlistId: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
  days: string[]; // ['Mon', 'Tue'...]
}

export interface StreamLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export interface StreamSettings {
  resolution: string;
  bitrate: string;
  fps: number;
  audioPassthrough: boolean;
  reconnectDelay: number;
}
