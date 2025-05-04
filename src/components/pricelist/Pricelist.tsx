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
  DollarLineIcon, PencilIcon, TrashBinIcon
} from "../../icons/index";


// interface Pricelist {
//   id: number;
//   name: string;
//   price: number;
//   desc: string;
// }



// const tableData: Pricelist[] = [
//   {
//     id: 1,
//     name: "Studio at Bogor Baru Branch",
//     price: 200000,
//     desc: "Price is for an hour",
//   },
//   {
//     id: 2,
//     name: "Additional Photographer",
//     price: 100000,
//     desc: "Price is for an hour",
//   },
// ];

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};


export default function Pricelist() {

  const [pricelist, setPricelistData] = useState<any[]>([]);

  const getPriceListData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/packages`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
      });

      // Karena response langsung array, langsung set
      if (Array.isArray(response.data)) {
        setPricelistData(response.data);
        console.log("📦 Data paket:", response.data);
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

  const deletePrice = async (id: number) => {
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
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/packages/${id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              }
            }
          );
          await getPriceListData();  // Refresh data setelah dihapus
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
    getPriceListData();
  }, []);

  useEffect(() => {
    if (pricelist.length > 0) {
      console.log("✅ Pricelist data telah berhasil dimuat.");
    } else {
      console.log("⚠️ Tidak ada data pricelist ditemukan.");
    }
  }, [pricelist]);


  return (
    <>
      <Link href="/pricelist/input">
        <button
          className="flex w-full justify-center items-center rounded-lg border h-auto text-center p-3 mb-4 bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-500)]"
        >
          <div className="mr-1">
            <DollarLineIcon />
          </div>
          Add a New Pricelist
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
                    Package
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Price
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
                    Thumbnail
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
                {pricelist.map((item: any, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {item.nama_paket}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      IDR. {formatPrice(item.harga)},00-
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {item.deskripsi}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {item.thumbnail}
                    </TableCell>
                    <TableCell className="flex items-center px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      <span className="w-4 mr-3 cursor-pointer menu-item-icon-warning">
                        <Link href={`/pricelist/edit/${item.id}`}>
                          <PencilIcon />
                        </Link>
                      </span>
                      <span className="w-4 cursor-pointer menu-item-icon-error"
                        onClick={() => deletePrice(item.id)}>
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
