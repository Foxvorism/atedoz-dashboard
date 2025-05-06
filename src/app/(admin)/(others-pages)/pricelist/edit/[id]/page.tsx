import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PricelistEdit from "@/components/pricelist/Edit";

export const metadata = {
  title: "Edit Pricelist",
  description:
    "Atedoz Space Admin Dashboard",
};

export default async function EditPricelistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <PageBreadcrumb pageTitle2="Edit" pageTitle1="Pricelist" />
      <PricelistEdit id={Number(id)} />
    </div>
  );
}

