import VideosDisplay from "../components/Videos/videosDisplay";
import VideosUpload from "../components/Videos/videosUpload";
const Videos:React.FC = () => {


    return (
        <div className="flex px-30
        py-10  bg-black/30 mx-1 text-white w-full h-full  min-h-screen flex-col gap-5 font-grotesk">
             <div>
        <h1 className="text-3xl font-semibold my-2 ">VIDEO CLIPS</h1>
       <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 " />

               </div>
            <VideosDisplay></VideosDisplay>
            <VideosUpload></VideosUpload>
        </div>
    )
}

export default Videos;