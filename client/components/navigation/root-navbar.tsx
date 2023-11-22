import {
  Navbar, 
  NavbarBrand,   
} from "@nextui-org/react";

import AuthNav from "@/components/navigation/root-auth-nav";

import Link from "next/link";

import React from "react";

const RootNavbar = () => {
  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <Link href="/" aria-current="page" className="font-bold text-inherit">
          .taskify
        </Link>
      </NavbarBrand>
      <AuthNav />
    </Navbar>
  )
}

export default RootNavbar;