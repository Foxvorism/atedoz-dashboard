import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pricelist from "@/components/pricelist/Pricelist";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Pricelist",
    description:
      "Atedoz Space Admin Dashboard",
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
        <PageBreadcrumb pageTitle2={null} pageTitle1="Pricelist" />
        <Pricelist />
      </div>
    );
  }