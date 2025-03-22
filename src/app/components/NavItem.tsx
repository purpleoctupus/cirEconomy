import Link from "next/link";
import { NavItemProps } from "../infraestructure/InterfacesProps";

const NavItem: React.FC<NavItemProps> = ({ href, text }) => (
  <Link href={href} className="text-gray-700 hover:text-green-700 hover:underline transition-all focus:outline-none">
    {text}
  </Link>
);

export default NavItem;
  