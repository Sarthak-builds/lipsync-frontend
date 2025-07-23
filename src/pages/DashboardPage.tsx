import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useFileStore } from "../stores/fileStore";
import Button from "../components/UI/Button";


const Dashboard: React.FC = () => {
   const {user} = useAuthStore();
   console.log(user);

   const {deleteFileById, uploadFile, filesData} = useFileStore();
   console.log(filesData);
const [selectedFile,setSelectedFile] = useState<File | null>(null);

   const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
  if(e.target.files) { setSelectedFile(e.target.files[0])
  }}

  const handleUpload = async () => {
    if(selectedFile) {
        await uploadFile(selectedFile);
        setSelectedFile(null);
    }
  }
   const handleDelete = async (id: number) => {
   await deleteFileById(id);
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
         <input type="file" accept="video/*, audio/*" onChange={handleFileChange}  className="bg-gray-700 px-2 py-1 rounded-lg"></input>
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
         </div>
        </div>
    )
}

export default Dashboard;