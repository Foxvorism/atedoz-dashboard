import Articles from "@/components/categories/Articles";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Articles | Atedoz Space Admin Dashboard",
    description:
        "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
};

export default async function page() {
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value

    if (!token) {
        redirect("/signin")
    }
    return (
        <div>
            <PageBreadcrumb pageTitle2={null} pageTitle1="Categories" />
            <Articles />
        </div>
    );
}