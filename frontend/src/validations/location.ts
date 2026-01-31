import { z } from "zod";

export const locationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Location name is required"),

  image: z
    .string()
    .trim()
    .min(1, "Image is required")
});

export type LocationFormData = z.infer<typeof locationSchema>;
