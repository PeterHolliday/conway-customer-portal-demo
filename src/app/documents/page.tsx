import HoldingPage from "@/components/site/HoldingPage";
import PageHeader from "@/components/site/PageHeader";

export default function DocumentsPage() {
  return (
        <>
          <PageHeader
            title="Documents"
            subtitle="Take a look at your full list of live invoices and credit memos"
          />
          <div className="mx-auto max-w-6xl px-4 py-6">
            {<HoldingPage title="Holding page for Documents" />}
          </div>
        </>
      );
}
