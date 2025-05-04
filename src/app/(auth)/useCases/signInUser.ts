import { signIn } from "next-auth/react";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/home"
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Error al iniciar sesión" };
  }
}