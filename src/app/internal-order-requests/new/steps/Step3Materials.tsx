// app/internal-order-requests/new/steps/Step3Materials.tsx
"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { type InternalOrderRequest } from "@/schemas/internal-order-request";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const MIX_TYPES = ["AC","SMA","HRA"] as const;
const STONE_SIZES = ["4","6","10","14","20","32"] as const;
const CHARACTERISTICS = ["Open","Dense","Poro"] as const;
const LAYERS = ["Surf","Bin"] as const;
const AREA_CODES = ["LS","HS","INS"] as const;

export default function Step3Materials({ form }: { form: UseFormReturn<InternalOrderRequest> }) {
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "materials" });

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="p-0">
        <div className="bg-[#007e48] text-white px-4 py-3">
          <CardTitle className="text-white">Order Details</CardTitle>
        </div>
      </CardHeader>
    <Form {...form}>
      <div className="space-y-3">
        <div className="grid grid-cols-[100px_100px_110px_110px_90px_90px_90px_90px_100px_1fr_40px] gap-2 text-xs font-medium text-muted-foreground">
          <div>Tonnage</div><div>AC/SMA/HRA</div><div>Stone size</div><div>Open/Dense/Poro</div><div>Surf/Bin</div><div>Pen</div><div>PSV</div><div>Clause</div><div>LS/HS/INS</div><div>Other Ref</div><div />
        </div>
        {fields.map((row, idx) => (
          <div key={row.id} className="grid grid-cols-[100px_100px_110px_110px_90px_90px_90px_90px_100px_1fr_40px] gap-2">
            <FormField control={form.control} name={`materials.${idx}.tonnage`} render={({ field }) => (
              <FormItem><FormControl><Input type="number" min={0} step="0.01" placeholder="t" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.mixType`} render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={(v) => field.onChange(v as typeof field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="AC/SMA/HRA" /></SelectTrigger></FormControl>
                  <SelectContent>{MIX_TYPES.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.stoneSize`} render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={(v) => field.onChange(v as typeof field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Size" /></SelectTrigger></FormControl>
                  <SelectContent>{STONE_SIZES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.characteristic`} render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={(v) => field.onChange(v as typeof field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Open/Dense/Poro" /></SelectTrigger></FormControl>
                  <SelectContent>{CHARACTERISTICS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.layer`} render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={(v) => field.onChange(v as typeof field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Surf/Bin" /></SelectTrigger></FormControl>
                  <SelectContent>{LAYERS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.pen`} render={({ field }) => (
              <FormItem><FormControl><Input placeholder="Pen" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.psv`} render={({ field }) => (
              <FormItem><FormControl><Input placeholder="PSV" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.clause`} render={({ field }) => (
              <FormItem><FormControl><Input placeholder="Clause" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.areaCode`} render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={(v) => field.onChange(v as typeof field.value)}>
                  <FormControl><SelectTrigger><SelectValue placeholder="LS/HS/INS" /></SelectTrigger></FormControl>
                  <SelectContent>{AREA_CODES.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name={`materials.${idx}.otherRef`} render={({ field }) => (
              <FormItem><FormControl><Input placeholder="Other reference" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="flex items-center">
              <Button type="button" variant="ghost" size="icon" onClick={() => remove(idx)} aria-label="Remove row">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button type="button" variant="secondary" onClick={() => append({
            tonnage: undefined, mixType: undefined, stoneSize: undefined, characteristic: undefined, layer: undefined, pen: "", psv: "", clause: "", areaCode: undefined, otherRef: ""
          })}>
            <Plus className="h-4 w-4 mr-1" /> Add material row
          </Button>
        </div>
      </div>
    </Form>
    </Card>
  );
}
