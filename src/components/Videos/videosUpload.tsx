import { useRef, useState, useEffect } from "react";
import { useFileStore } from "../../stores/fileStore";
import { useVideoStore } from "../../stores/videoStore";

const VideosUpload: React.FC = () => {
  const { uploadFile, getFileById } = useFileStore();
  const { createVideo, getAllVideos } = useVideoStore(); // Added getAllVideos
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
   
          const responseOfVideoUploaded = await uploadFile(selectedFile);
          await createVideo({ title: "TEST", file: responseOfVideoUploaded.id });
          await getAllVideos(); 
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
  }, [uploadFile, selectedFile, getFileById, createVideo, getAllVideos]);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      console.log("Selected file:", e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-700 flex gap-2 p-4">
      <div className="w-1/2 h-full rounded-2xl bg-black flex flex-col gap-2 p-4">
        <h1 className="text-white text-xl">UPLOAD VIDEO</h1>
        <div className="bg-black/10 w-full h-12 rounded-2xl border-2 flex items-center justify-center">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleFormDisplay}
          >
            Upload a Video
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            className="hidden"
            onChange={handleAddFiles}
          />
        </div>
      </div>
      <div className="w-1/2 h-full rounded-2xl bg-red-100 p-4">
        <h1 className="text-xl">Preview</h1>
        <div className="w-full h-80 bg-black/20 rounded-2xl flex items-center justify-center">
          {videoPreviewUrl ? (
            <video
              src={videoPreviewUrl}
              controls
              className="w-full h-full object-contain rounded-2xl"
            />
          ) : (
            <p className="text-gray-500">No video preview available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideosUpload;