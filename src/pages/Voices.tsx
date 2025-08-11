import VoicesTable from "../components/Voices/VoicesTable";
import Button from "../components/UI/Button";
import { useEffect, useRef, useState } from "react";
import { useFileStore } from "../stores/fileStore";
import { useVoiceStore } from "../stores/voicesStore";
import type { VoiceMetaData } from "../types/voices";
import {Card, CardHeader, CardTitle,CardContent} from "../components/UI/card"
import ButtonRed from "../components/UI/ButtonRed";


const VoicePage:React.FC = () => {
    const [voiceName, setVoiceName] = useState<string>("");
const [createPanel, setCreatePanel] = useState(false);
const [selectedFile, setSelectedFile] = useState< File | File[] | null> (null);
const fileInputRef = useRef<HTMLInputElement>(null);
const { uploadFile, filesData, filesIdDataCollection, setFilesDataEmpty} = useFileStore();
const {createVoice, generatedVoiceResponse} = useVoiceStore();
 const voiceNameInputRef = useRef<HTMLInputElement>(null);

const onCreateClick = () => {
setCreatePanel((prev)=> !prev);
}
const handleFormDisplay = () => {
     if(fileInputRef.current) {
        fileInputRef.current.click();
    }
}
const handleAddFiles = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if( e.target?.files || e.target.files?.length) {
        for (const file of e.target.files) {
            setSelectedFile(file);
        }
    };
    console.log(e.target.files);
    console.log(selectedFile);
}

useEffect(()=> {
    if(selectedFile){
        const uploadFileAsync = async () => {
            try {
                const response = await uploadFile(selectedFile);
                setSelectedFile(null);
                console.log(response);
                if(fileInputRef.current) {
                    fileInputRef.current.value="";
                }
            } catch (error) {
                console.error("upload failed", error);
            }
        } ;
        uploadFileAsync();
    }
},[uploadFile, selectedFile]);

//handle create a voice by clicking on button
const handleCreateVoice = async () => {
    if (!voiceName.trim()) {
      console.log("Voice name is required");
      voiceNameInputRef.current?.focus();
      return;
    }
    console.log(filesIdDataCollection);
    const filesDataForNewVoice = {
        name : voiceName.trim(),
        files : filesIdDataCollection.files,
    }
const newVoice:VoiceMetaData =  await createVoice(filesDataForNewVoice);
   setSelectedFile(null);
   setCreatePanel(false);
   setVoiceName("");
   ///////////////
   //generating voice
   if(newVoice?.id && newVoice.name){ 
   const response= await generatedVoiceResponse(newVoice?.id);
     console.log(response);
   }
   //generating voice
   //////////////////
   if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input
      }
   await setFilesDataEmpty();
};
 const handleBackClick = () => {
    setCreatePanel(false);
    setVoiceName("");
    if(fileInputRef.current) {
        fileInputRef.current.value="";
    }
    setSelectedFile(null);
 }
 const handleVoiceName = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value) {
     setVoiceName(e.target.value);
    }
 }

    return (
       <div className="flex px-30
        py-10  bg-black/30 mx-1 text-white w-full h-full  min-h-screen flex-col gap-5 font-grotesk"> 
       <div>
        <h1 className="text-3xl font-semibold my-2 ">VOICES</h1>
       <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 " />

       </div>
            <div className="flex flex-col relative">
              <div className="absolute right-0 top-9 w-40 flex justify-end ">
              <Button type="button" text="Create+" onClick={onCreateClick}></Button>
              </div>
               <VoicesTable></VoicesTable>
            </div>

            {/* <div className="flex justify-end items-center w-80">
             <Button type="button" text="Create+"  onClick={onCreateClick}></Button>
             </div> */}
             {(createPanel)&&<div className="w-full h-full bg-black/40 inset-0 bg-opacity-50 backdrop-blur-xs z-50 flex justify-center items-center fixed  ">

                {/* <div className=" w-200 h-140 bg-white/30 rounded-3xl flex flex-col justify-center items-center gap-5 "> */}
                <Card className="w-[700px] bg-black rounded-3xl border-1 border-gray-500 text-white font-grotesk">
            <CardHeader>
              <CardTitle className="text-xl">Create Voice</CardTitle>
               <hr className="w-full h-[2px] border-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 " />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex gap-4  justify-center items-center mt-5">
                <p className="italic text-gray-500 text-md w-50">Add a voice sample</p>
                <div
                  className="w-full h-12 rounded-xl flex justify-center items-center border-1 hover:bg-indigo-600/50 border-indigo-600/50 text-base cursor-pointer "
                  onClick={handleFormDisplay}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="audio/*"
                    className="hidden"
                    onChange={handleAddFiles}
                  />
                  <span>Upload Voice Sample</span>
                </div>
              </div>
              <div className="flex  flex-col gap-2 items-start px-5 my-8">
               <div className="flex  justify-center gap-5 items-center">
                 <h2>Name:</h2>
                <input ref={voiceNameInputRef} className="border-1 rounded-sm border-gray-600 py-1 px-3 w-full" type="string" name="VoiceName" onChange={handleVoiceName} placeholder="voice sample" value={voiceName} ></input>
               </div>
              
              {filesData.map((file) => (
                <div key={file.id} className="">
                  {/* <p>ID: {file.id}</p> */}
                  {/* <p>Name: {file.id || "Unknown"}</p> */}
                  <a href={file.file} target="_blank" className="text-blue-400">
                   <span className=" text-white"> Source:</span>  {file.file}
                  </a>
                </div>
              ))}
              </div>
              <div className="flex gap-4 justify-center">
                <ButtonRed type="button" text="back" onClick={handleBackClick}>
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