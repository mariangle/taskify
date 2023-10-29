"use client"
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link
} from "@nextui-org/react";

import * as React from "react";

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "My Settings",
    "Log Out",
  ];

  const navLinks = [
    { label: 'Features', href: '#' },
    { label: 'Integrations', href: '#' },
  ]

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen} isBordered>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
    <NavbarBrand>
      <p className="font-bold text-inherit">SpeechScheduler</p>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {navLinks.map((link) => (
      <NavbarItem key={link.label}>
        <Link color="foreground" href={link.href}>
          {link.label}
        </Link>
      </NavbarItem>
      ))}
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Customers
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
    <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
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