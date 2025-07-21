//types and interfaces for authentication
export interface User {
    id: number;
    name?: string;
    email: string;
}

export interface AuthResponse {
   Authorization: { token : string;}
    user? : User;
}
export interface SignUpCredentials {
    name?: string;
    email: string;
    password : string;
} 
 export interface LoginCredentials {
    email: string;
    password: string;
 }