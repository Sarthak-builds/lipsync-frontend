import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useFileStore } from "../stores/fileStore";
import Button from "../components/UI/Button";
import { useVoiceStore } from "../stores/voicesStore";


const Dashboard: React.FC = () => {
   const {user} = useAuthStore();
   console.log(user);

   const {deleteFileById, uploadFile, filesData, filesIdDataCollection} = useFileStore();
   console.log(filesData);
   console.log(filesIdDataCollection);
const [selectedFile,setSelectedFile] = useState<File | null>(null);

   const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
  if(e.target.files) { setSelectedFile(e.target.files[0])
  }}

  const handleUpload = async () => {
    if(selectedFile) {
        const response = await uploadFile(selectedFile);
        console.log(`jab upload from dashboard se krte tab ka response :${response}`)
        setSelectedFile(null);
    }
  }
   const handleDelete = async (id: number) => {
   await deleteFileById(id);
   }


//    voices
const {getAllVoices, createVoice, voicesCollection , generatedVoiceResponse} = useVoiceStore();
const handleGetVoice = async () => {
  const response= await getAllVoices();
  console.log(response);
}
const handleCreateVoice = async () => {
    console.log(`files id data collection : ${filesIdDataCollection}`);
    console.log(filesIdDataCollection);
    const response = await createVoice(filesIdDataCollection);
    console.log(`ye raha create voice ka response ${response}`);
}

const handleVoiceGeneration = async () => {  
    const idOfVoiceForGeneration= voicesCollection.map((o)=> o.id);
    console.log(idOfVoiceForGeneration[0]);
     const response= await generatedVoiceResponse(idOfVoiceForGeneration[0]);
      //abhi ke liye we have array of voice ids....later we will select the id from the array by selecting the voice from the ui...isliye abhi direct 0th index ka add kiya hai.
     console.log(response);
}



    return (
        <div className="flex px-30 py-10 bg-black text-white w-full h-screen flex-col gap-10 "> 
           {user? ( 
             <h1 className="text-3xl text-white">
                Welcome to the Dashboard {user?.first_name}
                </h1>): 
                (<h1 className="text-3xl">
                    Welcome to the Dashboard 
                    </h1>)}     
                    {/* uploading the file */}
        <div className="border-2 w-full px-6 py-4 rounded-xl flex flex-col gap-5">
             <h2 className="text-bold"> UPLOAD A VIDEO OR AUDIO FILE</h2>
         <input type="file" accept="audio/*" onChange={handleFileChange}  className="bg-gray-700 px-2 py-1 rounded-lg"></input>
         <Button type="button" text="Upload" onClick={handleUpload}></Button>                 
        </div>
         {/* display files */}
         <div className="bg-gray-900 w-full h-fit px-6 py-4 rounded-xl flex flex-col gap-5">
            <h1>UPLOADED FILES ARE HERE</h1>
         {filesData.map((file)=> (
                <div key={file.id} className="bg-gray-800 w-fit px-5 flex flex-col gap-2 rounded-xl"> ID: 
                {file.id}
                <a href={file.file} target="_blank">Source: {file.file}</a>
                <Button onClick={()=>handleDelete(file.id)} text="Delete" type="button"></Button>
                </div>
         )
         )}
         {/* voices checkpoints */}
         <div className="w-full px-6 py-2 flex gap-3">
            <Button type="button" text="create a voice" onClick={handleCreateVoice}></Button>
            <Button type="button" text="Get All voices" onClick={handleGetVoice}></Button>
            <Button type="button" text="Generate the voice from eleven lab" onClick={handleVoiceGeneration}></Button>
         </div>
         <div></div>
         </div>
        </div>
    )
}

export default Dashboard;