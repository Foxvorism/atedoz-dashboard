import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PricelistEdit from "@/components/pricelist/Edit";

export const metadata = {
  title: "Edit Pricelist | Atedoz Space Admin Dashboard",
  description:
    "This is Next.js Calendar page for TailAdmin Tailwind CSS Admin Dashboard Template",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditPricelistPage({ params }: PageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return <div>Invalid ID</div>; // Optional: display something when ID is invalid
  }

  return (
    <div>
      <PageBreadcrumb pageTitle2="Edit" pageTitle1="Pricelist" />
      <PricelistEdit id={id} />
    </div>
  );
}
