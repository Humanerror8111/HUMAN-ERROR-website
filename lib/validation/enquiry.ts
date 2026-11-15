import { z } from "zod";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site-config";

const serviceValues = [...services.map((s) => s.title), "Pricing / custom quote", "Other"] as unknown as [string, ...string[]];
const budgetValues = [...siteConfig.budgetRanges] as unknown as [string, ...string[]];

/** Shared by the browser form and the API route. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s()-]*$/, "Phone can contain digits, spaces, + ( ) -")
    .optional()
    .or(z.literal("")),
  business: z.string().trim().max(150).optional().or(z.literal("")),
  service: z.enum(serviceValues, { errorMap: () => ({ message: "Please choose a service" }) }),
  budget: z.enum(budgetValues, { errorMap: () => ({ message: "Please choose a budget range" }) }),
  details: z.string().trim().min(20, "Please give us at least a few sentences (20+ characters)").max(4000),
  /** Honeypot: real users never fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export const serviceOptions = serviceValues;
