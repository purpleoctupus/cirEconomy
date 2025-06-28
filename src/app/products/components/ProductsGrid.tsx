"use client";
import React from "react";
import Image from "next/image";

interface Product {
  name: string;
  image: string;
  price: string;
  location: string;
  condition: string;
}

interface Props {
  products: Product[];
  title: string;
}

export default function ProductsGrid({ products, title }: Props) {
  return (
    <div className="px-6 md:px-20 py-14">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">{title}</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-green-700 font-bold">{item.price}</p>
                <p className="text-gray-600 text-sm">
                  {item.condition} - {item.location}
                </p>
                <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
