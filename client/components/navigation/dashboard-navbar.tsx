"use client"

import {
  Navbar, 
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  cn
} from "@nextui-org/react";

import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";
import React from "react";

import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/helpers/constants";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
         <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <ThemeSwitcher />
        <NavbarMenu>
          {dashboardLinks.map((link) => (
            <NavbarMenuItem key={link.label}>
            <Link 
            key={link.label}
              href={link.href} 
              className={cn(
                pathname.includes(link.href) ? 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white font-semibold' : 'font-medium text-default-600',
                "w-full block px-4 py-2 rounded-xl"
              )}
              >
                {link.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default DashboardNavbar;