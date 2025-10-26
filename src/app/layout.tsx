// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/site/Header";
import Sidebar from "@/components/site/Sidebar";
import Footer from "@/components/site/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
export const metadata = {
  title: "FM Conway Portal",
  description: "Internal portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] min-h-screen">
          {/* Sidebar (sticky full-height at the very top) */}
          <Sidebar />

          {/* Main column */}
          <div className="flex min-h-screen flex-col relative">
            <Header />
            <main className="flex-1 flex justify-center pt-[70px]">
              <div className="w-full max-w-6xl p-6">{children}</div>
            </main>
            {/* Global footer always present */}
            <Footer />
          </div>
        </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
