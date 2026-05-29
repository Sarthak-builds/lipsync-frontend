import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import type {FileById, FileResponseMetaData, FileUpload, FilesResponse} from '../types/apiFiles';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL:`${API_URL}`
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
    try {
        //formData for files uploaded
        const formData = new FormData();
        const fileToUpload = file instanceof File ? file : (file as any).file;
        formData.append('file', fileToUpload);
        const response = await api.post("/files/", formData);
        return response.data;
    } catch (error) {
        console.warn("Backend not reached, using mock upload", error);
        const fileToUpload = file instanceof File ? file : (file as any).file;
        // Mock response for local development
        return {
            id: Math.floor(Math.random() * 10000),
            file: URL.createObjectURL(fileToUpload),
            uploaded_at: new Date().toISOString(),
            created_by: "demo@example.com"
        };
    }
}

export const getAllFiles = async (): Promise<FilesResponse> => {
    const response = await api.get("/files");
    return response.data;
}

export const getFileById = async (id:FileById | FileById[]): Promise<FileResponseMetaData> => {
    const response = await api.get(`/files/${id}`);
    return response.data;
}

export const deleteFileById = async (id:FileById):Promise<void> => {
   await api.delete(`/files/${id}`);
}