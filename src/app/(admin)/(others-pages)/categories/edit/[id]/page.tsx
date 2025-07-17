import EditForm from '@/components/categories/Edit';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata = {
    title: "Edit Kategori | Atedoz Space Admin Dashboard",
    description:
      "Halaman Edit Kategori untuk Admin",
    // other metadata
  };

interface Props {
  params: { id: string };
}

export default async function EditArticlePage({ params }:{ params: Promise<{ id: string }> }){
    const { id } = await params;
  return (
        <div>
          <PageBreadcrumb pageTitle2="Edit" pageTitle1="Category" />
          <EditForm id={Number(id)} />
        </div>
      );
}