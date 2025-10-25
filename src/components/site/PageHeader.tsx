"use client";

import { cn } from "@/lib/utils";

/**
 * Conway-style page header (legacy look).
 * Left green block with white title, subtitle to the right.
 */
export default function PageHeader({
  title,
  subtitle,
  className,
  color = "#007e48", // Conway Green
}: {
  title: string;
  subtitle?: string;
  className?: string;
  color?: string;
}) {
  return (
    <div className={cn("w-full shadow-[0_1px_0_0_rgba(0,0,0,0.15)]", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-stretch">
          {/* Left green slab */}
          <div
            className="rounded-br-lg px-6 py-4 text-white font-bold"
            style={{ backgroundColor: color }}
          >
            <h1 className="text-[clamp(18px,2.2vw,28px)] leading-none">{title}</h1>
          </div>

          {/* Subtitle area */}
          <div className="flex-1 px-6 py-4 grid items-center">
            {subtitle ? (
              <p className="text-[clamp(14px,1.6vw,18px)] text-foreground/90">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
