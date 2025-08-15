import VideosDisplay from "../components/Videos/videosDisplay";
import VideosUpload from "../components/Videos/videosUpload";

const Videos: React.FC = () => {
  return (
    <div className="flex px-8 py-4 bg-[#0d0d0fd6] mx-1 text-white w-full h-full min-h-screen flex-col gap-5 font-geist">
      <div>
        <h1 className="text-2xl font-semibold my-2">VIDEO CLIPS</h1>
        <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
      </div>
      <VideosDisplay />
      <VideosUpload />
    </div>
  );
};

export default Videos;