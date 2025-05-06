'use client'

import axios from "axios";
import Link from "next/link";
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
  ListIcon, PencilIcon, TrashBinIcon
} from "../../icons/index";

// interface Studios {
//   id: number;
//   studio: string;
//   latitude: string;
//   longitude: string;
//   desc: string;
// }

// // Define the table data using the interface
// const tableData: Studios[] = [
//   {
//     id: 1,
//     studio: "Atedoz Space Bogor Baru",
//     latitude: "-6.591612319327254",
//     longitude: "106.81014535373673",
//     desc: "Cabang Bogor Baru",
//   },
//   {
//     id: 2,
//     studio: "Atedoz Space G.g Kelor",
//     latitude: "-6.580193548718884",
//     longitude: "106.77196462860871",
//     desc: "Cabang G.g Kelor",
//   },
// ];

export default function Studios() {

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
      } else {
        console.warn("⚠️ Format response tidak sesuai harapan:", response.data);
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
    getStudioData();
  }, []);

  return (
    <>
      <Link href="/studios/input">
        <button 
          className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
          >
            <div className="mr-1">
              <ListIcon />
          </div>
          Add a New Studio
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
                    Studio
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Latitude
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Longitude
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Description
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
                {studio.map((studios, index) => (
                  <TableRow key={studios.id}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        { studios.nama_studio}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {studios.longitude}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {studios.latitude}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {studios.deskripsi_posisi}
                    </TableCell>
                    <TableCell className="flex items-center px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      <span className="w-4 mr-3 cursor-pointer menu-item-icon-warning">
                        <PencilIcon />
                      </span>
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
