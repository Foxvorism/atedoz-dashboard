import EditForm from '@/components/categories/Edit';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Edit Kategori | Atedoz Space Admin Dashboard",
    description:
      "Halaman Edit Kategori untuk Admin",
    // other metadata
  };

export default async function EditArticlePage({ params }:{ params: Promise<{ id: string }> }){
  const { id } = await params;
  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value

  if (!token) {
    redirect("/signin")
  }
  return (
        <div>
          <PageBreadcrumb pageTitle2="Edit" pageTitle1="Category" />
          <EditForm id={Number(id)} />
        </div>
      );
}