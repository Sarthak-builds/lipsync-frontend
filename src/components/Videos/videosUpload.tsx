import { useRef, useState } from "react";
import { useFileStore } from "../../stores/fileStore";
import { useVideoStore } from "../../stores/videoStore";
import { Card, CardHeader, CardTitle, CardContent } from "../UI/card";
import Button from "../UI/Button";
import ButtonRed from "../UI/ButtonRed";

const VideosUpload: React.FC = () => {
  const { getFileById } = useFileStore();
  const { uploadVideoFile } = useVideoStore(); // Added getAllVideos
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormDisplay = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
        try {
   
          const responseOfVideoUploaded = await uploadVideoFile(selectedFile);
          setSelectedFile(null);
          console.log("Upload response:", responseOfVideoUploaded);
          const videoPreviewResponse = await getFileById(responseOfVideoUploaded.id);
          setVideoPreviewUrl(videoPreviewResponse.file);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    };

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
      console.log("Selected file:", file);
    }
  };
const handleReset = () => {
  setSelectedFile(null);
  setVideoPreviewUrl(null);
  if(fileInputRef.current) {
    fileInputRef.current.value="";
  }
};
  return (
    <div className=" flex flex-col md:flex-row gap-6 px-4 py-6 text-white font-geist rounded-sm bg-[#0d0d0fd6]  border-neutral-700 ">
       <Card className="w-full md:w-1/2  rounded-3xl border-1 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-lg">Upload Video</CardTitle>
          <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        </CardHeader>
        <CardContent className="  flex flex-col gap-5">
          
            {/* <p className="italic text-gray-500 text-md w-fit">Upload a Video</p> */}
            <div
              className="w-full h-fit rounded-xl flex justify-center items-center border-dotted border-2 hover:bg-blue-600/10 border-blue-500 text-base cursor-pointer py-6 text-center"
              onClick={handleFormDisplay}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="video/*"
                className="hidden"
                onChange={handleAddFiles}
              />
              <span className="text-base">
                <i className="ri-video-upload-line px-2"></i>Upload Your Video Sample <br />
                <span className="text-gray-500">[Max - 100 MB]</span>
              </span>
            </div>
          
          <div className="flex gap-4 justify-center mt-4">
            <ButtonRed type="button" text="Clear" onClick={handleReset} />
            <Button type="button" text="Upload Video" onClick={handleUpload} />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full  rounded-3xl border-1 border-neutral-700 text-white font-geist">
        <CardHeader>
          <CardTitle className="text-lg">Video Preview</CardTitle>
          <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="  w-full h-60 bg-black/20 rounded-xl flex items-center justify-center">
            {videoPreviewUrl ? (
              <video
                src={videoPreviewUrl}
                controls
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <p className="text-gray-400">No video preview available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideosUpload;