import {create} from 'zustand';
import { persist } from 'zustand/middleware'; 
import * as api from '../services/apiVideos';
import type { Video, VideoCollection, VideoGenerationPayload, VideoPayload } from '../types/videos';

interface VideoState {
    videosCollection : VideoCollection | null;
    videoGeneratedResponse : Video| null;
    getAllVideos : () => Promise<VideoCollection>;
    createVideo : (videoPayload:VideoPayload) => Promise<Video>;
    generatevideo : (videoGeneratePayload:VideoGenerationPayload) => Promise<Video>;
}

export const useVideoStore = create<VideoState>() (
    persist( (set)=> ({
        videosCollection: null,
        videoGeneratedResponse: null,
        getAllVideos: async () => {
            const response = await api.getAllVideos();
            console.log(response);
            set( {videosCollection:response })
            return response;
        },
        createVideo : async (videoPayload) => {
            const response= await api.createVideo(videoPayload);
            console.log(response);
            return response;
        },
        generatevideo : async (videoGeneratePayload) => {
            const response =await api.generateVideo(videoGeneratePayload);
           console.log(response);
           set( {videoGeneratedResponse:  response});
           return response;
        },
    }),
{
      name: "video_storage",
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
                console.log("videos metadata stored in file Storage")
            },
            removeItem: (name) => {
                localStorage.removeItem(name);
            }
        }
})
)