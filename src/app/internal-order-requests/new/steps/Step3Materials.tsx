// app/internal-order-requests/new/steps/Step3Materials.tsx
"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import type { InternalOrderRequest } from "@/schemas/internal-order-request";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";

// 🔹 Shared config: column definitions + grid template
import { MATERIAL_COLUMNS } from "@/lib/materialColumns";
import { MATERIALS_GRID_INPUT as GRID_BASE } from "@/lib/materialsGrid";

// 🔹 FormValueArray = dynamic, type-safe array path helper (materials.i.key)
import FormValueArray from "@/components/form-value-array";

type Props = {
  form: UseFormReturn<InternalOrderRequest>;
};

export default function Step3Materials({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  // Build the CSS grid template from the column widths + a delete column
  const gridTemplate = `${GRID_BASE}`; // GRID_BASE already includes delete column width

  // Build defaults for a new row from the column config
  function newRowDefaults(): Partial<InternalOrderRequest["materials"][number]> {
    const obj = Object.fromEntries(
      MATERIAL_COLUMNS.map((c) => [c.key, c.defaultValue ?? undefined])
    );
    return obj as Partial<InternalOrderRequest["materials"][number]>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1100px] space-y-3">
        {/* Header */}
        <div
          className="grid gap-3 text-xs font-medium text-muted-foreground select-none"
          style={{
            // MATERIALS_GRID_INPUT is a class string; we only need its column spec.
            // If you prefer pure classes, replace this inline style by keeping the class on the div.
            // Here we rely on the class string directly:
            // className={`${GRID_BASE} text-xs ...`}
          }}
        >
          <div className={`${gridTemplate} text-xs font-medium text-muted-foreground select-none`}>
            {MATERIAL_COLUMNS.map((col) => (
              <div key={String(col.key)}>{col.header}</div>
            ))}
            <div /> {/* delete col */}
          </div>
        </div>

        {/* Rows */}
        {fields.map((row, idx) => (
          <div key={row.id} className={gridTemplate}>
            {MATERIAL_COLUMNS.map((col) => {
              // Number editor: store number|undefined, UI is string
              if (col.editor === "number") {
                return (
                  <FormValueArray<
                    InternalOrderRequest,
                    "materials",
                    typeof col.key,
                    string
                  >
                    key={String(col.key)}
                    form={form}
                    array="materials"
                    index={idx}
                    field={col.key}
                    format={(n) => (n === undefined ? "" : String(n))}
                    parse={(s) => (s === "" ? undefined : Number(s))}
                  >
                    {(value, set) => (
                      <Input
                        type="number"
                        inputMode="decimal"
                        value={value}
                        onChange={(e) => set(e.target.value)}
                        className="w-full"
                      />
                    )}
                  </FormValueArray>
                );
              }

              // Select editor: unions/strings
              if (col.editor === "select") {
                return (
                  <FormValueArray<
                    InternalOrderRequest,
                    "materials",
                    typeof col.key
                  >
                    key={String(col.key)}
                    form={form}
                    array="materials"
                    index={idx}
                    field={col.key}
                  >
                    {(value, set) => (
                      <Select
                        value={value ?? undefined}
                        onValueChange={(v) => set(v)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={col.header} />
                        </SelectTrigger>
                        <SelectContent>
                          {(col.options ?? []).map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormValueArray>
                );
              }

              // Text editor
              return (
                <FormValueArray<
                  InternalOrderRequest,
                  "materials",
                  typeof col.key,
                  string
                >
                  key={String(col.key)}
                  form={form}
                  array="materials"
                  index={idx}
                  field={col.key}
                  format={(s) => s ?? ""}
                  parse={(s) => s}
                >
                  {(value, set) => (
                    <Input
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      className="w-full"
                    />
                  )}
                </FormValueArray>
              );
            })}

            {/* Delete button cell */}
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

        {/* Add row */}
        <Button
          type="button"
          variant="secondary"
          onClick={() => append(newRowDefaults() as InternalOrderRequest["materials"][number])}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add material row
        </Button>
      </div>
    </div>
  );
}
