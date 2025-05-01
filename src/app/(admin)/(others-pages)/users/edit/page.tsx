// import { useRouter } from "next/router";
// import React, { useState, useEffect } from "react";
// import UserEdit from "@/components/users/Edit";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Edit User | Atedoz Space Admin Dashboard",
//   description: "Edit user details",
// };

// export default function Page() {
//   const router = useRouter();
//   const { id } = router.query; // Mendapatkan ID dari URL

//   const [userData, setUserData] = useState<any | null>(null);

//   const tableData = [
//     {
//       id: 1,
//       name: "Velis",
//       email: "velis@gmail.com",
//       role: "Admin",
//     },
//     {
//       id: 2,
//       name: "Rahma",
//       email: "rahma@gmail.com",
//       role: "Admin",
//     },
//     {
//       id: 3,
//       name: "Ababil",
//       email: "ababil@gmail.com",
//       role: "Admin",
//     },
//     {
//       id: 4,
//       name: "Irham",
//       email: "irham@gmail.com",
//       role: "Admin",
//     },
//     {
//       id: 5,
//       name: "Naufalih",
//       email: "naufalih@gmail.com",
//       role: "Admin",
//     },
//     {
//       id: 6,
//       name: "Customer",
//       email: "customer@gmail.com",
//       role: "Customer",
//     },
//   ];

//   useEffect(() => {
//     if (id) {
//       // Mengambil data user berdasarkan ID
//       // Contoh: Mengambil data dari API atau data lokal
//       // Gantilah ini dengan pemanggilan API nyata jika perlu
//       const fetchUserData = async () => {
//         // Simulasi data pengguna berdasarkan ID
//         const user = tableData.find(user => user.id.toString() === id);
//         setUserData(user); // Menyimpan data pengguna di state
//       };
//       fetchUserData();
//     }
//   }, [id]);

//   return (
//     <div>
//       <PageBreadcrumb pageTitle2="Edit" pageTitle1="Users" />
//       {/* Jika userData sudah ada, tampilkan form edit */}
//       {userData ? <UserEdit userData={userData} /> : <p>Loading...</p>}
//     </div>
//   );
// }
