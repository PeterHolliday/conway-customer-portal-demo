// app/internal-order-requests/new/steps/Step3Materials.tsx
"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { type InternalOrderRequest } from "@/schemas/internal-order-request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { MATERIALS_GRID } from "@/lib/materialsGrid";

const MIX_TYPES = ["AC", "SMA", "HRA"] as const;
const STONE_SIZES = ["4", "6", "10", "14", "20", "32"] as const;
const CHARACTERISTICS = ["Open", "Dense", "Poro"] as const;
const LAYERS = ["Surf", "Bin"] as const;
const HARDNESS = ["LS", "HS", "NS"] as const;
const GRID = `${MATERIALS_GRID} [44px]`;

export default function Step3Materials({
  form,
}: {
  form: UseFormReturn<InternalOrderRequest>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  return (
    <Card className="overflow-hidden rounded-xl">
      <CardHeader className="p-0">
        <div className="bg-[#007e48] text-white px-4 py-3">
          <CardTitle className="text-white">Order Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-1 pb-6">
        <FocusScope loop trapped>
          <Form {...form}>
            {/* horizontal scroll on narrow screens; keep inputs spaced */}
            <div className="overflow-x-auto">
              <div className="min-w-[1100px] space-y-3">
                {/* header */}
                <div
                  className={`${GRID} text-xs font-medium text-muted-foreground select-none`}
                >
                  <div>Tonnage</div>
                  <div>AC/SMA/HRA</div>
                  <div>Stone size</div>
                  <div>Density</div>
                  <div>Surf/Bin</div>
                  <div>Pen</div>
                  <div>PSV</div>
                  <div>Clause</div>
                  <div>LS/HS/NS</div>
                  <div>Time On Site</div>
                  <div>Delivery Rate/Daywork</div>
                  <div />
                </div>

                {/* rows */}
                {fields.map((row, idx) => (
                  <div key={row.id} className={GRID}>
                    {/* Tonnage */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.tonnage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full"
                              type="number"
                              min={0}
                              step="0.01"
                              placeholder="t"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mix type */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.mixType`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={(v) =>
                              field.onChange(v as typeof field.value)
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {MIX_TYPES.map((m) => (
                                <SelectItem key={m} value={m}>
                                  {m}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Stone size */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.stoneSize`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={(v) =>
                              field.onChange(v as typeof field.value)
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {STONE_SIZES.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Open/Dense/Poro */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.characteristic`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={(v) =>
                              field.onChange(v as typeof field.value)
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CHARACTERISTICS.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Surf/Bin */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.layer`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={(v) =>
                              field.onChange(v as typeof field.value)
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {LAYERS.map((l) => (
                                <SelectItem key={l} value={l}>
                                  {l}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pen */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.pen`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* PSV */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.psv`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Clause */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.clause`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Area code */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.areaCode`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            value={field.value}
                            onValueChange={(v) =>
                              field.onChange(v as typeof field.value)
                            }
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {HARDNESS.map((a) => (
                                <SelectItem key={a} value={a}>
                                  {a}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Time on Site */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.timeOnSite`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Delivery Rate/Daywork */}
                    <FormField
                      control={form.control}
                      name={`materials.${idx}.deliveryRate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Delete button */}
                    <div className="flex items-center justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(idx)}
                        aria-label="Remove row"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      append({
                        tonnage: 0,
                        mixType: "",
                        stoneSize: "",
                        characteristic: "",
                        layer: "",
                        pen: "",
                        psv: "",
                        clause: "",
                        areaCode: "",
                        timeOnSite: "",
                        deliveryRate: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add material row
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </FocusScope>
      </CardContent>
    </Card>
  );
}
