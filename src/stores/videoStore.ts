import {create} from 'zustand';
import { persist } from 'zustand/middleware'; 
import * as api from '../services/apiVideos';
import type { Video, VideoGenerationPayload } from '../types/videos';
import { useFileStore } from './fileStore';
import type { FileUpload, FileResponseMetaData } from '../types/apiFiles';

interface VideoState {
    videosCollection : FileResponseMetaData[] ;
    videoGeneratedResponse : FileResponseMetaData| null;
    // getAllVideos : () => Promise<VideoCollection>;
    uploadVideoFile :(file:FileUpload) => Promise<FileResponseMetaData>;
    // createVideo : (videoPayload:VideoPayload) => Promise<Video>;
    generatevideo : (videoGeneratePayload:VideoGenerationPayload) => Promise<Video>;
}

export const useVideoStore = create<VideoState>() (
    persist( (set)=> ({
        videosCollection:[],
        videoGeneratedResponse: null,
        // getAllVideos: async () => {
        //     const response = await api.getAllVideos();
        //     console.log(response);
        //     set( {videosCollection:response })
        //     return response;
        // },
        // createVideo : async (videoPayload) => {
        //     const response= await api.createVideo(videoPayload);
        //     console.log(response);
        //     return response;
        // },
          uploadVideoFile: async  (file) => {
            const fileStore = useFileStore.getState();
      const uploadedFile = await fileStore.uploadFile(file);
       set((state) => ({
        videosCollection: [...state.videosCollection, uploadedFile],
        videoGeneratedResponse: uploadedFile,
      }));
      
      return uploadedFile;
          },
        generatevideo : async (videoGeneratePayload) => {
            const response =await api.generateVideo(videoGeneratePayload);
          
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
          
            },
            removeItem: (name) => {
                localStorage.removeItem(name);
            }
        }
})
)