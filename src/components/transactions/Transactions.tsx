import React from "react";
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
        id: number,
        name: string,
    };
    package: {
        id: number,
        name: string,
    }
    schedule: {
        id: number,
        date: string,
        time: string,
        studio: {
            id: number,
            name: string,
        }
    }
    status: string;
}

// Define the table data using the interface
const tableData: Transactions[] = [
    {
        id: 1,
        user: {
            id: 1,
            name: "Velis"
        },
        package: {
            id: 1,
            name: "Studio in Bogor Baru Branch"
        },
        schedule: {
            id: 1,
            date: "5 May 2025",
            time: "10.00 - 11.00",
            studio: {
                id: 1,
                name: "Atedoz Space Bogor Baru Branch",
            }
        },
        status: "Pending",
    },
];



export default function Transactions() {
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
                {tableData.map((transaction, index) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        { transaction.user.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {transaction.package.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {transaction.schedule.date} | {transaction.schedule.time}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                        {transaction.schedule.studio.name}
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
