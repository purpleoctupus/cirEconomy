import { signOut } from "next-auth/react";

export async function signOutUser() {
  await signOut({ redirect: false });
  // Optionally, you can handle post-logout logic here
  return { success: true };
}
