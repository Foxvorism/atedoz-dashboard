import Transactions from "@/components/transactions/Transactions";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Transactions | Atedoz Space Admin Dashboard",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function page() {
    return (
        <div>
            <PageBreadcrumb pageTitle2={null} pageTitle1="Transactions" />
            <Transactions />
        </div>
    );
}