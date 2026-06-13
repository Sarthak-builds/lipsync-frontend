import React, { useState } from "react";
import { Upload, Play, Trash2, Film, Plus } from "lucide-react";
import { toast } from "sonner";

interface VideoItem {
  id: number;
  name: string;
  url: string;
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
    toast.info("We are building this functionality.", {
      description: "Simulating video upload for demo purposes.",
      duration: 5000,
    });

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
    <div className="flex flex-col w-full min-h-screen bg-[#faf8f5] dark:bg-[#0d0d0c] text-[#1c1c1c] dark:text-[#e5e1db] p-4 md:p-8 font-sans transition-colors duration-300 relative">
      <div className="flex items-center justify-between mb-8 border-b border-[#ebdcd0]/30 dark:border-[#201f1c] pb-6">
        <div>
          <h1 className="text-3xl font-normal flex items-center gap-2.5 font-serif text-[#1c1c1c] dark:text-white">
            <Film className="w-7 h-7 text-[#385942] dark:text-[#7ea68a]" />
            Video Gallery
          </h1>
          <p className="text-[#5c5852] dark:text-[#a39e95] text-xs mt-1">Manage your video assets for generation.</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#385942] hover:bg-[#2d4735] dark:bg-[#4b7358] dark:hover:bg-[#3d5e48] text-white dark:text-black rounded-full transition-colors text-xs font-semibold tracking-wide shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Upload Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upload Dotted Card */}
        <div
          onClick={handleUpload}
          className="group border border-dashed border-[#ebdcd0] hover:border-[#385942] dark:border-[#201f1c] dark:hover:border-[#7ea68a] hover:bg-[#faf8f5] dark:hover:bg-[#121211]/30 rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all"
        >
          <div className="p-3.5 rounded-full border border-[#ebdcd0] dark:border-[#201f1c] bg-transparent text-[#5c5852] group-hover:bg-[#385942] group-hover:text-white dark:group-hover:bg-[#4b7358] dark:group-hover:text-black transition-colors mb-3">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-[#1c1c1c] dark:text-zinc-200 text-sm font-semibold">Click to Upload</p>
          <p className="text-[#5c5852] dark:text-[#a39e95] text-[10px] mt-1 font-mono">MP4 or MOV files up to 100MB</p>
        </div>

        {/* Video Items */}
        {videos.map((video) => (
          <div key={video.id} className="group relative bg-[#fdfdfc] dark:bg-[#121211] border border-[#ebdcd0] dark:border-[#201f1c] hover:border-[#385942] dark:hover:border-[#7ea68a] rounded-2xl overflow-hidden transition-all shadow-sm">
            <div className="h-32 bg-[#faf8f5] dark:bg-[#0d0d0c] border-b border-[#ebdcd0]/30 dark:border-[#201f1c]/50 flex items-center justify-center relative">
              <Film className="w-8 h-8 text-[#ebdcd0] dark:text-[#201f1c] group-hover:text-[#385942] dark:group-hover:text-[#7ea68a] transition-colors" />
              <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[1px]">
                <button className="p-3 rounded-full bg-white dark:bg-[#121211] text-[#385942] dark:text-[#7ea68a] hover:scale-105 transition-transform shadow-lg cursor-pointer border border-[#ebdcd0] dark:border-[#201f1c]">
                  <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#fdfdfc] dark:bg-[#121211]">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-[#1c1c1c] dark:text-zinc-200 truncate max-w-[180px]" title={video.name}>{video.name}</h3>
                  <p className="text-xs text-[#5c5852] dark:text-[#a39e95] font-mono">{video.size} • {video.date}</p>
                </div>
                <button className="text-[#5c5852] dark:text-[#a39e95] hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full cursor-pointer">
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