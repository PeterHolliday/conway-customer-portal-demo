// src/components/site/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Menu, Home, Package, ClipboardList, HelpCircle, Mail } from "lucide-react";

// shadcn/ui components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * Sidebar
 * - Desktop: left rail with top-level items and an Orders accordion
 * - Mobile: hamburger triggers a Sheet with the same nav; links close the Sheet
 */
export default function Sidebar() {
  const pathname = usePathname();
  const defaultAccordion = useMemo(() => {
    if (!pathname) return undefined;
    return pathname.startsWith("/orders") || pathname.startsWith("/order-requests")
      ? "orders"
      : undefined;
  }, [pathname]);

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div className="flex md:hidden items-center justify-between border-b bg-white px-4 py-3">
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
              <NavBlock
                pathname={pathname}
                defaultAccordion={defaultAccordion}
                closeOnNavigate
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <span className="text-sm text-gray-700">Menu</span>
      </div>

      {/* Desktop left rail */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-gray-50 p-4">
        <NavBlock pathname={pathname} defaultAccordion={defaultAccordion} />
      </aside>
    </>
  );
}

function NavBlock({
  pathname,
  defaultAccordion,
  closeOnNavigate = false,
}: {
  pathname: string | null;
  defaultAccordion?: string;
  closeOnNavigate?: boolean;
}) {
  return (
    <nav className="space-y-2">
      {/* Home */}
      <NavLink
        href="/"
        icon={<Home className="h-4 w-4" />}
        label="Home"
        active={pathname === "/"}
        closeOnNavigate={closeOnNavigate}
      />

      {/* Orders group */}
      <Accordion type="single" collapsible defaultValue={defaultAccordion} className="w-full">
        <AccordionItem value="orders" className="border-none">
          <AccordionTrigger className="px-2 py-2 rounded hover:bg-gray-100 text-left">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-6 mt-1 space-y-1">
              <NavLink
                href="/orders"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Orders"
                active={pathname === "/orders"}
                closeOnNavigate={closeOnNavigate}
              />
              <NavLink
                href="/order-requests"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Order Requests"
                active={pathname === "/order-requests"}
                closeOnNavigate={closeOnNavigate}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* FAQ */}
      <NavLink
        href="/faq"
        icon={<HelpCircle className="h-4 w-4" />}
        label="FAQ"
        active={pathname === "/faq"}
        closeOnNavigate={closeOnNavigate}
      />

      {/* Contact Us */}
      <NavLink
        href="/contact"
        icon={<Mail className="h-4 w-4" />}
        label="Contact Us"
        active={pathname === "/contact"}
        closeOnNavigate={closeOnNavigate}
      />
    </nav>
  );
}

function NavLink({
  href,
  label,
  icon,
  active,
  closeOnNavigate,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  closeOnNavigate?: boolean;
}) {
  const node = (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-2 font-normal",
        active && "bg-gray-200 font-semibold"
      )}
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );

  // When shown inside the mobile <Sheet>, ensure link click closes the Sheet
  return closeOnNavigate ? <SheetClose asChild>{node}</SheetClose> : node;
}
