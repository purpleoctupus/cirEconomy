import { useState } from "react";

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

export function useMyProducts(session: any) {
  const [products, setProducts] = useState(allProducts);
  const [showAddModal, setShowAddModal] = useState(false);

  const userProducts = products.filter(
    (p) => p.ownerId === session?.user?.id
  );

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

  return {
    products,
    userProducts,
    showAddModal,
    setShowAddModal,
    handleAddProduct,
    handleAddProductSubmit,
  };
}
