import VoicesTable from "../components/Voices/VoicesTable";
import Button from "../components/UI/Button";
import {  useRef, useState } from "react";
import { useFileStore } from "../stores/fileStore";
import { useVoiceStore } from "../stores/voicesStore";
import type { VoiceMetaData } from "../types/voices";
import {Card, CardHeader, CardTitle,CardContent} from "../components/UI/card"
import ButtonRed from "../components/UI/ButtonRed";


const VoicePage:React.FC = () => {
    const [voiceName, setVoiceName] = useState<string>("");
const [createPanel, setCreatePanel] = useState(false);
const [selectedFile, setSelectedFile] = useState< File  | null> (null);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);
const { uploadFile, filesData, filesIdDataCollection, setFilesDataEmpty} = useFileStore();
const {createVoice, generatedVoiceResponse, getAllVoices} = useVoiceStore();
 const voiceNameInputRef = useRef<HTMLInputElement>(null);

const onCreateClick = () => {
setCreatePanel((prev)=> !prev);
}
const handleFormDisplay = () => {
     if(fileInputRef.current) {
        fileInputRef.current.click();
    }
}
const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

const handleCreateVoice = async () => {
  if (!voiceName?.trim()) {
            console.log("Voice name is required");
            voiceNameInputRef.current?.focus();
            return;
        }
        if (!selectedFile) {
            console.log("A voice samplez file is required");
            return;
        }
    if(selectedFile){
            try {
                const response = await uploadFile(selectedFile);
                console.log(response);
                 const filesDataForNewVoice = {
                name: voiceName.trim(),
                files: filesIdDataCollection.files,
            };
            const newVoice: VoiceMetaData = await createVoice(filesDataForNewVoice);
             if (newVoice?.id && newVoice.name) {
                await generatedVoiceResponse(newVoice.id);
            }
             await getAllVoices();
            clearAndClosePanel();
           } catch (error) {
                console.error("upload failed", error);
            }
        }
       } ;
       const clearAndClosePanel = () => {
        setVoiceName("");
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null); }
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; }
        setFilesDataEmpty();
        setCreatePanel(false); 
    };
    const handleBackClick = () => {
        clearAndClosePanel();
    }
    const handleVoiceName = (e: React.ChangeEvent<HTMLInputElement>) => {
     setVoiceName(e.target.value);
    };
    return (
       <div className="flex my-1 rounded-sm border-1 border-neutral-800
        py-4 px-8 bg-[#0d0d0fd6] mx-1 text-white w-full h-full  flex-col  font-geist"> 
       <div>
        <h1 className="text-xl font-semibold my-2 ">VOICES</h1>
       <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 " />

       </div>
            <div className="flex flex-col relative">
              <div className="absolute right-0 top-5 w-45 flex justify-end ">
              <Button type="button" text="Create +" onClick={onCreateClick}></Button>
              </div>
               <VoicesTable></VoicesTable>
            </div>
             {(createPanel)&&<div className="w-full h-full bg-black/40 inset-0 bg-opacity-50 backdrop-blur-xs z-50 flex justify-center items-center fixed  ">
                <Card className="w-[700px] bg-black rounded-3xl border-1 border-neutral-700 text-white font-geist">
            <CardHeader>
              <CardTitle className="text-lg">Create Voice</CardTitle>
               <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 " />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex gap-4  justify-center items-center mt-5">
                {/* <p className="italic text-gray-500 text-md w-50 ">Add a voice sample</p> */}
                
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="audio/*"
                    className="hidden"
                    onChange={handleAddFiles}
                  />
                  {!selectedFile ? ( <div className="w-full h-fit rounded-xl flex justify-center items-center border-dotted border-2 hover:bg-blue-600/10 border-blue-500 text-base cursor-pointer py-6 text-center"  onClick={handleFormDisplay} >
  <span className="text-base">
 <i className="ri-voice-ai-line px-2"></i>Upload Your Voice Sample <br />
  <span className="text-gray-500">[Max - 100 MB]</span> </span>
      </div>) : (
       <div className="w-full flex flex-col items-center gap-3 p-8 border rounded-lg border-blue-500 bg-gray-900/50">
         <p className="font-semibold text-white">{selectedFile.name}</p>
         {previewUrl && <audio controls src={previewUrl} className="w-full mx-6 py-1 h-12 px-4 rounded-sm bg-black text-white"></audio>}
         </div> )}
                 
                
              </div>
              <div className="flex  flex-col gap-2 items-start px-5 my-2">
               <div className="flex  justify-center gap-5 items-center w-full">
                 <h2 className="w-fit"> Name:</h2>
                <input ref={voiceNameInputRef} className="border-1 rounded-sm border-neutral-800 py-1 px-3 w-full" type="string" name="VoiceName" onChange={handleVoiceName} placeholder="Spongebob's voice sample" value={voiceName} ></input>
               </div>
              
              {filesData.map((file) => (
                <div key={file.id} className=" w-full">
                  <a href={file.file} target="_blank" className="text-blue-400 w-full">
                   <span className=" text-white"> Source:</span>  {file.file}
                  </a>
                </div>
              ))}
              </div>
              <div className="flex gap-4 justify-center">
                <ButtonRed type="button" text="Back" onClick={handleBackClick}>
                </ButtonRed>
                <Button text="Create a Voice" type="button" onClick={handleCreateVoice}>
                </Button>
                
              </div>
            </CardContent>
          </Card>
                
             </div>}
             </div>
        
    )
}

export default VoicePage;