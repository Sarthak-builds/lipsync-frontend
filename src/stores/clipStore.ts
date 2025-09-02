import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type { generateClipsPayload, generatedClipsResponse } from '../types/generateClips';
import * as api from '../services/apiClips';

interface ClipState {
    generatedClipsResponse: generatedClipsResponse | null;
    generatedClipsCollection: generatedClipsResponse[];
    generateClip: (generateClipsPayload:generateClipsPayload) => Promise<generatedClipsResponse>;
    getClipById: (generatedCLipId:number) => Promise<generatedClipsResponse>;
}

export const useClipStore = create<ClipState>() (
    persist( (set)=> ({
        generatedClipsResponse:null,
        generatedClipsCollection: [],
        generateClip : async (generateClipsPayload) => {
          const response = await api.generateClips(generateClipsPayload);
          
          set((state) => ({
          generatedClipsResponse: response,
          generatedClipsCollection: [...state.generatedClipsCollection, response],
          
        }));
          return response;
        },
        getClipById : async (generatedClipId) => {
            const response = await api.generateClipsById(generatedClipId);
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
               
            },
            removeItem: (name) => {
             localStorage.removeItem(name);
            },
        }
    }),
    
)