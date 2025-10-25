"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { NAV, type NavLink } from "./nav.config";

// Conway brand
const GREEN = "#007e48";



export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-white">
      {/* Top strip with logo + user status */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image src="/conway-logo.svg" alt="FM Conway" width={150} height={40} priority />
        </div>
        <div className="text-sm text-[var(--conway-green,#007e48)]">
          Logged In From Admin Peter Holliday
        </div>
      </div>

      {/* Nav bar */}
      <nav className="border-b">
        <div className="mx-auto max-w-6xl px-4">{/* same container as Hero */}
          <NavigationMenu className="justify-start">
            <NavigationMenuList className="justify-start gap-1">
              {NAV.map((entry) =>
                entry.type === "link" ? (
                  <ItemLink key={entry.href} label={entry.label} href={entry.href} active={pathname === entry.href} />
                ) : (
                  <ItemGroup key={entry.label} label={entry.label} items={entry.items} pathname={pathname} />
                )
              )}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="https://www.fmconway.co.uk/our-services/aggregates-and-asphalt/conway-collect"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm font-medium hover:text-[#007e48]"
                  >
                    Conway Collect
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuViewport className="left-0" />
          </NavigationMenu>
        </div>
      </nav>


      <style jsx global>{`
        :root { --conway-green: ${GREEN}; }
      `}</style>
    </header>
  );
}

function ItemLink({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <NavigationMenuItem>
      <Link href={href} passHref>
        <NavigationMenuLink
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors",
            active ? "text-[#007e48] font-semibold" : "text-foreground/80 hover:text-[#007e48]"
          )}
        >
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

function ItemGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: { label: string; href: string }[];
  pathname: string | null;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-2 p-4 w-[220px]">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "block rounded px-2 py-1.5 text-sm transition-colors",
                    pathname === it.href ? "text-[#007e48] font-semibold" : "hover:text-[#007e48]"
                  )}
                >
                  {it.label}
                </NavigationMenuLink>
              </Link>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}