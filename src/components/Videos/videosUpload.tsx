import { useRef, useState, useEffect } from "react";
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

  useEffect(() => {
    if (selectedFile) {
      const uploadFileAsync = async () => {
        try {
   
          const responseOfVideoUploaded = await uploadVideoFile(selectedFile);
          // await createVideo({ title: "TEST", file: responseOfVideoUploaded.id });
          setSelectedFile(null);
          console.log("Upload response:", responseOfVideoUploaded);
          const videoPreviewResponse = await getFileById(responseOfVideoUploaded.id);
          setVideoPreviewUrl(videoPreviewResponse.file);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      };
      uploadFileAsync();
    }
  }, [uploadVideoFile, selectedFile, getFileById]);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      console.log("Selected file:", e.target.files[0]);
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
    <div className=" h-120 flex flex-col md:flex-row gap-6 px-4 py-6 text-white font-grotesk">
       <Card className="w-full md:w-1/2 bg-black rounded-3xl border-1 border-gray-500">
        <CardHeader>
          <CardTitle className="text-xl">Upload Video</CardTitle>
          <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        </CardHeader>
        <CardContent className=" h-full flex flex-col gap-12 justify-between">
          <div className="flex flex-col gap-4 justify-center items-center mt-5">
            {/* <p className="italic text-gray-500 text-md w-fit">Upload a Video</p> */}
            <div
              className="w-90 h-40 rounded-xl flex justify-center items-center border-1 hover:bg-indigo-600/10 border-indigo-600/50 text-base cursor-pointer"
              onClick={handleFormDisplay}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="video/*"
                className="hidden"
                onChange={handleAddFiles}
              />
              <span>Choose Video File</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <ButtonRed type="button" text="Reset" onClick={handleReset} />
            <Button type="button" text="Upload Video" onClick={handleFormDisplay} />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full md:w-1/2 bg-black rounded-3xl border-1 border-gray-500">
        <CardHeader>
          <CardTitle className="text-xl">Video Preview</CardTitle>
          <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
        </CardHeader>
        <CardContent>
          <div className=" px-4 w-100 h-80 bg-black/20 rounded-xl flex items-center justify-center">
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