"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../utils/validationSchemas";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchemaType) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-green-50 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-700">Iniciar sesión</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="block text-gray-600">Correo electrónico</label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="tucorreo@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
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
