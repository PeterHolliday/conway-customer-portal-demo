// app/internal-order-requests/new/steps/Step4ReviewSubmit.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type InternalOrderRequest } from "@/schemas/internal-order-request";
import { MATERIALS_GRID_BASE } from "@/lib/materialsGrid";

const GRID = `${MATERIALS_GRID_BASE} [44px]`;

export default function Step4ReviewSubmit({
  form,
  deliveryDay,
}: {
  form: UseFormReturn<InternalOrderRequest>;
  deliveryDay: string;
}) {
  const v = form.getValues();
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-xl">
        <CardHeader className="p-0">
          <div className="bg-[#007e48] text-white px-4 py-3">
            <CardTitle className="text-white">Order Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-1 pb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-semibold mb-2">Order Details</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Requestor:</span>{" "}
                {v.companyRequestorName}
              </div>
              <div>
                <span className="text-muted-foreground">Req No:</span>{" "}
                {v.companyRequestorNumber}
              </div>
              <div>
                <span className="text-muted-foreground">Company:</span>{" "}
                {v.companyName}
              </div>
              <div>
                <span className="text-muted-foreground">Site Contact:</span>{" "}
                {v.siteContactName}
              </div>
              <div>
                <span className="text-muted-foreground">Site Contact No:</span>{" "}
                {v.siteContactNumber}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-2 text-sm">
            <div className="text-sm font-semibold mb-2">Delivery</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <span className="text-muted-foreground">Date:</span>{" "}
                {v.deliveryDate}
              </div>
              <div>
                <span className="text-muted-foreground">Day:</span>{" "}
                {deliveryDay || "—"}
              </div>
              <div>
                <span className="text-muted-foreground">Town:</span> {v.town}
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Postcode:</span>{" "}
                {v.postcode}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Address:</span>
              <div className="ml-2">
                {[
                  v.addressLine1,
                  v.addressLine2,
                  v.addressLine3,
                  v.addressLine4,
                ]
                  .filter(Boolean)
                  .map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">What3Words:</span> {v.w3w}
            </div>
            {v.deliveryInstructions && (
              <div>
                <span className="text-muted-foreground">Instructions:</span>{" "}
                {v.deliveryInstructions}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="text-sm font-semibold mb-2">Materials</div>
            <div className="space-y-2">
              {v.materials?.map((m, i) => (
                <div
                  key={i}
                  className={`${GRID} ...`}
                >
                  <div>{m.tonnage ?? "—"}</div>
                  <div>{m.mixType ?? "—"}</div>
                  <div>{m.stoneSize ?? "—"}</div>
                  <div>{m.characteristic ?? "—"}</div>
                  <div>{m.layer ?? "—"}</div>
                  <div>{m.pen || "—"}</div>
                  <div>{m.psv || "—"}</div>
                  <div>{m.clause || "—"}</div>
                  <div>{m.areaCode ?? "—"}</div>
                  <div>{m.timeOnSite || "—"}</div>
                  <div>{m.deliveryRate || "—"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </CardContent>
      </Card>
    </div>
  );
}
