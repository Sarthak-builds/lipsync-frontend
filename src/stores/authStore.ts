import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SignUpCredentials, LoginCredentials, User } from '../types/auth';
// import * as api from '../services/apiAuth';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: SignUpCredentials) => Promise<void>;
    logout: () => void;
}
export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        register: async (credential) => {
            // Mock API call
            // const response = await api.register(credential);

            // Mock response
            const mockUser: User = {
                id: Math.floor(Math.random() * 1000),
                first_name: credential.first_name,
                last_name: credential.last_name,
                email: credential.email
            };

            set({ user: mockUser, isAuthenticated: true });
        },
        login: async (credentials) => {
            // Mock API call
            // const response = await api.login(credentials);

            // Mock successful login
            console.log('Logging in with:', credentials);
            set({
                token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
                isAuthenticated: true,
                user: {
                    id: 1,
                    email: credentials.email,
                    first_name: 'Mock',
                    last_name: 'User'
                }
            });
        },
        logout: () => set({ user: null, isAuthenticated: false, token: null })

    }),
        //auth-storage is the second arguement for persist middleware to store the data in the local storage and persist it even after the refresh.
        {
            name: 'auth-storage',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (str) return JSON.parse(str);
                    return null;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));

                },
                removeItem: (name) => localStorage.removeItem(name)
            },
        }
    ));