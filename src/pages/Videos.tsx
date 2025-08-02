import VideosDisplay from "../components/Videos/videosDisplay";
import VideosUpload from "../components/Videos/videosUpload";
const Videos:React.FC = () => {


    return (
        <div className="flex  py-10 bg-neutral-800 mx-1 rounded-2xl text-white w-full h-full  min-h-screen flex-col gap-10">
            <div>
                VIDEOS
            </div>
            <VideosDisplay></VideosDisplay>
            <VideosUpload></VideosUpload>
        </div>
    )
}

export default Videos;