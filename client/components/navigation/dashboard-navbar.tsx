"use client"

import ThemeSwitcher from "@/components/theme-switcher";
import * as React from "react";

import { usePathname } from "next/navigation";

import {
  Navbar, 
  NavbarMenu,
  NavbarMenuToggle,
  Link,
  NavbarMenuItem
} from "@nextui-org/react";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    {label: 'Dashboard', href: '/dashboard', active: pathname === "/dashboard"},
    {label: 'Tasks', href: '/tasks', active: pathname === "/tasks"},
    {label: 'Calendar', href: '/calendar', active: pathname === "/calendar"},
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full">
         <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <ThemeSwitcher />
        <NavbarMenu>
          {navLinks.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  item.active ? "primary" : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default DashboardNavbar;