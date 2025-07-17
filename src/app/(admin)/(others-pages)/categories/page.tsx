import Articles from "@/components/categories/Articles";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Articles | Atedoz Space Admin Dashboard",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function page() {
    return (
        <div>
            <PageBreadcrumb pageTitle2={null} pageTitle1="Categories" />
            <Articles />
        </div>
    );
}