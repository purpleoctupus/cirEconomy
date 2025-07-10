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
import * as z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/\d/, "Debe contener al menos un número")
  .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial");

export const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: passwordSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
