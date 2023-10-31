"use client"

import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  
} from "@nextui-org/react";

import AuthNav from "@/components/auth-nav";

import Link from "next/link";

import * as React from "react";
import { usePathname } from "next/navigation";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const pathname = usePathname();

  const menuItems = [
    "Profile",
    "Dashboard",
    "My Settings",
    "Log Out",
  ];

  const navLinks = [
    { label: 'Planner', href: '/planner', active: pathname.includes('planner') },
    { label: 'Commands', href: '/commands', active: pathname.includes('commands') },
  ]

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link href="/" aria-current="page" className="font-bold text-inherit">
          SleepScheduler
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLinks.map((link) => (
        <NavbarItem key={link.label}>
          <Link className={link.active ? "text-primary" : "text-foreground"} href={link.href}>
            {link.label}
          </Link>
        </NavbarItem>
        ))}
      </NavbarContent>
      <AuthNav />
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
  </Navbar>
  )
}

export default MainNavbar;