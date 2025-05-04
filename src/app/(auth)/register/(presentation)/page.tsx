"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchemaType,
} from "../../utils/validationSchemas";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { signIn } from "next-auth/react";
import { registerUser } from "../../useCases/registerUser";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const result = await registerUser(data);

      if (result.success) {
        setSuccess(true);
      } else {
        Object.entries(result.errors ?? {}).forEach(([key, value]) => {
          setError(key as keyof RegisterSchemaType, {
            message: value[0],
          });
        });
      }
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-green-50 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-700">
          Crear cuenta
        </h2>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-600">Nombre completo</label>
            <input
              type="text"
              {...register("name")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Tu nombre"
            />
            {errors.name?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600">Correo electrónico</label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="tucorreo@example.com"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-600">Contraseña</label>
            <input
              type="password"
              {...register("password")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="********"
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-600">Confirmar contraseña</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="********"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Crear cuenta"}
          </button>

          {success && (
            <p className="text-green-600 text-center mt-2">
              ¡Cuenta creada exitosamente!
            </p>
          )}

          <div className="text-center text-sm mt-4">
            <span>¿Ya tienes cuenta? </span>
            <Link href="/login" className="text-green-600 hover:underline">
              Inicia sesión
            </Link>
          </div>

          <button
            type="button"
            className="w-full mt-4 flex items-center justify-center gap-2 cursor-pointer bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition-all"
            onClick={() => signIn("google")}
          >
            <GrGoogle />
            Registrarse con Google
          </button>
        </form>
      </div>
    </div>
  );
}
