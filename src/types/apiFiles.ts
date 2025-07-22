export interface FileResponseMetaData{ //backend se response jab file upload ho
    id:number;
    file: string; //url of uploaded file
    uploaded_at: string; //datetime
    created_by: string; //email
}

export interface FilesResponse {
    files_collection: FileResponseMetaData[];
}

export type FileUpload = File;

export type FileById = number;