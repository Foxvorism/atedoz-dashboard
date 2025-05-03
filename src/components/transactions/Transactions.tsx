'use client';
import React,  { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

import {
    TaskIcon, PencilIcon, TrashBinIcon
} from "../../icons/index";

import Badge from "../ui/badge/Badge";
import Image from "next/image";

// interface Transactions {
//     id: number;
//     user: {
//         id: number,
//         name: string,
//     };
//     package: {
//         id: number,
//         name: string,
//     }
//     schedule: {
//         id: number,
//         date: string,
//         time: string,
//         studio: {
//             id: number,
//             name: string,
//         }
//     }
//     status: string;
// }

interface Transactions {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  package: {
    id: number;
    nama_paket: string;
    harga: string;
    deskripsi: string;
    thumbnail: string | null;
  };
  photo_studio: {
    id: number;
    nama_studio: string;
    deskripsi_posisi: string;
  };
  order_date: string;
  start_time: string;
  end_time: string;
  status: string;
  admin_confirmed: number;
}



// Define the table data using the interface
// const tableData: Transactions[] = [
//     {
//         id: 1,
//         user: {
//             id: 1,
//             name: "Velis"
//         },
//         package: {
//             id: 1,
//             name: "Studio in Bogor Baru Branch"
//         },
//         schedule: {
//             id: 1,
//             date: "5 May 2025",
//             time: "10.00 - 11.00",
//             studio: {
//                 id: 1,
//                 name: "Atedoz Space Bogor Baru Branch",
//             }
//         },
//         status: "Pending",
//     },
// ];



export default function Transactions() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  
  return (
    <>
      <button 
        className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
        // onClick={handleAddPhotoClick}  // Open the second modal
      >
          <div className="mr-1">
              <TaskIcon />
          </div>
          Add a New Transaction
      </button>
    

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
                    Order From
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Package
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Schedule
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Studio
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
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
                {transactions.map((transaction, index) => (
                  <TableRow key={index + 1}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        { transaction.user.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {transaction.package.nama_paket}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {transaction.order_date} | {transaction.start_time} - {transaction.end_time}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {transaction.photo_studio.nama_studio}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        transaction.status === "Paid"
                          ? "success"
                          : transaction.status === "Pending"
                          ? "warning"
                          : transaction.status === "Completed"
                          ? "primary"
                          : "error"
                      }
                    >
                      {transaction.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400 flex items-center">
                      <span className="w-4 menu-item-icon-warning mr-3 cursor-pointer">
                        <PencilIcon />
                      </span>
                      <span className="w-4 menu-item-icon-error cursor-pointer">
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
