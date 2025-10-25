import { cn } from "@/lib/utils";

export default function WelcomeBlurb({ className = "" }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-6xl px-4 py-8", className)}>
      <p className="max-w-3xl text-balance leading-relaxed">
        Welcome to your FM Conway Aggregates &amp; Asphalt customer account portal.  Here you can access your account details, view your orders as well as access live quotations and copy documents. 
      </p>
    </section>
  );
}
