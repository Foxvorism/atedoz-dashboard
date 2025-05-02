"use client";
import React, { useState, FC, ReactNode, FormEvent } from 'react';
import ComponentCard from '../common/ComponentCard';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '../../icons';

export default function UserInput() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    // Simulate a validation check
    const validateEmail = (value: string) => {
    const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        setError(!isValidEmail);
        return isValidEmail;
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };
    
    const [showPassword, setShowPassword] = useState(false);
    const options = [
        { value: "admin", label: "Admin" },
        { value: "customer", label: "Customer" },
    ];
    const handleSelectChange = (value: string) => {
        console.log("Selected value:", value);
    };
    return (
        <form>
            <ComponentCard title="New User Form" href="/users">
                <div className="space-y-6">
                    <div>
                        <Label>Full Name</Label>
                        <Input type="text" placeholder="Masukan nama lengkap" />
                    </div>
                    <div>
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            defaultValue={email}
                            error={error}
                            onChange={handleEmailChange}
                            placeholder="e.g. atedozspace@gmail.com"
                            hint={error ? "This is an invalid email address." : "" }
                        />
                    </div>
                    <div>
                        <Label>Password Login</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Bisa berbeda dengan password asli email"
                            />
                            <button
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
                        <Label>Role for User</Label>
                        <div className="relative">
                            <Select
                                options={options}
                                placeholder="Select an option"
                                onChange={handleSelectChange}
                                className="dark:bg-dark-900"
                            />
                            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                <ChevronDownIcon/>
                            </span>
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
                        >
                            Submit a New User
                        </button>
                    </div>
                </div>
            </ComponentCard>
        </form>
    );
}
