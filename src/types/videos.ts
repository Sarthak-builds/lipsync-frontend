// UPLOAD VIDEO FOR POST ENDPOINT RESPONSE
export interface Video {
    id :  number;
    title: string;
    file: number;
    created_by : number;
    created_at : string;
}

//GET ENDPOINT
export type VideoCollection = Video[];

//PAYLOAD FOR VIDEO UPLOAD
export interface VideoPayload {
    title : string;
    file : number;
}

