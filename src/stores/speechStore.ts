import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type { SpeechGeneratedResponse, SpeechRequest } from '../types/speech';
import * as api from '../services/apiSpeech';

interface SpeechState {
    speechGeneratedResponse : SpeechGeneratedResponse | null ;
    allSpeechGenerated : SpeechGeneratedResponse[] | null;
    getAllSpeechesGenerated : () => Promise<SpeechGeneratedResponse[]>;
    generateSpeech : (speechPayload:SpeechRequest) => Promise<SpeechGeneratedResponse>;
}

export const useSpeechStore = create<SpeechState> () (
    persist( (set) => ({
      speechGeneratedResponse:null,
      allSpeechGenerated :[],
      //get all the speeches
      getAllSpeechesGenerated : async () => {
        const response = await api.getAllSpeechesGenerated();
        set(()=> ({allSpeechGenerated: response}));
        console.log(response);
        return response;
      },
      generateSpeech : async (speechPayload) => {
        const response = await api.generateSpeech(speechPayload);
        set(()=> ({speechGeneratedResponse:response}));
        return response;
      }}),
      {
        name: "speech-storage",
        storage: {
            getItem: (name) => {
                const str = localStorage.getItem(name);
                if(str) {
                    return JSON.parse(str);
                }
                return null;
            },
            setItem: (name, value) => {
                localStorage.setItem(name, JSON.stringify(value));
                console.log("speeches stored in file Storage")
            },
            removeItem: (name) => {
                localStorage.removeItem(name);
            }
        }
      }
    
    
    )
)