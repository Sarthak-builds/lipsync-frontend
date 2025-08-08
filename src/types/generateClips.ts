export interface generateClipsPayload {
    source_video_file_id:number,
    speech_generation_id:number
}

export interface generatedClipsResponse {
    id:number;
    title:string;
    file:number;
    created_by:number;
    created_at:string;
}