// app/internal-order-requests/new/steps/Step1OrderDetails.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type InternalOrderRequest } from "@/schemas/internal-order-request";
import { FocusScope } from "@radix-ui/react-focus-scope";

export default function Step1OrderDetails({
  form,
}: {
  form: UseFormReturn<InternalOrderRequest>;
}) {
  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="p-0">
        <div className="bg-[#007e48] text-white px-4 py-3">
          <CardTitle className="text-white">Order Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 pb-6">
        <FocusScope loop trapped>
          <Form {...form}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyRequestorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requestor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyRequestorNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requestor Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 07123 456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siteContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siteContactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 07000 000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </FocusScope>
      </CardContent>
    </Card>
  );
}
