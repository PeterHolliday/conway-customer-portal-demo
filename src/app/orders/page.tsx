import HoldingPage from "@/components/site/HoldingPage";
import PageHeader from "@/components/site/PageHeader";

export default function OrdersPage() {
return (
    <>
      <PageHeader
        title="Orders"
        subtitle="Take a look at your past, present and future orders"
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        {<HoldingPage title="Holding page for Orders" />}
      </div>
    </>
  );
}


