import { signIn } from "next-auth/react";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.ok) {
    return { success: true };
  } else {
    return {
      success: false,
      error: res?.error || "Credenciales inválidas",
    };
  }
}
