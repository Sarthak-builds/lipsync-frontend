import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type { FileById, FileResponseMetaData, FileUpload } from '../types/apiFiles';
import * as apiFiles from '../services/apiFiles';
import type { FilesIdData } from '../types/voices';


interface FileState {
    filesData: FileResponseMetaData[];
    filesIdDataCollection : {
        files: FilesIdData[];
    };
    filesByIdData : FileResponseMetaData[];
    uploadFile : (file:FileUpload) => Promise<FileResponseMetaData>;
    getAllFiles : () => Promise<void>;
    getFileById : (id:FileById | FileById[]) => Promise<FileResponseMetaData>;
    deleteFileById : (id:FileById)=> Promise<void>;
    setFilesDataEmpty : () => Promise<void>;
}
export const useFileStore = create<FileState>() (
    persist( (set) => ( {

        filesData: [],
        filesIdDataCollection:{
            files:[]
        },
        filesByIdData: [],
        uploadFile : async (file) => {
          const response = await apiFiles.uploadFile(file);
          
          set(()=> ({ filesData : [response], filesIdDataCollection: 
            {files: [response.id]}  })  );
            return response;
        },
        getAllFiles : async () => {
            const response = await apiFiles.getAllFiles();
            
            set({filesData:response.files_collection});
        },
        getFileById : async (id) => {
            const response = await apiFiles.getFileById(id);
            
           set ({
  filesByIdData: [response],
});

            return response;
        },
        deleteFileById : async (id) => {
             await apiFiles.deleteFileById(id);
           
            set((state)=> ({filesData: state.filesData.filter((f)=> f.id !== id), filesIdDataCollection:{files: state.filesIdDataCollection.files.filter((fileId)=> fileId!==id)}}));
        },
        setFilesDataEmpty : async () => {
            set({filesData:[]});
        }
    }),
    {
        name: "file-storage",
        storage: {
            getItem: (name)=> {
                const str = localStorage.getItem(name);
                if(str) {
                    return JSON.parse(str);
                } return null;
            },
            setItem:(name, value)=> {
                localStorage.setItem(name, JSON.stringify(value));
                
            },
            removeItem: (name) => {
             localStorage.removeItem(name);
            },
        }
    }
))