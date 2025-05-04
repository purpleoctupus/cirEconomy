'use client'

import { useForm } from "react-hook-form";
import FormField from "../../components/FormField";
import { registerUser } from "../../useCases/registerUser";
import { signInUser } from "../../useCases/signInUser";
import {
  registerSchema,
  RegisterSchemaType,
} from "../../utils/validationSchemas";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function FormRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterSchemaType) => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const result = await registerUser(data);

      if (!result.success) {
        setErrorMsg(result.error || "Error al registrar usuario");
        return;
      }
      await signInUser({
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(handleRegister)}>
        <FormField
          label="Nombre completo"
          type="text"
          placeholder="Tu nombre"
          register={register("name")}
          error={errors.name?.message}
        />

        <FormField
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@example.com"
          register={register("email")}
          error={errors.email?.message}
        />

        <FormField
          label="Contraseña"
          type="password"
          placeholder="********"
          register={register("password")}
          error={errors.password?.message}
        />

        <FormField
          label="Confirmar contraseña"
          type="password"
          placeholder="********"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Crear cuenta"}
        </button>

        <div className="text-center text-sm mt-4">
          <span>¿Ya tienes cuenta? </span>
          <Link href="/login" className="text-green-600 hover:underline">
            Inicia sesión
          </Link>
        </div>
      </form>
    </>
  );
}
