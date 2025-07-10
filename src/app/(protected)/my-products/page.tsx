"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductsGrid from "../../products/components/ProductsGrid";
import { useState } from "react";
import AddProductModal from "./AddProductModal";

// Dummy data for demonstration; replace with real fetch in production
const allProducts = [
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
    const [products, setProducts] = useState(allProducts);
    const [showAddModal, setShowAddModal] = useState(false);

    if (status === "loading") return <div>Cargando...</div>;
    if (!session) {
        router.push("/login");
        return <div>Redirigiendo al login...</div>;
    }

    // Filter products by logged-in user (using id as unique identifier)
    const userProducts = products.filter(
        (p) => p.ownerId === session.user?.id
    );
    // Placeholder for CRUD actions (to be implemented)
    function handleAddProduct() {
        setShowAddModal(true);
    }

    function handleAddProductSubmit(newProduct: any) {
        setProducts([
            ...products,
            {
                ...newProduct,
                id: products.length + 1,
                ownerId: session?.user?.id,
            },
        ]);
        setShowAddModal(false);
    }
    // function handleEditProduct(id) {}
    // function handleDeleteProduct(id) {}

    return (
        <section className="min-h-screen py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <h2 className="text-2xl font-semibold text-green-700">Mis productos</h2>
                    <button
                        onClick={handleAddProduct}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all font-medium shadow-sm"
                    >
                        + Agregar producto
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-green-50 p-4">
                    <ProductsGrid
                        products={userProducts}
                        title="Tus productos publicados"
                    />
                </div>
                <AddProductModal
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddProductSubmit}
                />
            </div>
        </section>
    );
}
function setShowAddModal(arg0: boolean) {
    throw new Error("Function not implemented.");
}

