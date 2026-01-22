import React, { useState } from "react";
import { Upload, Play, Trash2, Film, Plus } from "lucide-react";
import { toast } from "sonner";
// import { cn } from "../lib/utils";

interface VideoItem {
  id: number;
  name: string;
  url: string; // Mock url or placeholder
  size: string;
  date: string;
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([
    { id: 1, name: "Demo_Product_Launch.mp4", url: "", size: "12.5 MB", date: "2024-03-10" },
    { id: 2, name: "Tutorial_Part1.mp4", url: "", size: "45.2 MB", date: "2024-03-12" },
    { id: 3, name: "Customer_Testimonial.mp4", url: "", size: "8.1 MB", date: "2024-03-14" },
  ]);

  const handleUpload = () => {
    // Show the restriction message as requested, but also simulate add for workflow
    toast.info("We are building this functionality. Costs are limited due to AI API usage.", {
      description: "Simulating video upload for demo purposes.",
      duration: 5000,
    });

    // Simulate adding a video
    const newVideo: VideoItem = {
      id: Date.now(),
      name: `New_Upload_${videos.length + 1}.mp4`,
      url: "",
      size: "10.0 MB",
      date: new Date().toISOString().split('T')[0]
    };
    setVideos([newVideo, ...videos]);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#0d0d0f] text-zinc-900 dark:text-white p-8 font-sans transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Film className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            Video Gallery
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Manage your video assets for generation.</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Upload Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upload Placeholder (Visual cue) */}
        <div
          onClick={handleUpload}
          className="group border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all"
        >
          <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 group-hover:bg-blue-500/20 text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 text-sm font-medium">Click to Upload</p>
          <p className="text-zinc-500 dark:text-zinc-600 text-xs mt-1">MP4, MOV up to 100MB</p>
        </div>

        {videos.map((video) => (
          <div key={video.id} className="group relative bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-white/10 rounded-xl overflow-hidden transition-all shadow-sm">
            {/* Thumbnail Placeholder */}
            <div className="h-32 bg-zinc-200 dark:bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-300 dark:group-hover:bg-zinc-800 transition-colors relative">
              <Film className="w-8 h-8 text-zinc-400 dark:text-zinc-700 group-hover:text-zinc-600" />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                <button className="p-2 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white text-zinc-900 dark:text-white backdrop-blur-md transition-transform hover:scale-110 shadow-lg">
                  <Play className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>

            <div className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 truncate max-w-[180px]" title={video.name}>{video.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{video.size} • {video.date}</p>
                </div>
                <button className="text-zinc-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;