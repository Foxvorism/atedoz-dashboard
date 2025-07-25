import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pricelist from "@/components/pricelist/Pricelist";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title:
    "Atedoz Space",
  description: "Admin Dashboard",
};

export default async function Ecommerce() {
  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/signin")
  }

  return (
    <div className="grid grid-cols-6 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <PageBreadcrumb pageTitle2={null} pageTitle1="Pricelist" />
        <Pricelist />
      </div>
    </div>
  );
}
