"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/schemas/order";
import { tomorrowISO } from "@/lib/date";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function StepDetails({
  form, LOCATIONS, CONTACTS, onNext,
}: { form: UseFormReturn<FormValues>; LOCATIONS: string[]; CONTACTS: string[]; onNext: () => void}) {
  const tomorrow = tomorrowISO();

  const collectionDateErr = form.getFieldState("collectionDate").error?.message;
  const locationErr = form.getFieldState("location").error?.message;
  const siteContactErr = form.getFieldState("siteContact").error?.message;
  const poReferenceErr = form.getFieldState("poReference").error?.message;

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="p-0" >
        <div className="bg-[#007e48] text-white px-4 py-3">
          <CardTitle className="text-white">Request an order</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="collectionDate">Collection date</Label>
          <Input id="collectionDate" type="date" min={tomorrow} {...form.register("collectionDate")} />
          {collectionDateErr && <p className="text-sm text-destructive mt-1">{collectionDateErr}</p>}
        </div>

        <div>
          <Label>Select location</Label>
          <Select onValueChange={(v: string) => form.setValue("location", v, { shouldValidate: true })} value={form.watch("location")}>
            <SelectTrigger><SelectValue placeholder="Choose a location" /></SelectTrigger>
            <SelectContent>{LOCATIONS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
          </Select>
          {locationErr && <p className="text-sm text-destructive mt-1">{locationErr}</p>}
        </div>

        <div>
          <Label>Site contact</Label>
          <Select onValueChange={(v: string) => form.setValue("siteContact", v, { shouldValidate: true })} value={form.watch("siteContact")}>
            <SelectTrigger><SelectValue placeholder="Choose a contact" /></SelectTrigger>
            <SelectContent>{CONTACTS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          {siteContactErr && <p className="text-sm text-destructive mt-1">{siteContactErr}</p>}
        </div>

        <div>
          <Label htmlFor="poReference">PO reference</Label>
          <Input
            id="poReference"
            placeholder="MYREFERENCE"
            value={form.watch("poReference") ?? ""}
            onChange={(e) => form.setValue("poReference", e.target.value.toUpperCase(), { shouldValidate: true })}
          />
          {poReferenceErr && <p className="text-sm text-destructive mt-1">{poReferenceErr}</p>}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Tooltip
          open={form.formState.isValid ? false : undefined}
        >
          <TooltipTrigger asChild>
            <span className="inline-flex">
              <Button
                type="button"
                className="mb-3"
                disabled={!form.formState.isValid}
                onClick={onNext}
              >
                Next
              </Button>
            </span>
          </TooltipTrigger>

          <TooltipContent side="top" align="end">
            Fill in all required fields before proceeding
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}