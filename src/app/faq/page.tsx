import HoldingPage from "@/components/site/HoldingPage";
import PageHeader from "@/components/site/PageHeader";

export default function FaqPage() {
  return (
      <>
        <PageHeader
          title="FAQ"
          subtitle="How can we help you?"
        />
        <div className="mx-auto max-w-6xl px-4 py-6">
          {<HoldingPage title="Holding page for FAQs" />}
        </div>
      </>
    );
}
