import Button from "../UI/Button";
import { useState } from "react";
import { useVideoStore } from "../../stores/videoStore";
import { getFileById } from "../../services/apiFiles";
const VideosDisplay:React.FC = () => {

const {getAllVideos, videosCollection } = useVideoStore();
const [allVideosURLId, setAllVideosURLId] = useState<number[]>([]);
  const handleGetUploadedVideos = async () => {
    const getUploadedVideosResponse = await getAllVideos();
   console.log(getUploadedVideosResponse);
   const videosURLId = getUploadedVideosResponse.map((video)=> video.id);
   setAllVideosURLId(videosURLId);
   console.log(videosURLId);
  //  const getVideosFiles = await getFileById(allVideosURLId);
  //  console.log(getVideosFiles);
  }

  return (
    <div className="flex flex-col gap-4 overflow-x-auto px-2 py-1 border-2">
        <div className=" w-full h-120 rounded-2xl flex justify-center items-center gap-4 px-1 py-1 ">
       {/* yaha pr url id se getfilebid krke har id ke liye file mangwao and fir display karwao...toh pehle sabki file mangwa lo fir display karwana */}
        </div>
        <div className="bg-red-100 w-full rounded-2xl flex justify-center">
            <Button type="button" text="Get All Videos" onClick={handleGetUploadedVideos}></Button>
        </div>
        </div>
    )
}

export default VideosDisplay;