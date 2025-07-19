import { useState } from "react";
import { AddProductSchemaType } from "../domain/productValidation";

export function useEditDeleteProduct(initialProducts: any[], userId: string) {
  const [products, setProducts] = useState(initialProducts);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  function handleEditProduct(id: number) {
    setEditProductId(id);
    setShowEditModal(true);
  }

  function handleEditProductSubmit(updatedProduct: AddProductSchemaType) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editProductId ? { ...p, ...updatedProduct } : p
      )
    );
    setShowEditModal(false);
    setEditProductId(null);
  }

  function handleDeleteProduct(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  const userProducts = products.filter((p) => p.ownerId === userId);

  return {
    products,
    userProducts,
    editProductId,
    showEditModal,
    setShowEditModal,
    handleEditProduct,
    handleEditProductSubmit,
    handleDeleteProduct,
  };
}
