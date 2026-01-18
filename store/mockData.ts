
import { VideoFile, RTMPDestination, Playlist, Schedule, StreamStatus, StreamSettings } from '../types';

const STORAGE_KEY = 'streampulse_v1_data';

interface AppData {
  videos: VideoFile[];
  destinations: RTMPDestination[];
  playlists: Playlist[];
  schedules: Schedule[];
  status: StreamStatus;
  settings: StreamSettings;
}

const DEFAULT_DATA: AppData = {
  videos: [
    {
      id: 'v1',
      filename: 'nature_promo.mp4',
      duration: '05:22',
      resolution: '1920x1080',
      size: '245MB',
      thumbnail: 'https://picsum.photos/seed/nature/300/200',
      createdAt: new Date().toISOString()
    },
    {
      id: 'v2',
      filename: 'tech_tutorial_final.mp4',
      duration: '12:45',
      resolution: '1920x1080',
      size: '890MB',
      thumbnail: 'https://picsum.photos/seed/tech/300/200',
      createdAt: new Date().toISOString()
    }
  ],
  destinations: [
    {
      id: 'd1',
      name: 'Main YT Channel',
      url: 'rtmp://a.rtmp.youtube.com/live2',
      key: 'xxxx-yyyy-zzzz-wwww',
      enabled: true,
      platform: 'youtube'
    }
  ],
  playlists: [
    {
      id: 'p1',
      name: 'Default Loop',
      videoIds: ['v1', 'v2'],
      loop: true
    }
  ],
  schedules: [],
  status: StreamStatus.IDLE,
  settings: {
    resolution: '1920x1080',
    bitrate: '4500k',
    fps: 30,
    audioPassthrough: true,
    reconnectDelay: 5
  }
};

export const loadData = (): AppData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_DATA;
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
