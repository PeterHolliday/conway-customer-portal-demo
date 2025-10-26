// src/components/site/Header.tsx
"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavBlock } from "./Sidebar";

const GREEN = "#007e48";

/**
 * Header (balanced)
 * - Desktop: right-aligned status
 * - Mobile: hamburger opens a Sheet with navigation
 * - Logo remains in the sidebar; header keeps things light
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-[16rem] z-40 border-b bg-white">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-3">
        {/* Mobile hamburger (sidebar Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SheetHeader className="border-b px-4 py-3">
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-3.25rem)] p-4">
                <NavBlock pathname={pathname} closeOnNavigate />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* spacing flex */}
        <div className="flex-1" />

        {/* Status */}
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
