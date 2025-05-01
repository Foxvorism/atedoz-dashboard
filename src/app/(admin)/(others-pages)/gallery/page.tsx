import Gallery from "@/components/gallery/Gallery";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Gallery | Atedoz Space Admin Dashboard",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default function page() {
    return (
        <div>
            <PageBreadcrumb pageTitle2={null} pageTitle1="Gallery" />
            <Gallery />
        </div>
    );
}