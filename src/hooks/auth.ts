import axios from 'axios';


export interface LoginResponse {
    success: boolean;
    user?: any;
    message?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/login`, { email, password });
        const { access_token, user } = response.data;

        console.log('Login response:', response.data); // Debug log

        if (access_token && user) {
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));
        }

        return { success: true, user };
    } catch (error: any) {
        const message =
            error.response?.data?.error || 'Login gagal. Silakan coba lagi.';
        return { success: false, message };
    }
};


export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getUser = (): any | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};
