import axios, { AxiosError } from 'axios';
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    phone: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface LoginResponse {
    success: boolean;
    user?: User;
    message?: string;
    access_token?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/login`, { email, password });
        const { access_token, user } = response.data;

        console.log('Login response:', response.data); // Debug log

        if (access_token && user) {
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
        }

        return { success: true, user, access_token };
    } catch (error) {
        const err = error as AxiosError<{ error?: string }>;
        const message =
            err.response?.data?.error || 'Login gagal. Silakan coba lagi.';
        return { success: false, message };
    }
};


export const logout = (): void => {
    Cookies.remove("token");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    redirect("/signin")
};

export const getUser = (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};
