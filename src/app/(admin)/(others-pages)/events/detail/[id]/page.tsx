import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EventDetail from "@/components/events/Detail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Detail Event",
    description:
        "Atedoz Space Admin Dashboard",
    // other metadata
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value

    if (!token) {
        redirect("/signin")
    }

    return (
        <div>
            <PageBreadcrumb pageTitle2="Detail" pageTitle1="Events" />
            <EventDetail id={Number(id)} />
        </div>
    );
}