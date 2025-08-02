import axios from "axios";
import type { Video, VideoPayload, VideoCollection } from "../types/videos";
import { useAuthStore } from "../stores/authStore";

export const api = axios.create({
    baseURL: "http://localhost:8000/api",
});
api.interceptors.request.use((config)=>{
    const AuthState = useAuthStore.getState();
    if(AuthState.isAuthenticated && AuthState.token) {
        const token = AuthState.token;
        config.headers.Authorization =`token ${token}`;
    }
    return config;
});

export const getAllVideos = async ():Promise<VideoCollection> => {
const response = await api.get('/videos/');
console.log(response.data);
return response.data;
}

export const createVideo = async (videoPayload:VideoPayload):Promise<Video> => {
const response = await api.post('/videos/', videoPayload);
console.log(response.data);
return response.data;
}