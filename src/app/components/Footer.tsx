import { FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-green-200 via-green-100 to-green-50 py-8 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-semibold text-green-700">CirEconomy</h3>
          <p className="text-gray-600 text-sm max-w-xs mt-1">
            Conectamos empresas con materiales reutilizables para impulsar la economía circular.
          </p>
        </div>

        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-700 transition-all">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-700 transition-all">
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-green-700 transition-all">
            <FaTwitter size={24} />
          </a>
        </div>

        <a
          href="https://wa.me/573001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          <FaWhatsapp size={20} className="mr-2" />
          Contáctanos
        </a>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} CirEconomy - Todos los derechos reservados.
      </div>
    </footer>
  );
}
