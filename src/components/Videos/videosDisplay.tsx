import { useState, useEffect, useRef } from 'react';
import { useVideoStore } from '../../stores/videoStore';
import { useFileStore } from '../../stores/fileStore';
import type { FileResponseMetaData } from '../../types/apiFiles';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/card';
import Button from '../UI/Button';
import ButtonRed from '../UI/ButtonRed';

const VideosDisplay: React.FC = () => {
  const { videosCollection, videoGeneratedResponse } = useVideoStore();
  const { getFileById } = useFileStore();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const fetchedVideoIdsRef = useRef<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {deleteFileById, getAllFiles}= useFileStore();
   const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState<number | null>(null);

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

  const handleDelete = (videoId: number) => {
setVideoToDelete(videoId);
setShowDeletePopup(true);
  } 
const confirmDelete = async () => {
    if (videoToDelete) {
      try {
       await deleteFileById(videoToDelete);
        setShowDeletePopup(false);
        setVideoToDelete(null);
        await getAllFiles();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };
  const cancelDelete = () => {
    setShowDeletePopup(false);
    setVideoToDelete(null);
  };

  return (
    <Card className="w-full  rounded-md  bg-[#0f0f11eb] text-white font-geist ">
      <CardHeader className='mb-5'>
            <CardTitle className="text-md p-[1px] w-fit rounded-sm bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"><div className='bg-black w-full rounded-sm px-5 py-1'>Videos Collection</div></CardTitle>
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
                  className="flex-none w-80 h-60 bg-black/20 rounded-2xl relative"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className='absolute right-1 top-2 z-20 rounded-md py-1 px-2'>
                  <i className="ri-delete-bin-6-line scale-125 text-red-700" onClick={()=>handleDelete(index)}></i>
                  </div>
                  <video
                    src={url}
                    controls
                    className="w-full h-full object-contain rounded-xl"
                  />
                   {showDeletePopup && (
        <div className="fixed inset-0 bg=black/50 flex items-center justify-center z-50">
          <Card className="bg-black rounded-2xl border-1 border-neutral-700 p-6 w-96 text-white font-geist">
            <CardHeader>
              <CardTitle className="text-lg">Confirm Delete</CardTitle>
              <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p>Are you sure you want to delete this voice file?</p>
              <div className="flex gap-4 justify-end">
                <ButtonRed type="button" text="Cancel" onClick={cancelDelete} />
                <Button type="button" text="Delete" onClick={confirmDelete} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
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