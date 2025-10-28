// src/schemas/depot-config.ts
import { z } from "zod";

export const unitZ = z.enum(["t","L","kWhx10","%","m3","count"]);
export const fieldTypeZ = z.enum(["number","integer","boolean","text"]);

export const fieldZ = z.object({
  key: z.string().regex(/^[a-z0-9_]+$/),
  label: z.string().min(1),
  type: fieldTypeZ,
  unit: unitZ.optional(),
  required: z.boolean().optional(),
  precision: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  monotonic: z.boolean().optional(),
  deltaMaxPerDay: z.number().optional(),
  help: z.string().optional()
});

export const groupZ = z.object({
  key: z.string().regex(/^[a-z0-9_]+$/),
  label: z.string().min(1),
  items: z.array(fieldZ).min(1),
});

export const sectionZ = z.object({
  key: z.string().regex(/^[a-z0-9_]+$/),
  label: z.string().min(1),
  groups: z.array(groupZ).min(1),
});

export const configZ = z.object({
  title: z.string().min(1),
  notes: z.string().optional(),
  sections: z.array(sectionZ).min(1),
});

export type Unit = z.infer<typeof unitZ>;
export type FieldType = z.infer<typeof fieldTypeZ>;
export type Field = z.infer<typeof fieldZ>;
export type Group = z.infer<typeof groupZ>;
export type Section = z.infer<typeof sectionZ>;
export type Config = z.infer<typeof configZ>;

// extra validation helpers
export function validateUniqueKeys(cfg: Config): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const s of cfg.sections) {
    if (seen.has(s.key)) errors.push(`Duplicate section key: ${s.key}`);
    seen.add(s.key);
    for (const g of s.groups) {
      const gKey = `${s.key}.${g.key}`;
      if (seen.has(gKey)) errors.push(`Duplicate group key: ${gKey}`);
      seen.add(gKey);
      for (const f of g.items) {
        const fKey = `${s.key}.${g.key}.${f.key}`;
        if (seen.has(fKey)) errors.push(`Duplicate field key: ${fKey}`);
        seen.add(fKey);
      }
    }
  }
  return errors;
}
