import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StudioEdit from "@/components/studios/Edit";

export const metadata = {
    title: "Edit Studio",
    description:
        "Atedoz Space Admin Dashboard",
    // other metadata
};

export default async function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <PageBreadcrumb pageTitle2="Edit" pageTitle1="Studio" />
            <StudioEdit id={Number(id)} />
        </div>
    );
}