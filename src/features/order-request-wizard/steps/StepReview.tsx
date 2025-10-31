"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/schemas/order";
import { Summary } from "@/components/summary/Summary";

export function StepReview({ form, onBack, onSubmit }: {
  form: UseFormReturn<FormValues>; onBack: () => void; onSubmit: () => void;
}) {
  // const v = form.getValues();

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="p-0 rounded-t-xl">
        <div className="bg-[#007e48] text-white px-4 py-3">
          <CardTitle className="text-white">Review & submit</CardTitle>
        </div>
      </CardHeader>
      <Summary values={form.getValues()} />
      <CardFooter className="flex items-center justify-between">
        <Button type="button" className="mb-3" variant="outline" onClick={onBack}>Back</Button>
        <Button
          type="button"
          className="mb-3"
          disabled={!form.formState.isValid}
          onClick={onSubmit}
          title={!form.formState.isValid ? "Fill in all required fields before proceeding" : ""}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
