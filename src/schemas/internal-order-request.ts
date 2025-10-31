// src/schemas/order-request.ts
import { z } from "zod";

const phoneZ = z
  .string()
  .trim()
  .min(7, "Phone looks too short")
  .max(24, "Phone looks too long")
  .optional();

export const internalMaterialRowZ = z.object({
  tonnage: z.coerce.number().min(0, "Must be >= 0").optional().default(0),
  mixType: z.enum(["", "AC", "SMA", "HRA"]).optional().default(""),
  stoneSize: z.enum(["", "4", "6", "10", "14", "20", "32"]).optional().default(""),
  characteristic: z.enum(["", "Open", "Dense", "Porous"]).optional().default(""),
  layer: z.enum(["", "Surf", "Bin"]).optional().default(""),
  pen: z.string().optional().default(""),
  psv: z.string().optional().default(""),
  clause: z.string().optional().default(""),
  areaCode: z.enum(["", "LS", "HS", "INS"]).optional().default(""),
  timeOnSite: z.string().optional().default(""),
  deliveryRate: z.string().default(""),
});

export const internalOrderRequestZ = z.object({
  date: z.string().min(1, "Required").default(""),
  companyRequestorName: z.string().min(1, "Required").default(""),
  companyRequestorNumber: phoneZ,
  siteContactName: z.string().min(1, "Required").default(""),
  siteContactNumber: phoneZ,
  companyName: z.string().min(1, "Required").default(""),
  deliveryInstructions: z.string().optional().default(""),
  deliveryDay: z.string().default(""),
  addressLine1: z.string().min(1, "Required").default(""),
  addressLine2: z.string().default(""),
  addressLine3: z.string().default(""),
  addressLine4: z.string().default(""),
  deliveryDate: z.string().min(1, "Required").default(""),
  town: z.string().optional().default(""),
  postcode: z.string().optional().default(""),
  w3w: z.string().optional().default(""),
  materials: z.array(internalMaterialRowZ).min(1, "Add at least one row").default([]),
  enteredBy: z.string().optional().default(""),
  checkedBy: z.string().optional().default(""),
});

export type InternalOrderRequest = z.infer<typeof internalOrderRequestZ>;
export type InternalMaterialRow = z.infer<typeof internalMaterialRowZ>;
