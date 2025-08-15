import { useState, useEffect, useRef } from 'react';
import { useVideoStore } from '../../stores/videoStore';
import { useFileStore } from '../../stores/fileStore';
import type { FileResponseMetaData } from '../../types/apiFiles';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';

const VideosDisplay: React.FC = () => {
  const { videosCollection, videoGeneratedResponse } = useVideoStore();
  const { getFileById } = useFileStore();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const fetchedVideoIdsRef = useRef<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchVideos = async () => {
    try {
      const videos: FileResponseMetaData[] = videosCollection;
      console.log('Videos collection:', videos);
      const videoFileIds = videos
        .map((video) => video.id)
        .filter((id) => !fetchedVideoIdsRef.current.has(id));

      if (videoFileIds.length === 0) {
        console.log('No new videos to fetch');
        return;
      }
      const videoFilesPromises = videoFileIds.map((videoFileId) =>
        getFileById(videoFileId)
      );
      const videoFiles = await Promise.all(videoFilesPromises);
      videoFileIds.forEach((id) => fetchedVideoIdsRef.current.add(id));
      const newUrls = videoFiles.map((file) => file.file);
      setVideoUrls((prevUrls) => {
        const updatedUrls = [...prevUrls, ...newUrls];
        console.log('Updated video URLs:', updatedUrls);
        return updatedUrls;
      });
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [videosCollection, videoGeneratedResponse]);

  return (
    <Card className="w-full  rounded-md  bg-[#0f0f11eb] text-white font-geist ">
      <CardHeader>
        <CardTitle className=" px-5 py-1 border-1 border-neutral-700 bg-[#0e0e11] rounded-sm text-md text-center w-fit">
          Videos Collection
        </CardTitle>
      </CardHeader>
      <CardContent className=" w-full relative overflow-hidden">
        <div className="flex items-center gap-2">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-8 py-4 scrollbar-hide max-w-full"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {videoUrls.length > 0 ? (
              videoUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex-none w-80 h-60 bg-black/20 rounded-2xl"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <video
                    src={url}
                    controls
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
              ))
            ) : (
              <div className='w-full flex justify-center items-center'>
              <p className="text-gray-400 text-center w-full py-2 px-2  ">No videos available</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    
  );
};

export default VideosDisplay;