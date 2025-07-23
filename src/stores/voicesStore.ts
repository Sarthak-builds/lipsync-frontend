import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import type { VoiceFiles,  VoiceMetaData,  Voices } from '../types/voices';
import * as api from '../services/apiVoices';
import { useFileStore } from './fileStore';


const {filesIdData} = useFileStore();
const filesIdCollection= filesIdData;
console.log(filesIdCollection);

interface VoicesState {
    voicesCollection : Voices[];
    voiceMetaData : VoiceMetaData;
    getAllVoices : () => Promise<void>;
    uploadVoice : (filesIdCollection:VoiceFiles[]) => Promise<void>;
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
       uploadVoice : async (filesIdCollection) => {
           const responseVoice = await api.uploadVoice(filesIdCollection);
           console.log(responseVoice);
           set ({voiceMetaData:responseVoice})
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
