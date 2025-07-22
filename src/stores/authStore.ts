import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SignUpCredentials, LoginCredentials, User} from '../types/auth';
import * as api from '../services/api';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated : boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: SignUpCredentials) => Promise<void>;
    logout: () => void;
}
export const useAuthStore = create<AuthState>() (
persist( (set)=> ({
    user: null,
    token:null,
    isAuthenticated:false,
    register : async (credential)=> {
    const response = await api.register(credential);
    console.log(response);
    set({user:response.user, isAuthenticated:true});
    },
    login : async (credentials) => {
     const response = await api.login(credentials);
     console.log(response);
     set({token:response.token, isAuthenticated:true});
    },
    logout: ()=> set({user:null, isAuthenticated:false, token:null})
    
}),
//auth-storage is the second arguement for persist middleware to store the data in the local storage and persist it even after the refresh.
{
    name: 'auth-storage',
    storage: {
        getItem : (name) => {
            const str = localStorage.getItem(name);
            if (str) return JSON.parse(str);
            return null;
        },
        setItem : (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
            console.log("value stored in local storage")
        },
        removeItem: (name) => localStorage.removeItem(name)
    },
}
));