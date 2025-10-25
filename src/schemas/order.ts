import { z } from "zod";

export const ProductItemSchema = z.object({
  product: z.string().min(1, "Select a product"),
  quantity: z.preprocess(
    (val) => (val === "" || val == null ? undefined : Number(val)),
    z.number().min(0.01, "Must be > 0").max(20, "Max 20 tonnes")
  ),
});

export const CollectionSchema = z.object({
  products: z.array(ProductItemSchema).min(1, "Add at least one product").max(4, "Maximum of 4 products per collection"),
  time: z.string().min(1, "Select a time"),
});

export const StepOrderDetails = z.object({
  collectionDate: z.string().min(1, "Choose a collection date"),
  location: z.string().min(1, "Select location"),
  siteContact: z.string().min(1, "Select a site contact"),
  poReference: z.string().min(1, "Enter a PO reference"), // required
});

export const StepCollections = z.object({
  collections: z.array(CollectionSchema).min(1, "Add at least one collection"),
});

export const FullSchema = StepOrderDetails.merge(StepCollections);

export type FormValues = z.infer<typeof FullSchema>;
