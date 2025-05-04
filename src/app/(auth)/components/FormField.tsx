"use client";

interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
}

export default function FormField({
  label,
  type,
  placeholder,
  register,
  error,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-gray-600">{label}</label>
      <input
        type={type}
        {...register}
        className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}