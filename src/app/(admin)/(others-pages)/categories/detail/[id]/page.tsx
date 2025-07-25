import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ArticleDetail from "@/components/categories/Detail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Detail Artikel",
    description:
        "Atedoz Space Admin Dashboard",
    // other metadata
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value

    if (!token) {
        redirect("/signin")
    }

    return (
        <div>
            <PageBreadcrumb pageTitle2="Detail" pageTitle1="Categories" />
            <ArticleDetail id={Number(id)} />
        </div>
    );
}