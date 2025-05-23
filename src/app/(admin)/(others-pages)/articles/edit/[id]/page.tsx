import EditForm from '@/components/articles/Edit';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export const metadata = {
    title: "Edit Article | Atedoz Space Admin Dashboard",
    description:
      "Halaman Edit Artikel untuk Admin",
    // other metadata
  };

interface Props {
  params: { id: string };
}

export default async function EditArticlePage({ params }:{ params: Promise<{ id: string }> }){
    const { id } = await params;
  return (
        <div>
          <PageBreadcrumb pageTitle2="Edit" pageTitle1="Article" />
          <EditForm id={Number(id)} />
        </div>
      );
}