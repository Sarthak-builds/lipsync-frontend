//types and interfaces for authentication
export interface User {
    id: number;
    name?: string;
    email: string;
}

export interface AuthResponse {
    token : string;
    user? : User;
}
export interface SignUpCredentials {
    name?: string;
    email: string;
    password : string;
} 
 export interface loginCredentials {
    email: string;
    password: string;
 }