import React from "react";
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

import Badge from "../ui/badge/Badge";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Define the table data using the interface
const tableData: User[] = [
  {
    id: 1,
    name: "Velis",
    email: "velis@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Rahma",
    email: "rahma@gmail.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Ababil",
    email: "ababil@gmail.com",
    role: "Admin",
  },
  {
    id: 4,
    name: "Irham",
    email: "irham@gmail.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Naufalih",
    email: "naufalih@gmail.com",
    role: "Admin",
  },
  {
    id: 6,
    name: "Customer",
    email: "customer@gmail.com",
    role: "Customer",
  },
];

export default function Users() {
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
                {tableData.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          user.role === "Admin"
                            ? "success"
                            : user.role === "Customer"
                            ? "warning"
                            : "error"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 text-start text-theme-sm dark:text-gray-400 flex items-center">
                      <Link href={`/users/edit/${user.id}`} className="flex justify-center items-center">
                        <span className="w-4 menu-item-icon-warning mr-5 cursor-pointer">
                          <PencilIcon />
                        </span>
                      </Link>
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
