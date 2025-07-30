//types and interfaces for speeech generationn

export interface SpeechRequest{
text: string ;
voice: number | null ;
}

export interface SpeechGeneratedResponse {
    id:number;
    text:string;
    voice:number;
    audio_file:number;
    created_by:number;
    created_at: string;  
}


