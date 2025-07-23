import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type {  FilesIdData, VoiceMetaData,  Voices } from '../types/voices';
import * as api from '../services/apiVoices';

interface VoicesState {
    voicesCollection : Voices[];
    voiceMetaData : VoiceMetaData;
    getAllVoices : () => Promise<void>;
    createVoice : (filesIdCollection:{ files: FilesIdData[]}) => Promise<VoiceMetaData>;
} 

 export const useVoiceStore = create<VoicesState>() (
    persist( (set)=> ({
       voicesCollection:[],
       voiceMetaData:null,
       getAllVoices : async ()=> {
            const responseVoicesDataArray = await api.getAllVoices();
            console.log(responseVoicesDataArray);
            set( (state) => ( { voicesCollection: [...state.voicesCollection, ...responseVoicesDataArray]}) );
       },
       createVoice : async (filesIdCollection) => {
           const responseVoice = await api.createVoice(filesIdCollection);
           console.log(responseVoice);
           set ({voiceMetaData:responseVoice});
           return responseVoice;
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
