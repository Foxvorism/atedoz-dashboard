import Schedule from "@/components/schedule/Schedule";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Schedule | Atedoz Space Admin Dashboard",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle2={null} pageTitle1="Schedule" />
      <Schedule />
    </div>
  );
}
