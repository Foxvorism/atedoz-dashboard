'use client'
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  GroupIcon, PencilIcon, TrashBinIcon
} from "../../icons/index";

import axios from "axios";
import Link from "next/link";
import Badge from "../ui/badge/Badge";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// // Define the table data using the interface
// const tableData: User[] = [
//   {
//     id: 1,
//     name: "Velis",
//     email: "velis@gmail.com",
//     role: "Admin",
//   },
//   {
//     id: 2,
//     name: "Rahma",
//     email: "rahma@gmail.com",
//     role: "Admin",
//   },
//   {
//     id: 3,
//     name: "Ababil",
//     email: "ababil@gmail.com",
//     role: "Admin",
//   },
//   {
//     id: 4,
//     name: "Irham",
//     email: "irham@gmail.com",
//     role: "Admin",
//   },
//   {
//     id: 5,
//     name: "Naufalih",
//     email: "naufalih@gmail.com",
//     role: "Admin",
//   },
//   {
//     id: 6,
//     name: "Customer",
//     email: "customer@gmail.com",
//     role: "Customer",
//   },
// ];

export default function Users() {

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }

  const [userData, setUserData] = useState<User[]>([]);

  const getUserData = async () => {
    try {

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
  
      if (Array.isArray(response.data)) {
        setUserData(response.data);
        console.log("📦 Data paket:", response.data);
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
  
  useEffect(() => {
    getUserData();
  }, []);

    useEffect(() => {
      if (userData.length > 0) {
        console.log("✅ User data telah berhasil dimuat.");
      } else {
        console.log("⚠️ Tidak ada data user ditemukan.");
      }
    }, [userData]);

  return (
    <>
      <Link href="/users/input">
        <button 
          className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
          >
            <div className="mr-1">
                <GroupIcon />
            </div>
            Add a New User
        </button>
      </Link>
    

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    User
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Role
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {userData.map((item: any, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400" key={item.name}>
                      {item.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          item.role === "Admin"
                            ? "success"
                            : item.role === "Customer"
                            ? "warning"
                            : "error"
                        }
                      >
                        {item.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {item.email}
                    </TableCell>
                    <TableCell className="flex items-center px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      <Link href={`/users/edit/${item.id}`} className="flex items-center justify-center">
                        <span className="w-4 mr-5 cursor-pointer menu-item-icon-warning">
                          <PencilIcon />
                        </span>
                      </Link>
                        <span className="w-4 cursor-pointer menu-item-icon-error">
                          <TrashBinIcon />
                        </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
