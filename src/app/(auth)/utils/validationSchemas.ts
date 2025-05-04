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
