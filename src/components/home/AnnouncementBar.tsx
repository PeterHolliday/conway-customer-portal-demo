"use client";

import { cn } from "@/lib/utils";

export default function AnnouncementBar({
  text,
  className,
}: { text: string; className?: string }) {
  return (
    <div className={cn("w-full bg-[#007e48] text-white", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-3 font-semibold tracking-wide [text-wrap:balance] text-[clamp(14px,2.2vw,24px)]">
          {text}
        </div>
      </div>
    </div>
  );
}
