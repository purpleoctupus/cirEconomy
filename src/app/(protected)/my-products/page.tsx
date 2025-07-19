"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsGrid from "../../products/components/ProductsGrid";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import DeleteProductModal from "./components/DeleteProductModal";
import { useMyProducts } from "./application/useMyProducts";
import { useEditDeleteProduct } from "./application/useEditDeleteProduct";

const initialProducts = [
  {
    id: 1,
    name: "Excavadora usada",
    image: "/products/excavator.jpg",
    price: "$20.000.000",
    location: "Bogotá",
    condition: "Buen estado",
    category: "maquinaria",
    ownerId: "user1",
  },
  {
    id: 2,
    name: "Ladrillos sobrantes",
    image: "/products/bricks.jpg",
    price: "$500.000",
    location: "Medellín",
    condition: "Nuevos",
    category: "construccion",
    ownerId: "user2",
  },
  {
    id: 3,
    name: "Tubos metálicos",
    image: "/products/metal_pipes.jpg",
    price: "$1.200.000",
    location: "Cali",
    condition: "Usado, buen estado",
    category: "metales",
    ownerId: "user1",
  },
];

export default function MyProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    userProducts,
    showAddModal,
    setShowAddModal,
    handleAddProduct,
    handleAddProductSubmit,
  } = useMyProducts(session);

  // Edit/Delete logic
  const {
    products,
    editProductId,
    showEditModal,
    setShowEditModal,
    handleEditProduct,
    handleEditProductSubmit,
    handleDeleteProduct,
  } = useEditDeleteProduct(initialProducts, session?.user?.id ?? "");

  const productToEdit = products.find((p) => p.id === editProductId) || null;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

  function handleDeleteRequest(id: number) {
    setProductIdToDelete(id);
    setShowDeleteModal(true);
  }

  function handleDeleteConfirm() {
    if (productIdToDelete !== null) {
      handleDeleteProduct(productIdToDelete);
    }
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  }

  function handleDeleteCancel() {
    setShowDeleteModal(false);
    setProductIdToDelete(null);
  }

  const productToDelete = products.find((p) => p.id === productIdToDelete);

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading") return <div>Cargando...</div>;
  if (!session) return <div>Redirigiendo al login...</div>;

  return (
    <section className="min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-2xl font-semibold text-green-700">Mis productos</h2>
          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all font-medium shadow-sm cursor-pointer"
          >
            + Agregar producto
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-green-50 p-4">
          <ProductsGrid
            products={userProducts}
            title="Tus productos publicados"
            onEdit={handleEditProduct}
            onDelete={handleDeleteRequest}
            showActions={true}
          />
        </div>
        <AddProductModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProductSubmit}
        />
        <EditProductModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          product={productToEdit}
          onSubmit={handleEditProductSubmit}
        />
        <DeleteProductModal
          open={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          productName={productToDelete?.name}
        />
      </div>
    </section>
  );
}

