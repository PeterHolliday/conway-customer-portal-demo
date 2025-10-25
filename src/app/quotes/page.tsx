import HoldingPage from "@/components/site/HoldingPage";
import PageHeader from "@/components/site/PageHeader";

export default function QuotesPage() {
  return (
    <>
      <PageHeader
        title="Quotes"
        subtitle="Take a look at your full list of current live quotes"
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        {<HoldingPage title="Holding page for Quotes" />}
      </div>
    </>
  );
}


