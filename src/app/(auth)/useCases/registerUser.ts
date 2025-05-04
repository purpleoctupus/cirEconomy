import { registerSchema, RegisterSchemaType } from "../utils/validationSchemas";
import { signInUser } from "./signInUser";

export type RegisterResponse = {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
};

export async function registerUser(data: RegisterSchemaType): Promise<RegisterResponse> {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();
      return {
        success: false,
        message: result.message || "Error al registrar usuario",
      };
    }

    await signInUser({ email: data.email, password: data.password });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error inesperado",
    };
  }
}
