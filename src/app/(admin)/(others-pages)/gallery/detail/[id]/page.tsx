import GalleryDetail from "@/components/gallery/Detail";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Gallery | Atedoz Space Admin Dashboard",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <PageBreadcrumb pageTitle2={null} pageTitle1="Gallery" />
            <GalleryDetail id={Number(id)}/>
        </div>
    );
}