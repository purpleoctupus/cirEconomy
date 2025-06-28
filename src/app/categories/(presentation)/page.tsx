"use client";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Maquinaria", image: "/categories/machine.jpg", slug: "maquinaria" },
  { name: "Materiales de construcción", image: "/categories/construction.jpg", slug: "construccion" },
  { name: "Metales", image: "/categories/metal.jpg", slug: "metales" },
  { name: "Plásticos", image: "/categories/plastic.jpg", slug: "plasticos" },
  { name: "Textiles", image: "/categories/textile.jpg", slug: "textiles" },
  { name: "Otros", image: "/categories/other.jpg", slug: "otros" },
];

export default function Categories() {
  return (
    <div className="px-6 md:px-20 py-14">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">Categorías Disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{cat.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
