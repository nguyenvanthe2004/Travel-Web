import { z } from "zod";
import { RoomStatus } from "../constants";

export const roomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Room name is required")
    .max(200, "Room name must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description must not exceed 2000 characters"),

  status: z.nativeEnum(RoomStatus),

  price: z.number().min(1, "Price must be greater than 0"),
  
  maxGuests: z.number().min(1, "Max guests must be at least 1").optional(),

  wide: z.number().min(1, "Room size must be greater than 0").optional(),

  images: z
    .array(z.string().trim().min(1, "Image URL is required"))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
});

export type RoomFormData = z.infer<typeof roomSchema>;
