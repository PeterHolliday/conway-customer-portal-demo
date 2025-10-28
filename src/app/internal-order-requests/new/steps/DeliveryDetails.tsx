// app/internal-order-requests/new/steps/Step2DeliveryDetails.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type InternalOrderRequest } from "@/schemas/internal-order-request";

export default function Step2DeliveryDetails({ form, deliveryDay }: { form: UseFormReturn<InternalOrderRequest>; deliveryDay: string; }) {
  return (
    <Form {...form}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Date</FormLabel>
              <FormControl><Input type="date" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:col-span-2">
          <FormLabel>Delivery Day (auto)</FormLabel>
          <div className="h-10 flex items-center px-3 rounded-md border text-sm bg-muted/50">
            {deliveryDay || "—"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField control={form.control} name="addressLine1" render={({ field }) => (
          <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input placeholder="Line 1" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="addressLine2" render={({ field }) => (
          <FormItem><FormLabel>Address Line 2</FormLabel><FormControl><Input placeholder="Line 2" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="addressLine3" render={({ field }) => (
          <FormItem><FormLabel>Address Line 3</FormLabel><FormControl><Input placeholder="Line 3" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="addressLine4" render={({ field }) => (
          <FormItem><FormLabel>Address Line 4</FormLabel><FormControl><Input placeholder="Line 4" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FormField control={form.control} name="town" render={({ field }) => (
          <FormItem><FormLabel>Town</FormLabel><FormControl><Input placeholder="Town" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="postcode" render={({ field }) => (
          <FormItem><FormLabel>Postcode</FormLabel><FormControl><Input placeholder="e.g. GU12 3AB" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="w3w" render={({ field }) => (
          <FormItem><FormLabel>What3Words</FormLabel><FormControl><Input placeholder="e.g. ///word.word.word" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>

      <div className="mt-4">
        <FormField control={form.control} name="deliveryInstructions" render={({ field }) => (
          <FormItem><FormLabel>Delivery Instructions</FormLabel><FormControl><Textarea rows={3} placeholder="Notes, access constraints, etc." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>
    </Form>
  );
}
