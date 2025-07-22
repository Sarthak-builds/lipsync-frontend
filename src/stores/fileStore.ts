import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type { FileById, FileResponseMetaData, FilesResponse, FileUpload } from '../types/apiFiles';
import * as apiFiles from '../services/apiFiles';

interface FileState {
    filesData: FileResponseMetaData[];
    uploadFile : (file:FileUpload) => Promise<void>;
    getAllFiles : () => Promise<void>;
    getFileById : (id:FileById) => Promise<FileResponseMetaData>;
    deleteFileById : (id:FileById)=> Promise<void>;
}
export const useFileStore = create<FileState>() (
    persist( (set) => ( {

        filesData: [],
        uploadFile : async (file) => {
          const response = await apiFiles.uploadFile(file);
          console.log(response);
          set((state)=> ({ filesData : [...state.filesData, response]}));
        },
        getAllFiles : async () => {
            const response = await apiFiles.getAllFiles();
            console.log(response);
            set({filesData:response.files_collection});
        },
        getFileById : async (id) => {
            const response = await apiFiles.getFileById(id);
            console.log(response);
            return response;
        },
        deleteFileById : async (id) => {
            const response = await apiFiles.deleteFileById(id);
            console.log(response);
            set((state)=> ({filesData: state.filesData.filter((f)=> f.id !== id)}))
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
                console.log("value stored in local storage");
            },
            removeItem: (name) => {
             localStorage.removeItem(name);
            },
        }
    }
))