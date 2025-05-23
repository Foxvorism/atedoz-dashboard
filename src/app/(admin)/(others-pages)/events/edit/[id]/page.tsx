import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EventsEdit from "@/components/events/Edit";

export const metadata = {
    title: "Edit Event | Atedoz Space Admin Dashboard",
    description:
      "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
  };
  
  export default async function EventEditPage({ params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    return (
      <div>
        <PageBreadcrumb pageTitle2="Edit" pageTitle1="Event" />
        <EventsEdit id={Number(id)} />
      </div>
    );
  }