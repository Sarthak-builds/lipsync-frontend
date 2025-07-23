

export type VoiceFiles = number | null; //when sending the post request we send an array of files id numbers.

export interface Voices {
    id: number;
    user?: number;
    files ?: VoiceFiles;
    created_at ?: string;
} 
export type FilesIdData = number;
export type VoiceMetaData = Voices | null ;


//this is the response we get from get and post request both 