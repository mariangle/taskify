"use client"

import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  
} from "@nextui-org/react";

import LogoutButton from "./logout-button";

import Link from "next/link";

import * as React from "react";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const menuItems = [
    "Schedule",
    "Settings",
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
          {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link color="foreground" href="#">
              {item}
            </Link>
          </NavbarItem>
          ))}
      </NavbarContent>
      <LogoutButton />

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

export default DashboardNavbar;