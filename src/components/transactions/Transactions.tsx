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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    order_date: "",
    start_time: "",
    end_time: "",
  });
  const [editingTransaction, setEditingTransaction] = useState<Transactions | null>(null);

  const start_time = [
    { id: 1, value: "08:00", label: "08.00" },
    { id: 2, value: "09:00", label: "09.00" },
    { id: 3, value: "10:00", label: "10.00" },
    { id: 4, value: "11:00", label: "11.00" },
    { id: 5, value: "12:00", label: "12.00" },
    { id: 6, value: "13:00", label: "13.00" },
    { id: 7, value: "14:00", label: "14.00" },
    { id: 8, value: "15:00", label: "15.00" },
    { id: 9, value: "16:00", label: "16.00" },
    { id: 10, value: "17:00", label: "17.00" },
  ];

  const end_time = [
    { id: 1, value: "08:50", label: "08.50" },
    { id: 2, value: "09:50", label: "09.50" },
    { id: 3, value: "10:50", label: "10.50" },
    { id: 4, value: "11:50", label: "11.50" },
    { id: 5, value: "12:50", label: "12.50" },
    { id: 6, value: "13:50", label: "13.50" },
    { id: 7, value: "14:50", label: "14.50" },
    { id: 8, value: "15:50", label: "15.50" },
    { id: 9, value: "16:50", label: "16.50" },
    { id: 10, value: "17:50", label: "17.50" },
  ];

  const padTime = (time: string) => {
    // Pastikan format selalu 2 digit jam:2 digit menit, misal 08:00
    if (!time) return "";
    const [h, m] = time.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };

  const handleEditClick = (transaction: Transactions) => {
    setEditingTransaction(transaction);
    setEditForm({
      order_date: transaction.order_date,
      start_time: padTime(transaction.start_time),
      end_time: padTime(transaction.end_time),
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/orders/${editingTransaction.id}`,
        {
          order_date: editForm.order_date,
          start_time: editForm.start_time,
          end_time: editForm.end_time,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      setShowEditModal(false);
      await getTransactionData();
      Swal.fire("Berhasil!", "Transaksi berhasil diupdate.", "success");
    } catch (error) {
      Swal.fire("Gagal!", error.response.data.error, "error");
    }
  };

  const getTransactionData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/orders`, {
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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/orders/${id}`,
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
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 min-w-[320px] max-w-[90vw]">
            <h3 className="text-xl font-bold mb-4">Edit Jadwal Transaksi</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Tanggal Order</label>
                <input
                  type="date"
                  name="order_date"
                  value={editForm.order_date}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Waktu Mulai</label>
                <select
                  name="start_time"
                  value={editForm.start_time}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="" disabled>
                    Pilih waktu mulai
                  </option>
                  {start_time.map((start) => (
                    <option key={start.id} value={start.value}>
                      {start.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Waktu Selesai</label>
                <select
                  name="end_time"
                  value={editForm.end_time}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="" disabled>
                    Pilih akhir waktu
                  </option>
                  {end_time.map((end) => (
                    <option key={end.id} value={end.value}>
                      {end.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowEditModal(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                          transaction.status === "paid"
                            ? "success"
                            : transaction.status === "pending"
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
                      <span
                        className="w-4 menu-item-icon-warning mr-3 cursor-pointer"
                        onClick={() => handleEditClick(transaction)}
                        title="Edit Transaction"
                      >
                        <PencilIcon />
                      </span>
                      <span
                        className="w-4 menu-item-icon-error cursor-pointer"
                        onClick={() => deleteTransaction(transaction.id)}
                        title="Delete Transaction"
                      >
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
