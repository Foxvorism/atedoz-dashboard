"use client"
import React, { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { ChevronDownIcon } from "../../icons";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserEditProps {
  userData: UserData;
}

export default function UserEdit({ userData }: UserEditProps) {
  const options = [
    { value: "admin", label: "Admin" },
    { value: "customer", label: "Customer" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <form>
      <ComponentCard title="Edit User Form" href="/users">
        <div className="space-y-6">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Masukan nama lengkap"
              defaultValue={userData.name}
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="e.g. atedozspace@gmail.com"
              defaultValue={userData.email}
            />
          </div>
          <div>
            <Label>Role for User</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
                defaultValue={userData.role}
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center text-lg items-center rounded-lg border h-auto text-center p-2 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
            >
              Update User Data
            </button>
          </div>
        </div>
      </ComponentCard>
    </form>
  );
}
