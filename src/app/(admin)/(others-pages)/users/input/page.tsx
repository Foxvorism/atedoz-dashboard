
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserInput from "@/components/users/Input";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Input User | Atedoz Space Admin Dashboard",
  description: "This is Next.js Calender page for TailAdmin Tailwind CSS Admin Dashboard Template",
};

export default function Page() {

  return (
    <div>
      <PageBreadcrumb pageTitle2="Input" pageTitle1="Users" />
      <UserInput />
    </div>
  );
}
