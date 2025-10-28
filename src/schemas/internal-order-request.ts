// src/schemas/order-request.ts
import { z } from "zod";

const phoneZ = z
  .string()
  .trim()
  .min(7, "Phone looks too short")
  .max(24, "Phone looks too long")
  .optional();

export const internalMaterialRowZ = z.object({
  tonnage: z.coerce.number().min(0, "Must be >= 0").optional(),
  mixType: z.enum(["AC", "SMA", "HRA"]).optional(),
  stoneSize: z.enum(["4", "6", "10", "14", "20", "32"]).optional(),
  characteristic: z.enum(["Open", "Dense", "Poro"]).optional(),
  layer: z.enum(["Surf", "Bin"]).optional(),
  pen: z.string().optional(),
  psv: z.string().optional(),
  clause: z.string().optional(),
  areaCode: z.enum(["LS", "HS", "INS"]).optional(),
  otherRef: z.string().optional(),
});

export const internalOrderRequestZ = z.object({
  date: z.string().min(1, "Required"),
  companyRequestorName: z.string().min(1, "Required"),
  companyRequestorNumber: phoneZ,
  siteContactName: z.string().min(1, "Required"),
  siteContactNumber: phoneZ,
  companyName: z.string().min(1, "Required"),
  deliveryInstructions: z.string().optional(),
  deliveryDay: z.string(),
  addressLine1: z.string().min(1, "Required"),
  addressLine2: z.string(),
  addressLine3: z.string(),
  addressLine4: z.string(),
  deliveryDate: z.string().min(1, "Required"),
  town: z.string().optional(),
  postcode: z.string().optional(),
  w3w: z.string().optional(),
  materials: z.array(internalMaterialRowZ).min(1, "Add at least one row"),
  enteredBy: z.string().optional(),
  checkedBy: z.string().optional(),
});

export type InternalOrderRequest = z.infer<typeof internalOrderRequestZ>;
export type InternalMaterialRow = z.infer<typeof internalMaterialRowZ>;
