"use client";
import { Camera, GroupIcon } from "@/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const IndexAdmin = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [studioCount, setStudioCount] = useState<number>(0);
  interface User {
    id: number;
    name: string;
    email: string;
    phone: number;
    role: string;
  }

  const getUserData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (Array.isArray(response.data)) {
        setUserData(response.data);

        const customerTotal = response.data.filter((user: User) => user.role === "customer").length;
        setCustomerCount(customerTotal);

        const adminCount = response.data.filter((user: User) => user.role === "admin").length;
        setAdminCount(adminCount);

        console.log("📦 Jumlah customer:", customerTotal);
      } else {
        console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'error terjadi',
          text: 'mohon coba lagi nanti.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const [studio, setStudioData] = useState<any[]>([]);

  const getStudioData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/studios`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (Array.isArray(response.data)) {
        setStudioData(response.data);

        const studioCount = response.data.length;
        setStudioCount(studioCount);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error("Server error:", error);
        Swal.fire({
          icon: 'error',
          title: 'error terjadi',
          text: 'mohon coba lagi nanti.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };
  useEffect(() => {
    getUserData();
    getStudioData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-green-500 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {customerCount}
            </h4>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-yellow-500 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Admin
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {adminCount}
            </h4>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Camera className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Studios
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {studioCount}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
