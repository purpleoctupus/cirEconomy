import { z } from "zod";

export const AddProductSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  image: z
    .any()
    .refine((file) => file && file.length === 1, "La imagen es obligatoria")
    .refine(
      (file) =>
        file &&
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file[0]?.type),
      "Formato de imagen no válido"
    ),
  price: z.string().min(1, "El precio es obligatorio"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  condition: z.string().min(1, "La condición es obligatoria"),
  category: z.string().min(1, "La categoría es obligatoria"),
});

export type AddProductSchemaType = z.infer<typeof AddProductSchema>;