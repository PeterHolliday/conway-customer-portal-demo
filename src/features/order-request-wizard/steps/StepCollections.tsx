"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import type { FormValues } from "@/schemas/order";
import { ProductsEditor } from "@/components/collections/ProductsEditor";


const TIMES = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`);


export function StepCollections({
  form, PRODUCTS, onBack, onNext,
}: { form: UseFormReturn<FormValues>; PRODUCTS: string[]; onBack: () => void; onNext: () => void }) {
  const errors = form.formState.errors as Record<string, any>;
  const { fields: collectionFields, append, remove } = useFieldArray({ control: form.control, name: "collections" });

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="p-0" >
        <div className="bg-[#007e48] text-white px-4 py-3"> 
          <CardTitle className="text-white">Collections</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {collectionFields.map((col, colIdx) => {
          const colErr = errors.collections?.[colIdx] || {};
          return (
            <div key={col.id} className="rounded-lg border">
              <div className="flex items-center justify-between bg-[#007e48] text-white px-4 py-2 rounded-t-lg">
                <div className="font-semibold">Collection {colIdx + 1}</div>
                <Button type="button" variant="secondary" size="sm" onClick={() => remove(colIdx)}>Remove</Button>
              </div>

              <div className="p-4 space-y-4">
                <ProductsEditor form={form} colIdx={colIdx} PRODUCTS={PRODUCTS} />
                {colErr?.products && <p className="text-sm text-destructive">{colErr.products.message ?? "Fix product entries"}</p>}

                <div className="max-w-xs">
                  <Label>Time</Label>
                  <Select onValueChange={(v) => form.setValue(`collections.${colIdx}.time` as const, v, { shouldValidate: true })}
                          value={form.watch(`collections.${colIdx}.time` as const)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                  {colErr?.time && <p className="text-sm text-destructive mt-1">{colErr.time.message}</p>}
                </div>
              </div>
            </div>
          );
        })}

        <Button type="button" variant="outline" onClick={() => append({ products: [{ product: PRODUCTS[0], quantity: 1 }], time: "06:00" })}>
          + Add another collection
        </Button>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button type="button" className="mb-3" variant="outline" onClick={onBack}>Back</Button>
        <Button 
          type="button" 
          className="mb-3" 
          disabled={!form.formState.isValid} 
          onClick={onNext}
          title={!form.formState.isValid ? "Fill in all required fields before proceeding" : ""}
          >
            Next
        </Button>
      </CardFooter>
    </Card>
  );
}
