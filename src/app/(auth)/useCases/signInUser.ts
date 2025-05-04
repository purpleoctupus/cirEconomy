"use server";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

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

  if (res?.error) {
    throw new Error("Inicio de sesión fallido");
  }

  redirect("/home");
}
