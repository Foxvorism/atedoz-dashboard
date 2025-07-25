import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PricelistEdit from "@/components/pricelist/Edit";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Pricelist",
  description:
    "Atedoz Space Admin Dashboard",
};

export default async function EditPricelistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/signin")
  }

  return (
    <div>
      <PageBreadcrumb pageTitle2="Edit" pageTitle1="Pricelist" />
      <PricelistEdit id={Number(id)} />
    </div>
  );
}

