// src/components/site/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Package,
  ClipboardList,
  HelpCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SheetClose } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

/**
 * Reusable navigation block (used by the desktop sidebar and by Header's mobile Sheet).
 * - closeOnNavigate: when true (in the Sheet), clicking a link will close the Sheet.
 * - collapsed: when true (desktop collapsed state), hide labels and center icons.
 */
export function NavBlock({
  pathname,
  closeOnNavigate = false,
  collapsed = false,
}: {
  pathname: string | null;
  closeOnNavigate?: boolean;
  collapsed?: boolean;
}) {
  return (
    <nav className="space-y-2">
      <NavLink
        href="/"
        icon={<Home className="h-4 w-4" />}
        label="Home"
        active={pathname === "/"}
        closeOnNavigate={closeOnNavigate}
        collapsed={collapsed}
      />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="orders" className="border-none">
          <Tooltip delayDuration={150}>
            <TooltipTrigger asChild>
              <AccordionTrigger
                className={cn(
                  "px-2 py-2 rounded hover:bg-gray-100 text-left",
                  collapsed && "justify-center"
                )}
              >
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {!collapsed && <span>Orders</span>}
                </div>
              </AccordionTrigger>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Orders</TooltipContent>}
          </Tooltip>
          <AccordionContent>
            <div className={cn("mt-1 space-y-1", collapsed ? "ml-0" : "ml-6")}>
              <NavLink
                href="/orders"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Orders"
                active={pathname === "/orders"}
                closeOnNavigate={closeOnNavigate}
                collapsed={collapsed}
              />
              <NavLink
                href="/order-requests"
                icon={<ClipboardList className="h-4 w-4" />}
                label="Order Requests"
                active={pathname === "/order-requests"}
                closeOnNavigate={closeOnNavigate}
                collapsed={collapsed}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <NavLink
        href="/faq"
        icon={<HelpCircle className="h-4 w-4" />}
        label="FAQ"
        active={pathname === "/faq"}
        closeOnNavigate={closeOnNavigate}
        collapsed={collapsed}
      />

      <NavLink
        href="/contact"
        icon={<Mail className="h-4 w-4" />}
        label="Contact Us"
        active={pathname === "/contact"}
        closeOnNavigate={closeOnNavigate}
        collapsed={collapsed}
      />
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r bg-white p-4 sticky top-0 h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand block */}
      <div
        className={cn(
          "flex items-center justify-between mb-4",
          collapsed && "flex-col gap-2"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/conway_circular_logo.svg"
            alt="FM Conway"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
          {!collapsed && (
            <span className="text-lg font-semibold text-[#007e48]">
              FM Conway
            </span>
          )}
        </Link>

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto mt-1"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!collapsed && (
        <div className="mt-1 text-xs text-gray-500 mb-3">
          © {new Date().getFullYear()} FM Conway
        </div>
      )}

      <div className="my-3 border-t" />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <NavBlock pathname={pathname} collapsed={collapsed} />
      </div>
    </aside>
  );
}

function NavLink({
  href,
  label,
  icon,
  active,
  closeOnNavigate,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  closeOnNavigate?: boolean;
  collapsed?: boolean;
}) {
  const linkEl = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded px-2 py-2 text-gray-700 hover:bg-gray-100",
        active && "bg-gray-200 font-semibold justify-start",
        collapsed && "justify-center"
      )}
      // native title as a fallback if you ever remove the Tooltip
      title={collapsed ? label : undefined}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  // Preserve Sheet auto-close on mobile
  const clickableEl = closeOnNavigate ? (
    <SheetClose asChild>{linkEl}</SheetClose>
  ) : (
    linkEl
  );

  // When collapsed, wrap the clickable element in a Tooltip
  if (collapsed) {
    return (
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>{clickableEl}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  // Expanded: no tooltip needed
  return clickableEl;
}
