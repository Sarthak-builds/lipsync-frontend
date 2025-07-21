// To handle request with the backend, hum axios use krenge.
import axios from "axios";
import type { AuthResponse, LoginCredentials, SignUpCredentials, User } from "../types/auth"

const api = axios.create({
    baseURL: "https://xyz.com"
});

export const signup = async (credentials : SignUpCredentials): Promise<AuthResponse> => {
    const response = await api.post("/signup", credentials);
    console.log(response.data); //for checking
    return response.data;
}
 export const login = async (credentials :LoginCredentials ): Promise<AuthResponse> => {
    const response = await api.post("/login", credentials);
    console.log(response.data); //for checking
    return response.data;
 }

 export const dashboard = async (token : string): Promise<User> => {
const response = await api.get("/dashboard",{
    headers: {
        Authorization: `Bearer ${token}`    }
})
console.log(response.data);
return response.data;
 }