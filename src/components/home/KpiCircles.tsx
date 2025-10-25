import { cn } from "@/lib/utils";
import { Phone, Mail } from "lucide-react";

function KpiCircle({
  label,
  value,
  className,
}: { label: string; value: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center rounded-full border-2 border-[#afca0b] text-center",
        "size-[clamp(160px,20vw,240px)]", // responsive diameter
        className
      )}
    >
      <div>
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-3xl font-semibold text-[#007e48]">{value}</div>
      </div>
    </div>
  );
}

export default function KpiCircles() {
  return (
    <div className="grid gap-8 md:grid-cols-3 items-start">
      <KpiCircle label="Credit Limit" value="£999,999.00" />
      <KpiCircle label="Current Balance" value="£-35,918.18" />
      <div className="rounded-lg border p-4">
        <div className="font-semibold mb-3">Your FM Conway Sales Contact</div>
        <div className="space-y-2">
          <div>Andy Prescott</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-[#007e48]" />
            <span>07770 999961</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-[#007e48]" />
            <a className="underline text-[#007e48]" href="mailto:andy.prescott@fmconway.co.uk">
              andy.prescott@fmconway.co.uk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
