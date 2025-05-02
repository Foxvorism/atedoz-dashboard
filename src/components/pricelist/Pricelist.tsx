import React from "react";
import Link from "next/link";
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

import Badge from "../ui/badge/Badge";
import Image from "next/image";

interface Pricelist {
  id: number;
  name: string;
  price: number;
  desc: string;
}

// Define the table data using the interface
const tableData: Pricelist[] = [
  {
    id: 1,
    name: "Studio at Bogor Baru Branch",
    price: 200000,
    desc: "Price is for an hour",
  },
  {
    id: 2,
    name: "Additional Photographer",
    price: 100000,
    desc: "Price is for an hour",
  },
];

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default function Pricelist() {
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((pricelist, index) => (
                  <TableRow key={pricelist.id}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        { pricelist.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        IDR. {formatPrice(pricelist.price)},00-
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {pricelist.desc}
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
