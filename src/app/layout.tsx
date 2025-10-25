// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/site/Header";
import Sidebar from "@/components/site/Sidebar"; // shadcn-based sidebar with mobile Sheet

export const metadata = {
  title: "FM Conway Portal",
  description: "Internal portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        {/* Top header */}
        <Header />

        {/* Content row: sidebar (desktop) + main content */}
        <div className="flex min-h-[calc(100vh-70px)]">
          {/* Sidebar renders its own desktop aside + mobile Sheet trigger bar */}
          <Sidebar />

          {/* Main page content */}
          <main className="flex-1 flex justify-center">
            <div className="w-full max-w-6xl p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
