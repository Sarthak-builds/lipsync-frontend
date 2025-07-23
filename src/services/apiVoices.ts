import axios from "axios";
import type { GeneratedVoiceResponse, Voices } from "../types/voices";
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
 export const  createVoice = async (voices:any):Promise<Voices> => {
    console.log(voices);
    const response = await api.post("/voices/", voices);
    console.log(response.data);
    return response.data;
 }

 //TO GENERATE THE VOICE
 export const generatedVoiceResponse = async (id:number):Promise<GeneratedVoiceResponse> => {
    const response = await api.post(`/voices/${id}/create-elevenlabs-voice/`);
    console.log(response);
    return response.data;
 }