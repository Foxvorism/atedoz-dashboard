import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ArticleDetail from "@/components/categories/Detail";

export const metadata = {
    title: "Detail Artikel",
    description:
        "Atedoz Space Admin Dashboard",
    // other metadata
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <PageBreadcrumb pageTitle2="Detail" pageTitle1="Categories" />
            <ArticleDetail id={Number(id)} />
        </div>
    );
}