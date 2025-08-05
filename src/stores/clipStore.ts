import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type { generateClipsPayload, generatedClipsResponse } from '../types/generateClips';
import * as api from '../services/apiClips';

interface ClipState {
    generatedClipsResponse: generatedClipsResponse | null;
    generatedClipsCollection: generatedClipsResponse[];
    generateClip: (generateClipsPayload:generateClipsPayload) => Promise<generatedClipsResponse>;
}

export const useClipStore = create<ClipState>() (
    persist( (set)=> ({
        generatedClipsResponse:null,
        generatedClipsCollection: [],
        generateClip : async (generateClipsPayload) => {
          const response = await api.generateClips(generateClipsPayload);
          console.log(response);
          set((state) => ({
          generatedClipsResponse: response,
          generatedClipsCollection: [...state.generatedClipsCollection, response],
        }));
          return response;
        },
    }),
{
        name: "Clips-storage",
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
    }),
    
)