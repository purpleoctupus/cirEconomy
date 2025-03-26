"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItemProps } from "../application/interfaces/InterfacesProps";

const NavItem: React.FC<NavItemProps> = ({ href, text }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-lg transition-all focus:outline-none ${
        isActive ? "text-green-700 font-semibold border-b-2 border-green-700" : "text-gray-700"
      } hover:text-green-700`}
    >
      {text}
    </Link>
  );
};

export default NavItem;
