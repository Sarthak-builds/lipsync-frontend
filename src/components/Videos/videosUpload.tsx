import Button from "../UI/Button";
import { useRef, useState , useEffect} from "react";
import { useFileStore } from "../../stores/fileStore";
import { useVideoStore } from "../../stores/videoStore";
import type { VideoPayload } from "../../types/videos";


const VideosUpload:React.FC = () => {
    const {uploadFile, getFileById} = useFileStore();
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
      const [selectedFile, setSelectedFile] = useState< File | File[] | null> (null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { createVideo } = useVideoStore();

    // useEffect(()=>{
    //    const videosCollectionID = videosCollection?.map((video)=> video.id);
    //    console.log(videosCollectionID);
       
    // },[])

    const handleFormDisplay = () => {
     if(fileInputRef.current) {
        fileInputRef.current.click();
    }
}
useEffect(() => {
    if (selectedFile) {
      const uploadFileAsync = async () => {
        try {
          const responseOfVideoUploaded = await uploadFile(selectedFile);
          setSelectedFile(null);
          console.log("Upload response:", responseOfVideoUploaded);

          // Fetch the video file for preview (assuming getFileById returns a URL)
          const videoPreviewResponse = await getFileById(responseOfVideoUploaded.id);
          setVideoPreviewUrl(videoPreviewResponse.file); // Set the URL directly
          const videoPayload = {
            title : "TEST VIDEO CLIP UPLOAD",
             file : videoPreviewResponse.id,
          }
           const videoUploadResponseMetaData = await createVideo(videoPayload);
           console.log(videoUploadResponseMetaData);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      };
      uploadFileAsync();
    }
  }, [uploadFile, selectedFile, getFileById]);

    const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]); // Only take the first file
      console.log("Selected file:", e.target.files[0]);
    }
  };


    return (
        <div className="w-full h-100 bg-gray-700 flex gap-2">
          <div className="w-full h-full rounded-2xl bg-black flex  flex-col gap-2">
            <h1>UPLOAD VIDEO</h1>
            <div className="bg-black/10 w-full h-12 rounded-2xl border-2 ">
            <Button type="button" text="upload a video" onClick={handleFormDisplay}></Button>
            <input type="file" ref={fileInputRef} accept="video/*" className="hidden" onChange={handleAddFiles}></input>
            
            </div>
          </div>
          <div className="w-full h-full rounded-2xl bg-red-100">
            <h1>Preview</h1>
            <div className="w-80 h-100 ">
              {videoPreviewUrl ? (
            <video
              src={videoPreviewUrl}
              controls
              className="w-full h-80 bg-black/20 rounded-2xl flex items-center justify-center"
            />
          ) : (
            <p className="text-gray-500">No video preview available</p>
          )}
            </div>
          </div>
        </div>
    )
}
 export default VideosUpload;