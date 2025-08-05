import { useState, useEffect, useRef } from "react";
import { useVideoStore } from "../../stores/videoStore";
import { useFileStore } from "../../stores/fileStore";
import type { VideoCollection } from "../../types/videos";

const VideosDisplay: React.FC = () => {
  const { getAllVideos, videosCollection } = useVideoStore();
  const { getFileById } = useFileStore();
  const [videoUrls, setVideoUrls] = useState<string[]>([]); 
  const fetchedVideoIdsRef = useRef<Set<number>>(new Set()); 

  useEffect(() => {
    const fetchVideos = async () => {
      try { let videos: VideoCollection = videosCollection || [];
        if (!videosCollection) {
          videos = await getAllVideos();
        }
        console.log("Videos collection:", videos);
        const videoFileIds = videos
          .map((video) => video.file)
          .filter((id) => !fetchedVideoIdsRef.current.has(id));
        if (videoFileIds.length === 0) {
          console.log("No new videos to fetch");
          return;
        }
        const videoFilesPromises = videoFileIds.map((videoFileId) =>
          getFileById(videoFileId)
        );
        const videoFiles = await Promise.all(videoFilesPromises);
        videoFileIds.forEach((id) => fetchedVideoIdsRef.current.add(id));
        const newUrls = videoFiles.map((file) => file.file);
        setVideoUrls((prevUrls) => [...prevUrls, ...newUrls]);
        console.log("Updated video URLs:", [...videoUrls, ...newUrls]);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, [videosCollection, getAllVideos, getFileById]); 

  return (
    <div className="flex flex-col gap-4 overflow-x-auto px-2 py-1 border-2">
      <div className="w-full rounded-2xl flex justify-center items-center gap-4 px-1 py-1">
        {videoUrls.length > 0 ? (
          videoUrls.map((url, index) => (
            <div key={index} className="w-80 h-60">
              <video
                src={url}
                controls
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default VideosDisplay;