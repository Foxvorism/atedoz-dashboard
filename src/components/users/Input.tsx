"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { EyeCloseIcon, EyeIcon } from '../../icons';
import ComponentCard from '../common/ComponentCard';
import Input from '../form/input/InputField';
import Label from '../form/Label';

export default function UserInput() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirmation] = useState(false);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState([]);
    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        role: "admin", // Default role
    });

    const validateEmail = (value: string) => {
        const isValidEmail =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        setError(!isValidEmail);
        return isValidEmail;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (name === "email") validateEmail(value);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setUser((prev) => ({
            ...prev,
            role: value,
        }));
    };

    const getUserData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (Array.isArray(response.data.data)) {
                setUserData(response.data.data);
                console.log("📦 Data users:", response.data.data);
            } else {
                console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
            }
        } catch (error: any) {
            const message = axios.isAxiosError(error) && error.response
                ? error.response.data.message
                : 'Mohon coba lagi nanti.';

            Swal.fire({
                icon: 'error',
                title: 'Terjadi kesalahan',
                text: message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault();
        Swal.fire({
            title: 'Loading...',
            text: 'Mohon tunggu sebentar',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        const apiEndpoint = user.role === 'admin'
            ? `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/admin/register`
            : `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/customer`;

        // Hapus field yang tidak boleh dikirim untuk customer
        const { id, role, ...userPayload } = user;
        const payload = user.role === 'admin' ? user : userPayload;

        try {
            const res = await axios.post(apiEndpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log("✅ Respon:", res.data);
            await getUserData();

            setUser({
                id: 0,
                name: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
                role: "admin",
            });

            Swal.close();
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: `${user.role === 'admin' ? 'Admin' : 'Customer'} berhasil ditambahkan.`,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("❌ Error saat create user:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error terjadi',
                text: 'Mohon coba lagi nanti.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <form onSubmit={createUser}>
            <ComponentCard title="New User Form" href="/users">
                <div className="space-y-6">
                    <div>
                        <Label>User Role</Label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900"
                            value={user.role}
                            onChange={handleSelectChange}
                            name="role"
                        >
                            <option value="admin">Admin</option>
                            {/* <option value="customer">Customer</option> */}
                        </select>
                    </div>
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Masukan nama lengkap"
                        />
                    </div>
                    <div>
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="e.g. atedozspace@gmail.com"
                            hint={error ? "This is an invalid email address." : ""}
                        />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            placeholder="e.g. +628123456789"
                        />
                    </div>
                    <div>
                        <Label>Password Login</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Bisa berbeda dengan password asli email"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                            >
                                {showPassword ? (
                                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                ) : (
                                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <Label>Password Confirmation</Label>
                        <div className="relative">
                            <Input
                                type={showPasswordConfirm ? "text" : "password"}
                                name="password_confirmation"
                                value={user.password_confirmation}
                                onChange={handleChange}
                                placeholder="Konfirmasi password login"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirm)}
                                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                            >
                                {showPasswordConfirm ? (
                                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                ) : (
                                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                        >
                            Submit New {user.role === 'admin' ? 'Admin' : 'Customer'}
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}
