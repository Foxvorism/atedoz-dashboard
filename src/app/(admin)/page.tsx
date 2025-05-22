import { IndexAdmin } from "@/components/ecommerce/IndexAdmin";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title:
    "Atedoz Space",
  description: "Admin Dashboard",
};

export default async function Ecommerce() {
  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value

  // if (!token) {
  //   redirect("/signin")
  // }

  return (
    <div className="grid grid-cols-6 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <IndexAdmin />

        <MonthlySalesChart />
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
    </div>
  );
}
