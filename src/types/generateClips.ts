export interface generateClipsPayload {
    source_video_file_id:number,
    speech_generation_id:number
}

export interface generatedClipsResponse {
    id:number;
    speech_generation:number;
    original_video:number;
    generated_video:number;
    created_by:number;
    created_at:string;
}