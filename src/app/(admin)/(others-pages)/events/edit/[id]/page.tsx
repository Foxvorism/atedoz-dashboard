import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EventsEdit from "@/components/events/Edit";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Edit Event | Atedoz Space Admin Dashboard",
    description:
      "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
    // other metadata
  };
  
  export default async function EventEditPage({ params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value

    if (!token) {
      redirect("/signin")
    }
    return (
      <div>
        <PageBreadcrumb pageTitle2="Edit" pageTitle1="Event" />
        <EventsEdit id={Number(id)} />
      </div>
    );
  }