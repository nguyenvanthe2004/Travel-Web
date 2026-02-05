import { z } from "zod";
import { HotelStatus } from "../constants";

export const hotelSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Hotel name is required")
    .max(200, "Hotel name must not exceed 200 characters"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(500, "Address must not exceed 500 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description must not exceed 2000 characters"),

  status: z.nativeEnum(HotelStatus),

  images: z
    .array(z.string().trim().min(1, "Image URL is required"))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),

  locationId: z
    .string()
    .trim()
    .min(1, "Location is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid location ID format"),
});

export type HotelFormData = z.infer<typeof hotelSchema>;
