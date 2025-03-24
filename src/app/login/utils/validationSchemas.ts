import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/\d/, "Debe contener al menos un número")
    .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
