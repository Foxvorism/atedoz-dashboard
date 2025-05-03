import React from "react";
import UserEdit from "@/components/users/Edit";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User | Atedoz Space Admin Dashboard",
  description: "Edit user details",
};

// Menggunakan Server Component untuk mengakses data berdasarkan ID di URL
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const tableData = [
    { id: 1, name: "Velis", email: "velis@gmail.com", role: "Admin" },
    { id: 2, name: "Rahma", email: "rahma@gmail.com", role: "Admin" },
    { id: 3, name: "Ababil", email: "ababil@gmail.com", role: "Admin" },
    { id: 4, name: "Irham", email: "irham@gmail.com", role: "Admin" },
    { id: 5, name: "Naufalih", email: "naufalih@gmail.com", role: "Admin" },
    { id: 6, name: "Customer", email: "customer@gmail.com", role: "Customer" },
  ];

  // Cari user berdasarkan id yang ada di URL
  const userData = tableData.find(user => user.id.toString() === id);

  return (
    <div>
      <PageBreadcrumb pageTitle2="Edit" pageTitle1="Users" />
      {/* Tampilkan form edit dengan data user yang sesuai */}
      {userData ? <UserEdit userData={userData} /> : <p>User not found.</p>}
    </div>
  );
}
