import React from "react";

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName?: string;
}

export default function DeleteProductModal({ open, onClose, onConfirm, productName }: DeleteProductModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white w-full max-w-sm mx-2 rounded-xl shadow-lg p-6 relative animate-fade-in my-8">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-green-600 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold text-red-600 mb-4 text-center">¿Eliminar producto?</h3>
        <p className="text-center text-gray-700 mb-6">
          ¿Estás seguro que deseas eliminar <span className="font-bold">{productName}</span>? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
