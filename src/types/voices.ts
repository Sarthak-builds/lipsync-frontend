

export type VoiceFiles = number[]; //when sending the post request we send an array of files id numbers.

export interface Voices {
    id: number;
    user: number;
    files : VoiceFiles;
    created_at : string;
} //this is the response we get from get and post request both 