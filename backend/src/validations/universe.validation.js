const updateUniverseSchema = z.object({
  universeId: z.string().uuid(),
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  image: z.string().url().optional(),
}).refine(
  (data) =>
    data.name !== undefined ||
    data.description !== undefined ||
    data.image !== undefined,
  {
    message: "At least one field must be provided for update.",
  }
);