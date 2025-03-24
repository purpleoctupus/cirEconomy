"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";


export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  // if (session) {
  //   router.push("/");
  // }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email: "admin@example.com",
      password: "password123",
      redirect: true,
      callbackUrl: "/", 
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-green-50 w-full max-w-md ">
        <h2 className="text-2xl font-semibold text-center text-green-700">Iniciar sesión</h2>
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600">Correo electrónico</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="tucorreo@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all cursor-pointer"
          >
            Iniciar sesión
          </button>

          <div className="text-center text-sm mt-4 cursor-pointer">
            <Link href="/forgot-password" className="text-green-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón para iniciar sesión con Google */}
          <button
            type="button"
            className="w-full mt-4 flex items-center justify-center gap-2 cursor-pointer bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition-all"
            onClick={() => signIn("google")}
          >
            <GrGoogle />
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </div>
  );
}
