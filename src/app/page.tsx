"use client";
import Hero from "@/components/home/Hero";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import KpiCircles from "@/components/home/KpiCircles";
import WelcomeBlurb from "@/components/home/WelcomeBlurb";
import { useHomeSummary } from "@/services/hooks";
import { Skeleton } from "@/components/ui/skeleton"; 

export default function HomePage() {
  const { data, error, isLoading } = useHomeSummary();

  if (error) return <div className="mx-auto max-w-6xl px-4 py-8 text-red-600">Failed to load home data.</div>;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="mx-auto max-w-6xl px-4">
          <Skeleton className="h-[360px] w-full rounded-xl" />
        </div>
      ) : (
        <Hero firstName={data?.user.firstName ?? "Customer"} />
      )}
      <AnnouncementBar text={data?.announcement ?? "—"} className="-mt-px"/>

      <WelcomeBlurb />

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="border-t pt-6">
          <div className="text-sm font-semibold mb-4 text-[#007e48]">Account Details</div>
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-3">
              <Skeleton className="h-[220px] rounded-full" />
              <Skeleton className="h-[220px] rounded-full" />
              <Skeleton className="h-[160px] rounded-lg" />
            </div>
          ) : (
            <KpiCircles
              // tweak `KpiCircles` to accept props if you want dynamic values
            />
          )}
        </div>
      </section>
    </div>
  );
}
