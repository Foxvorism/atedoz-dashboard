'use client';
import axios from "axios";
import Swal from "sweetalert2";
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

export default function Transactions() {
  const [transactions, setTransactionsData] = useState<Transactions[]>([]);

  const getTransactionData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/orders`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });

      if (Array.isArray(response.data)) {
        setTransactionsData(response.data);
      } else {
        console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
      }

      console.log(response.data)

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

  const deleteTransaction = async (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Loading...',
          text: 'Mohon tunggu sebentar...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        try {
          // Pastikan id yang dikirimkan adalah valid
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/orders/${id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              }
            }
          );
          await getTransactionData();
          Swal.fire(
            'Deleted!',
            'Your Package has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error while deleting the price:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to Delete',
            text: 'Terjadi kesalahan saat menghapus paket.',
          });
        }
      }
    });
  };

  useEffect(() => {
    getTransactionData();
  }, []);
  
  return (
    <>
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
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-4 py-3 text-center text-theme-sm dark:text-gray-400"
                  >
                    <span className="text-gray-500">No data available</span>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction, index) => (
                  <TableRow key={index + 1}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {transaction.user.name}
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
                ))
              )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
