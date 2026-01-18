
import React, { useState } from 'react';
import { loadData, saveData } from '../store/mockData';
import { VideoFile } from '../types';

const VideoLibrary: React.FC = () => {
  const [data, setData] = useState(loadData());
  const [uploading, setUploading] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('Delete this video? This cannot be undone.')) {
      const newData = { ...data, videos: data.videos.filter(v => v.id !== id) };
      setData(newData);
      saveData(newData);
    }
  };

  const handleUploadSim = () => {
    setUploading(true);
    setTimeout(() => {
      const newVideo: VideoFile = {
        id: Math.random().toString(36).substr(2, 9),
        filename: `uploaded_video_${Math.floor(Math.random() * 1000)}.mp4`,
        duration: '08:30',
        resolution: '1920x1080',
        size: '412MB',
        thumbnail: `https://picsum.photos/seed/${Math.random()}/300/200`,
        createdAt: new Date().toISOString()
      };
      const newData = { ...data, videos: [newVideo, ...data.videos] };
      setData(newData);
      saveData(newData);
      setUploading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Video Library</h2>
          <p className="text-slate-400">Total stored media: {data.videos.length} files</p>
        </div>
        <button 
          onClick={handleUploadSim}
          disabled={uploading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <i className={`fa-solid ${uploading ? 'fa-spinner fa-spin' : 'fa-upload'}`}></i>
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.videos.map((video) => (
          <div key={video.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all duration-300">
            <div className="aspect-video relative overflow-hidden">
              <img src={video.thumbnail} alt={video.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <i className="fa-solid fa-play text-white"></i>
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-semibold text-white truncate mb-1" title={video.filename}>{video.filename}</h4>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                <span>{video.resolution}</span>
                <span>{video.size}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <span className="text-[10px] text-slate-500 uppercase tracking-tighter">
                  Added {new Date(video.createdAt).toLocaleDateString()}
                </span>
                <button 
                  onClick={() => handleDelete(video.id)}
                  className="text-slate-500 hover:text-red-500 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        {data.videos.length === 0 && (
          <div className="col-span-full py-20 bg-slate-800/20 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center">
            <i className="fa-solid fa-cloud-arrow-up text-5xl text-slate-700 mb-4"></i>
            <p className="text-slate-400 font-medium">No videos found. Upload your first file.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;
