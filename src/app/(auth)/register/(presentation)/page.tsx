import FormRegister from "./RegisterForm";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-green-50 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-green-700">
          Crear cuenta
        </h2>
        <FormRegister />
      </div>
    </div>
  );
}
