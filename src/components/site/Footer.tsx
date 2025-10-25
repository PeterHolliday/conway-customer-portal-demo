"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

const GREEN = "#007e48";

const locations: { label: string; href: string }[] = [
  { label: "Aldershot Asphalt", href: "#" },
  { label: "Croydon Asphalt", href: "#" },
  { label: "Erith Asphalt & Wharf", href: "#" },
  { label: "Heathrow Asphalt & Recycling", href: "#" },
  { label: "Newhaven Asphalt, Wharf & Recycling", href: "#" },
  { label: "Reading Asphalt", href: "#" },
  { label: "Theale Asphalt", href: "#" },
  { label: "Chelsfield Recycling", href: "#" },
  { label: "Dartford Recycling", href: "#" },
  { label: "Imperial Bitumen Terminal", href: "#" },
  { label: "Technology Centre", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Terms and Conditions", href: "#" },
  { label: "Modern Slavery Statement", href: "#" },
  { label: "Bribery Policy", href: "#" },
];

function SocialIcon({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-sm bg-[#e9eef0] hover:bg-[#dfe7ea] transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-[#f3f5f6] text-foreground/90", className)}>
      {/* Top content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: service centre */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Aggregates &amp; Asphalt Customer Service Centre
            </h3>
            <p className="text-sm leading-relaxed">
              FM Conway Ltd, Conway House, Vestry Road, Sevenoaks, Kent TN14 5EL
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" style={{ color: GREEN }} />
              <span>0800 276 1122</span>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="https://www.linkedin.com" label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://facebook.com" label="Facebook">
                <Facebook className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter / X">
                <Twitter className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <Instagram className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>

          {/* Right: locations list (two columns) */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Our locations</h3>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {locations.map((loc) => (
                <Link
                  key={loc.label}
                  href={loc.href}
                  className="text-[15px] underline decoration-1 underline-offset-2 hover:text-[#005c35]"
                  style={{ color: GREEN }}
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 text-sm md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/conway-logo.svg"  // place your logo in /public
              alt="FM Conway"
              width={110}
              height={30}
              className="h-auto w-[110px]"
            />
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-foreground/60">
            Registered Company: 706445&nbsp;&nbsp;|&nbsp;&nbsp;© FM Conway {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
