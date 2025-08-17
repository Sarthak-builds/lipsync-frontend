import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import type { generateClipsPayload } from "../types/generateClips";
const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: `${API_URL}`
});

api.interceptors.request.use( (config)=> {
    const AuthState = useAuthStore.getState(); //saari state aajayengi current
    const token = AuthState?.token;
    if(token) {
        config.headers.Authorization =`token ${token}`;
    } 
    return config;
})

export const generateClips = async (generateClipsPayload:generateClipsPayload) => {
const response = await api.post('/videos/', generateClipsPayload);
return response.data;
}
export const generateClipsById = async (generatedClipId:number) => {
    const response = await api.get(`/videos/${generatedClipId}/`);
    return response.data;
}