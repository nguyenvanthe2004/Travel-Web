import { z } from "zod";

export const locationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Location name is required"),

  images: z
    .array(z.string().trim().min(1, "Image URL is required"))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
});

export type LocationFormData = z.infer<typeof locationSchema>;
