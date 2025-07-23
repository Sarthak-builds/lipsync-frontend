import axios from "axios";
import type { Voices, VoiceFiles } from "../types/voices";
import { useAuthStore } from "../stores/authStore";


export const api = axios.create({
    baseURL:"http://localhost:8000/api"
});
api.interceptors.request.use((config)=>{
    const AuthState = useAuthStore.getState();
    if(AuthState.isAuthenticated && AuthState.token) {
        const token = AuthState.token;
        config.headers.Authorization =`token ${token}`;
    }
    return config;
});

export const getAllVoices = async ():Promise<Voices[]> => {
    const response = await api.get("/voices/");
    console.log(response.data);
    return response.data;
}
 export const  uploadVoice = async (voices:VoiceFiles[]):Promise<Voices> => {
    const response = await api.post("/voices/", voices);
    console.log(response.data);
    return response.data;
 }