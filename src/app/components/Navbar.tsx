import Image from "next/image";
import MenuNavbar from "./mobile/MenuNavbar";

export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-b from-green-200 via-green-100 to-green-50 shadow-md">
      <div className="flex items-center justify-between w-full px-6 md:px-20 py-4">
        
        {/* Logo y Nombre */}
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
            CirEconomy
          </span>
        </div>

        {/* Menú para móviles */}
        <MenuNavbar />

        {/* Menú de Navegación */}
        <nav className="hidden lg:flex space-x-8">
          <NavItem href="#" text="Inicio" />
          <NavItem href="#" text="Categorías" />
          <NavItem href="#" text="Cuenta" />
        </nav>
      </div>
    </header>
  );
}

// Componente reutilizable para los enlaces
const NavItem = ({ href, text }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-green-700 hover:underline transition-all focus:outline-none"
  >
    {text}
  </a>
);
