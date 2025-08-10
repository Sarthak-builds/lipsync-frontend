

export type VoiceFiles = number | null; //when sending the post request we send an array of files id numbers.

export interface Voices {
    id: number;
    name:string;
    user?: number;
    files ?: VoiceFiles[];
    created_at ?: string;
} 
export type FilesIdData = number;
export type VoiceMetaData = Voices | null ;


//generated voices types
export type VoiceIdForGeneration = number;
export interface GeneratedVoiceResponse {
    elevenlabs_voice_id?:string;
    files: VoiceFiles[];
    name?:string;
}
//this is the response we get from get and post request both 

//for displaying data
export interface VoicesData {
  id: string | number;
  name: string;
  created_at?: string;
  files?: VoiceFiles[];
}