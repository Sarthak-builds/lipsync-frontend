export interface generateClipsPayload {
    video_file_id:number,
    audio_file_id:number
}

export interface generatedClipsResponse {
    id:number;
    title:string;
    file:number;
    created_by:number;
    created_at:string;
}