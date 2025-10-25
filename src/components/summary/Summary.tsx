// components/summary/Summary.tsx
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { FormValues } from "@/schemas/order";

export function Summary({ values }: { values: FormValues }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2 pl-3">
        <div><Label className="text-muted-foreground">Collection date</Label><div>{values.collectionDate || "—"}</div></div>
        <div><Label className="text-muted-foreground">Location</Label><div>{values.location || "—"}</div></div>
        <div><Label className="text-muted-foreground">Site contact</Label><div>{values.siteContact || "—"}</div></div>
        <div><Label className="text-muted-foreground">PO reference</Label><div>{values.poReference || "—"}</div></div>
      </div>
      <Separator />
      <div className="space-y-3">
        {values.collections?.map((c, i) => (
          <div key={i} className="rounded-lg border p-3">
            <div className="font-semibold mb-2">Collection {i + 1} • {c.time}</div>
            <div className="space-y-1">
              {c.products.map((p, j) => (
                <div key={j} className="grid grid-cols-[1fr_auto] gap-2">
                  <div>{p.product}</div><div className="text-right">{p.quantity} T</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
