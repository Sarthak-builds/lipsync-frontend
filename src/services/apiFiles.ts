import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import type {FileById, FileResponseMetaData, FileUpload, FilesResponse} from '../types/apiFiles';


const api = axios.create({
    baseURL:"http://localhost:8000/api"
});

//adding the tokens inside the each request
api.interceptors.request.use( (config)=> {
    const AuthState = useAuthStore.getState(); //saari state aajayengi current
    const token = AuthState?.token;
    if(token) {
        config.headers.Authorization =`token ${token}`;
    } 
    return config;
})

export const uploadFile = async (file:FileUpload): Promise<FileResponseMetaData> => {
    //formData for files uploaded
    const formData = new FormData();
    formData.append('file', file instanceof File? file:(file as any).file) //handle fileUpload type in typesscript
    const response = await api.post("/files", formData);
    console.log(response.data);
   return response.data;
}

export const getAllFiles = async (): Promise<FilesResponse> => {
    const response = await api.get("/files");
    console.log(response.data);
    return response.data;
}

export const getFileById = async (id:FileById): Promise<FileResponseMetaData> => {
    const response = await api.get(`/files/${id}`);
    return response.data;
}

export const deleteFileById = async (id:FileById):Promise<void> => {
  const response = await api.delete(`/files/${id}`);
  console.log(response.data);
}