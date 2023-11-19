"use client"

import {
  Navbar, 
  NavbarMenu,
  NavbarMenuToggle,
  Link,
  NavbarMenuItem
} from "@nextui-org/react";

import ThemeSwitcher from "@/components/theme-switcher";
import * as React from "react";

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
                color={pathname.includes(link.href) ? "primary" : "foreground"}
                className="w-full"
                href={link.href}
                size="lg"
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