"use client"; 
import { useState } from "react";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="lg:hidden p-2" onClick={() => setIsOpen(true)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-5 flex flex-col">
                    <button className="self-end mb-5" onClick={() => setIsOpen(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <ul className="flex flex-col space-y-4">
                        <li><a href="#" className="text-gray-700 hover:text-green-700">Inicio</a></li>
                        <li><a href="#" className="text-gray-700 hover:text-green-700">Servicios</a></li>
                        <li><a href="#" className="text-gray-700 hover:text-green-700">Contacto</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
