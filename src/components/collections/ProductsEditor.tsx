import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, UseFormReturn, FieldError } from "react-hook-form";
import type { FormValues } from "@/schemas/order";

export function ProductsEditor({
  form,
  colIdx,
  PRODUCTS,
}: { form: UseFormReturn<FormValues>; colIdx: number; PRODUCTS: string[] }) {
  const arrayPath = `collections.${colIdx}.products` as `collections.${number}.products`;
  const { fields, append, remove } = useFieldArray<FormValues, typeof arrayPath>({ control: form.control, name: arrayPath });
  const prodErr = form.getFieldState(arrayPath).error;

  return (
    <div className="space-y-3">
      <Label className="text-base">Products (Split load?)</Label>
      {fields.map((f, i) => {
        const base = `collections.${colIdx}.products.${i}` as const;
        const errs: { product?: FieldError; quantity?: FieldError } = {
          product: form.getFieldState(`${base}.product`).error,
          quantity: form.getFieldState(`${base}.quantity`).error,
        };
        return (
          <div key={f.id} className="grid gap-3 sm:grid-cols-[2fr_1fr_auto] items-end">
            <div>
              <Label>Product</Label>
              <Select onValueChange={(v: string) => form.setValue(`${base}.product`, v, { shouldValidate: true })} value={form.watch(`${base}.product`)}>
                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                <SelectContent>{PRODUCTS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
              {errs.product && <p className="text-sm text-destructive mt-1">{errs.product.message}</p>}
            </div>

            <div>
              <Label>Quantity (Max 20)</Label>
              <Input
                type="number"
                step="0.01"
                {...form.register(`${base}.quantity` as const, { valueAsNumber: true })}
              />
              {errs.quantity && <p className="text-sm text-destructive mt-1">{errs.quantity.message}</p>}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => remove(i)} disabled={fields.length === 1}>Remove</Button>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Maximum of 4 products per collection</p>
        <Button type="button" variant="secondary" onClick={() => append({ product: PRODUCTS[0], quantity: 1 })} disabled={fields.length >= 4}>
          Split load? Add another product
        </Button>
      </div>

      {prodErr?.message && <p className="text-sm text-destructive">{prodErr.message}</p>}
    </div>
  );
}
