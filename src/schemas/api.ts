import { z } from "zod";

export const HomeSummarySchema = z.object({
  announcement: z.string(),
  creditLimit: z.number(),
  currentBalance: z.number(),
  user: z.object({ firstName: z.string() }),
});

export type HomeSummary = z.infer<typeof HomeSummarySchema>;

export const ContactsSchema = z.object({
  accountManager: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
  departments: z.array(z.object({
    title: z.string(),
    phone: z.string(),
    emailHref: z.string(),  
    emailLabel: z.string(),  
  })),
});

export type ContactsPayload = z.infer<typeof ContactsSchema>;
