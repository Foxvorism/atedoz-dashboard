import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PricelistInput from "@/components/pricelist/Input";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Input Pricelist",
    description:
      "Atedoz Space Admin Dashboard",
    // other metadata
  };
  
  export default function page() {
    return (
      <div>
        <PageBreadcrumb pageTitle2="Input" pageTitle1="Pricelist" />
        <PricelistInput />
      </div>
    );
  }