"use client";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Sección de Video */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 w-full px-6 md:px-20 pt-14">
        <div className="flex justify-center w-full md:w-1/2">
          {!isVideoLoaded ? (
            <div
              className="relative w-full max-w-2xl h-64 sm:h-96 bg-gray-200 flex items-center justify-center cursor-pointer rounded-lg shadow-md"
              onClick={() => setIsVideoLoaded(true)}
            >
              <img
                src="https://img.youtube.com/vi/D9k7UysgDns/hqdefault.jpg"
                alt="Miniatura del video de YouTube"
                className="absolute w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bg-black/70 p-4 rounded-full">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full max-w-2xl aspect-video rounded-lg shadow-md"
              src="https://www.youtube.com/embed/D9k7UysgDns?autoplay=1"
              loading="lazy"
              title="Video sobre economía circular"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center px-4 max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-2">¿Qué es la Economía Circular?</h2>
          <p className="text-gray-600 mt-2 leading-relaxed text-justify">
            La economía circular busca mantener los recursos en el ciclo productivo el mayor tiempo posible, minimizando residuos y maximizando su reutilización.
          </p>
          <ul className="list-disc pl-5 text-gray-600 mt-2 text-left leading-relaxed">
            <li>Uso eficiente de materiales, agua y energía.</li>
            <li>Nuevos modelos de negocio sostenibles.</li>
            <li>Menos contaminación y residuos.</li>
            <li>Mayor reciclaje y reutilización.</li>
          </ul>
        </div>
      </section>

      {/* Sección de Aplicaciones */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 w-full px-6 md:px-20 pt-14">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 text-center px-4 max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-2">Ejemplos de Aplicación en Colombia</h2>
          <p className="text-gray-600 mt-2 leading-relaxed text-justify">
            En Colombia, la economía circular impulsa la reutilización, el reciclaje y la reducción de residuos en diversos sectores.
          </p>
          <ul className="list-disc pl-5 text-gray-600 mt-2 text-left leading-relaxed">
            <li><strong>Textil:</strong> Ropa reciclada y de segunda mano.</li>
            <li><strong>Envases:</strong> Uso de envases reutilizables.</li>
            <li><strong>Orgánicos:</strong> Fertilizantes a partir de residuos.</li>
            <li><strong>Plásticos:</strong> Reciclaje y reutilización.</li>
            <li><strong>Simbiosis Industrial:</strong> Empresas compartiendo recursos.</li>
          </ul>
        </div>
        <div className="flex justify-center w-full md:w-1/2">
          <Image
            className="opacity-90 rounded-xl shadow-md"
            src="/eco.webp"
            alt="Ejemplo de economía circular"
            width={672}
            height={672}
            layout="intrinsic"
            priority
          />
        </div>
      </section>

      {/* Sección de CirEconomy */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 w-full px-6 md:px-20 py-14">
        <div className="flex justify-center w-full md:w-1/2">
          <Image
            className="opacity-90 rounded-xl shadow-md"
            src="/Foto-Onda-País.jpg"
            alt="CirEconomy en acción"
            width={672}
            height={672}
            layout="intrinsic"
            priority
          />
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 text-center px-4 max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-2">¿Qué es CirEconomy?</h2>
          <p className="text-gray-600 mt-2 leading-relaxed text-justify">
            CirEconomy conecta empresas que generan materiales reutilizables con aquellas que los necesitan. Por ejemplo, una constructora puede vender excedentes en lugar de desecharlos, reduciendo desperdicio y fomentando un modelo sostenible.
          </p>
          <div className="w-full flex justify-center">
            <Link href="/login">
              <button className="bg-green-600 text-white text-lg px-8 py-3 rounded-xl shadow-md hover:bg-green-700 transition-all mt-4 cursor-pointer">
                ¡Únete a CirEconomy!
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
