// To handle request with the backend, hum axios use krenge.
import axios from "axios";
import type { AuthResponse, LoginCredentials, SignUpCredentials, User } from "../types/auth"
const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: `${API_URL}`
});

export const register = async (credentials : SignUpCredentials): Promise<AuthResponse> => {
    const response = await api.post("/register", credentials);
    console.log(response.data); //for checking
    return response.data;
}
 export const login = async (credentials :LoginCredentials ): Promise<AuthResponse> => {
    const response = await api.post("/login", credentials);
    return response.data;
 }

 export const dashboard = async (token : string): Promise<User> => {
const response = await api.get("/dashboard",{
    headers: {  Authorization: `token ${token}` }
})
return response.data;
 }