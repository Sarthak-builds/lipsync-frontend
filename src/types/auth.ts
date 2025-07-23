//types and interfaces for authentication
export interface User {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
}

export interface AuthResponse {
    token? : string | null;
    user: User;
}
export interface SignUpCredentials {
    first_name: string;
    last_name: string;
    email: string;
    password : string;
} 
 export interface LoginCredentials {
    email: string;
    password: string;
 }