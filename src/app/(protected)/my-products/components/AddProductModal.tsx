import { useState } from "react";
import { useProductForm } from "../application/useProductForm";
import { AddProductSchemaType } from "../domain/productValidation";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: AddProductSchemaType & { image: File }) => void;
}

import { categoryOptions } from "../domain/categoryOptions";

export default function AddProductModal({ open, onClose, onSubmit }: AddProductModalProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useProductForm();

  function handleFormSubmit(data: AddProductSchemaType) {
    const imageFile = (data as any).image?.[0];
    if (!imageFile) {
      setErrorMsg("La imagen es obligatoria");
      return;
    }
    setErrorMsg("");
    onSubmit({ ...data, image: imageFile });
    reset();
    setSelectedFileName("");
  }

  function handleClose() {
    reset();
    setSelectedFileName("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white w-full max-w-md mx-2 rounded-xl shadow-lg p-6 relative animate-fade-in my-8">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-green-600 text-2xl cursor-pointer"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Agregar producto</h3>
        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Nombre */}
          <Field
            label="Nombre"
            error={errors.name?.message}
            input={
              <input
                type="text"
                {...register("name")}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Nombre del producto"
              />
            }
          />
          {/* Imagen */}
          <Field
            label="Imagen (PNG, JPG, JPEG, WEBP)"
            error={errors.image?.message as string}
            input={
              <label className="w-full flex items-center gap-3 cursor-pointer bg-gray-100 border border-gray-300 rounded-md p-3 hover:bg-gray-200 transition-all">
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium">Seleccionar imagen</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  {...register("image")}
                  className="hidden"
                  onChange={(e) => {
                    register("image").onChange(e);
                    const file = e.target.files && e.target.files[0];
                    setSelectedFileName(file ? file.name : "");
                  }}
                />
                <span className="text-gray-500 text-sm truncate">
                  {selectedFileName ? selectedFileName : "Ningún archivo seleccionado"}
                </span>
              </label>
            }
          />
          {/* Precio y Ubicación */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Field
              label="Precio"
              error={errors.price?.message}
              input={
                <input
                  type="text"
                  {...register("price")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="$0.00"
                />
              }
            />
            <Field
              label="Ubicación"
              error={errors.location?.message}
              input={
                <input
                  type="text"
                  {...register("location")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Ciudad"
                />
              }
            />
          </div>
          {/* Condición y Categoría */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Field
              label="Condición"
              error={errors.condition?.message}
              input={
                <input
                  type="text"
                  {...register("condition")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Ej: Nuevo, Usado"
                />
              }
            />
            <Field
              label="Categoría"
              error={errors.category?.message}
              input={
                <div className="relative">
                  <select
                    {...register("category")}
                    value={watch("category") ?? ""}
                    className={`w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 cursor-pointer bg-white appearance-none pr-10 shadow-sm transition-all ${watch("category") ? "text-gray-900" : "text-gray-400"}`}
                    required
                  >
                    <option value="" disabled>Seleccionar</option>
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
                  </span>
                </div>
              }
            />
          </div>
          {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all font-medium cursor-pointer"
          >
            Agregar producto
          </button>
        </form>
      </div>
    </div>
  );
}

import Field from "@/app/components/Field";
