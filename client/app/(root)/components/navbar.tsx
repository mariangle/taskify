import {
  Navbar, 
  NavbarBrand,   
} from "@nextui-org/react";

import Logo from "@/components/ui/logo";
import AuthNav from "./root-auth-nav";

import Link from "next/link";

import React from "react";

const RootNavbar = () => {
  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap">
          <Logo />
          .taskify
        </Link>
      </NavbarBrand>
      <AuthNav />
    </Navbar>
  )
}

export default RootNavbar;