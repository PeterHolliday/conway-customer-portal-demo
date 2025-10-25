import { type ZodSchema } from "zod";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || ""; // empty = use Next's internal /api

export async function getJSON<T>(
  path: string,
  schema: ZodSchema<T>,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  const data = await res.json();
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Response validation failed");
  }
  return parsed.data;
}
