"use client";

import { useSearchParams } from "next/navigation";
import ProductsGrid from "../components/ProductsGrid";

export default function Products() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const allProducts = [
    {
      name: "Excavadora usada",
      image: "/products/excavator.jpg",
      price: "$20.000.000",
      location: "Bogotá",
      condition: "Buen estado",
      category: "maquinaria",
    },
    {
      name: "Ladrillos sobrantes",
      image: "/products/bricks.jpg",
      price: "$500.000",
      location: "Medellín",
      condition: "Nuevos",
      category: "construccion",
    },
    {
      name: "Tubos metálicos",
      image: "/products/metal_pipes.jpg",
      price: "$1.200.000",
      location: "Cali",
      condition: "Usado, buen estado",
      category: "metales",
    },
  ];

  const filteredProducts = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  return (
    <ProductsGrid
      products={filteredProducts}
      title={
        category
          ? `Categoria: ${category.charAt(0).toUpperCase() + category.slice(1)}`
          : "Todos los productos disponibles"
      }
    />
  );
}
