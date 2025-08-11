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
    <div className='flex justify-center'>
    <Card className="w-full bg-black rounded-3xl border-1 border-gray-500 text-white font-grotesk max-w-[62rem]">
      <CardHeader>
        <CardTitle className="font-bold px-5 py-1 rounded-tl-lg rounded-br-lg text-lg text-center ring-1 ring-gray-500 w-fit">
          Your Videos
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
                  className="flex-none w-80 h-60"
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
              <p className="text-gray-400 text-center w-full py-4">No videos available</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default VideosDisplay;