import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StudioInput from "@/components/studios/Input";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Input Studio",
    description:
      "Atedoz Space Admin Dashboard",
    // other metadata
  };
  
  export default function page() {
    return (
      <div>
        <PageBreadcrumb pageTitle2="Input" pageTitle1="Studio" />
        <StudioInput />
      </div>
    );
  }