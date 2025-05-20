import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EventDetail from "@/components/events/Detail";

export const metadata = {
    title: "Detail Event",
    description:
        "Atedoz Space Admin Dashboard",
    // other metadata
};

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <PageBreadcrumb pageTitle2="Detail" pageTitle1="Events" />
            <EventDetail id={Number(id)} />
        </div>
    );
}