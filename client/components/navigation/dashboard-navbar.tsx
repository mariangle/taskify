"use client"

import {
  Navbar, 
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Button
} from "@nextui-org/react";

import Link from "next/link";
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
              <Link href={link.href}>
                <Button
                  className={pathname.includes(link.href) ? "bg-primary" : "bg-foreground"} 
                  > {  /* fix styling */} 
                  {link.label}
                </Button>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default DashboardNavbar;