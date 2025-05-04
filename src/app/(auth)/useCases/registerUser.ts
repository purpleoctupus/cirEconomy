import { RegisterSchemaType } from "../utils/validationSchemas";

export async function registerUser(data: RegisterSchemaType) {
  try {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const result = await res.json();
      throw new Error(result.message || "Error al registrar usuario");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}