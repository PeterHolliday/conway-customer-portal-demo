// src/components/site/CollapsibleGroup.tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface CollapsibleGroupProps {
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

/**
 * CollapsibleGroup
 * Reusable accordion + tooltip wrapper for sidebar groups.
 * - Shows a tooltip when the sidebar is collapsed
 * - Shows label + children when expanded
 */
export default function CollapsibleGroup({
  icon,
  label,
  collapsed,
  children,
}: CollapsibleGroupProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={label.toLowerCase()} className="border-none">
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <AccordionTrigger
              className={cn(
                "px-2 py-2 rounded hover:bg-gray-100 text-left",
                collapsed && "justify-center"
              )}
            >
              <div className="flex items-center gap-2">
                {icon}
                {!collapsed && <span>{label}</span>}
              </div>
            </AccordionTrigger>
          </TooltipTrigger>
          {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
        </Tooltip>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
