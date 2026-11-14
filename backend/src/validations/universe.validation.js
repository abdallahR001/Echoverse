import { z } from "zod";

export const updateUniverseSchema = z.object({
  universeId: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().url().nullable().optional(),
}).refine(
  (data) =>
    data.name !== undefined ||
    data.description !== undefined ||
    data.image !== undefined,
  {
    message: "At least one field must be provided for update.",
  }
);