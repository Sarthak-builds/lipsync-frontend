import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type {  FilesIdData, GeneratedVoiceResponse, VoiceIdForGeneration, VoiceMetaData,  Voices } from '../types/voices';
import * as api from '../services/apiVoices';

interface VoicesState {
    voicesCollection : Voices[];
    voiceMetaData : VoiceMetaData;
    generatedVoice : GeneratedVoiceResponse | null;
    getAllVoices : () => Promise<void>;
    createVoice : (filesIdCollection:{ files: FilesIdData[]}) => Promise<VoiceMetaData>;
    generatedVoiceResponse : (id:VoiceIdForGeneration) => Promise<GeneratedVoiceResponse>;
} 

 export const useVoiceStore = create<VoicesState>() (
    persist( (set)=> ({
       voicesCollection:[],
       voiceMetaData:null,
       generatedVoice: null,
       
       createVoice : async (filesIdCollection) => {
           const responseVoice = await api.createVoice(filesIdCollection);
           console.log(responseVoice);
           set ({voiceMetaData:responseVoice});
           return responseVoice;
       },
       getAllVoices : async ()=> {
            const response = await api.getAllVoices();
            console.log(response);
            set( () => ( { voicesCollection: [ ...response]}) );
       },
       generatedVoiceResponse : async (id:number) => {
        const response = await api.generatedVoiceResponse(id);
        set({generatedVoice: response});
        console.log(response);
        return response;
       }
    }),
    {
        name: "file-storage",
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
                console.log("files stored in file Storage")
            },
            removeItem: (name) => {
                localStorage.removeItem(name);
            }
        }
    }
)
 )
