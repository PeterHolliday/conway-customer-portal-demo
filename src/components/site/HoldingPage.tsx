"use client";

export default function HoldingPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-[#007e48]">{title}</h1>
      <p className="text-muted-foreground">
        This page is under construction. Please check back soon.
      </p>
    </div>
  );
}
