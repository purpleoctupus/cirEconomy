"use client";
import Image from "next/image";
import MobileMenu from "./mobile/MobileMenu";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import { signOutUser } from "../(auth)/useCases/signOutUser";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  return (
    <header className="w-full bg-gradient-to-b from-green-200 via-green-100 to-green-50 shadow-md">
      <div className="flex items-center justify-between w-full px-6 md:px-20 py-4">
        <div className="flex items-center space-x-3">
          <Image
            className="dark:invert mix-blend-multiply"
            src="/logo.webp"
            alt="Logo CirEconomy"
            width={140}
            height={30}
            priority
          />
          <span className="hidden sm:block text-green-700 text-2xl md:text-3xl font-semibold">
            Cir-Economy
          </span>
        </div>
        <MobileMenu />
        <nav className="hidden lg:flex space-x-8 items-center">
          <NavItem href="/" text="Inicio" />
          <NavItem href="/categories" text="Categorías" />
          <NavItem href="/products" text="Productos" />
          {isLoading ? (
            <span className="text-green-700">Cargando...</span>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button
                  type="button"
                  className="focus:outline-none cursor-pointer"
                  tabIndex={0}
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || session.user.email || "Usuario"}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-green-400 shadow-sm object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-green-200 border-2 border-green-400 flex items-center justify-center text-green-700 font-bold text-lg shadow-sm">
                      {session.user.name
                        ? session.user.name.charAt(0).toUpperCase()
                        : session.user.email
                          ? session.user.email.charAt(0).toUpperCase()
                          : "U"}
                    </div>
                  )}
                </button>
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-36 bg-white border border-green-200 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-150">
                  <button
                    onClick={signOutUser}
                    className="w-full text-left px-4 py-2 text-green-700 hover:bg-green-100 rounded-b font-medium cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <NavItem href="/login" text="Mi cuenta" />
          )}
        </nav>
      </div>
    </header>
  );
}
