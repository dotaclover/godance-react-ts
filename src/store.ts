import { create } from 'zustand';

interface User {
    id: number;
    name: string;
}

interface AppState {
    language: string;
    setLanguage: (language: string) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    auth: boolean;
    token: string | null;
    setAuth: (token: string) => void;
    logout: () => void;
}

export const useStore = create<AppState>((set) => ({
    language: localStorage.getItem('token') || 'en',
    setLanguage: (language) => {
        localStorage.setItem('language', language);
        set({ language });
    },
    //
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
    //
    token: localStorage.getItem('token'),
    auth: !!localStorage.getItem('token'),
    setAuth: (token) => {
        localStorage.setItem('token', token);
        set({ auth: true, token });
    },
    //
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, auth: false, token: null });
    },
}));
