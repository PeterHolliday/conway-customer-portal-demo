// src/components/site/Header.tsx
"use client";

import Image from "next/image";

// Conway brand
const GREEN = "#007e48";

/**
 * Header (nav-less)
 * - Keeps the Conway logo and user status strip
 * - All navigation has moved to the Sidebar component
 */
export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/conway-logo.svg" alt="FM Conway" width={150} height={40} priority />
        </div>
        <div className="text-sm text-[var(--conway-green,#007e48)]">
          Logged In From Admin Peter Holliday
        </div>
      </div>

      <style jsx global>{`
        :root { --conway-green: ${GREEN}; }
      `}</style>
    </header>
  );
}
