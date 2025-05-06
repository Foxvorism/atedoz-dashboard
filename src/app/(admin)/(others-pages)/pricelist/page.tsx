import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pricelist from "@/components/pricelist/Pricelist";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricelist",
    description:
      "Atedoz Space Admin Dashboard",
    // other metadata
  };
  
  export default function page() {
    return (
      <div>
        <PageBreadcrumb pageTitle2={null} pageTitle1="Pricelist" />
        <Pricelist />
      </div>
    );
  }