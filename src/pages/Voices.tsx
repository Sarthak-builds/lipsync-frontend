import VoicesTable from "../components/Voices/VoicesTable";
import Button from "../components/UI/Button";
import { useEffect, useRef, useState } from "react";
import { useFileStore } from "../stores/fileStore";

const VoicePage:React.FC = () => {
const [createPanel, setCreatePanel] = useState(false);
const [selectedFile, setSelectedFile] = useState< File | null> (null);
const fileInputRef = useRef<HTMLInputElement>(null);
const { uploadFile, filesData} = useFileStore();

const onCreateClick = () => {
setCreatePanel((prev)=> !prev);
}
const handleFormDisplay = () => {
     if(fileInputRef.current) {
        fileInputRef.current.click();
    }
}
const handleAddFiles = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if( e.target.files) {setSelectedFile(e.target.files[0])};
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
const handleCreateVoice = () => {

    
}

    return (
       <div className="flex px-30 py-10 bg-neutral-800 mx-1 rounded-2xl text-white w-full h-full  min-h-screen flex-col gap-10 "> 
       <div>
        <h1>VOICES</h1>
       </div>
            <div>
                <VoicesTable></VoicesTable>
            </div>

            <div className="flex justify-center items-center">
             <Button type="button" text="Create+"  onClick={onCreateClick}></Button>
             </div>
             {(createPanel)&&<div className="w-full h-full bg-black/40 inset-0 bg-opacity-50 backdrop-blur-xs z-50 flex justify-center items-center fixed  ">
                <div className=" w-200 h-140 bg-white/30 rounded-3xl flex flex-col justify-center items-center gap-5 ">
                <div className="w-40 h-40 rounded-2xl flex justify-center items-center bg-black/70 text-xl" onClick={handleFormDisplay}>
                <input type="file" ref={fileInputRef} accept="audio/*" className="hidden" onChange={handleAddFiles}></input>
                <span className=" cursor-pointer">Add Sample Voices</span>
                </div>
                 {filesData.map((file)=> (
                <div key={file.id} className="bg-gray-800 w-fit px-5 flex flex-col gap-2 rounded-xl"> ID: 
                {file.id}
                <a href={file.file} target="_blank">Source: {file.file}</a>
                {/* <Button onClick={()=>handleDelete(file.id)} text="Delete" type="button"></Button> */}
                </div>
         )
         )}
                    <Button type="button" text="Create A Voice" onClick={handleCreateVoice}></Button>
                </div>
             </div>}
             </div>
        
    )
}

export default VoicePage;