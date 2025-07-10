import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// Update the import path below if your 'route.ts' file is located elsewhere
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return <>{children}</>;
}
