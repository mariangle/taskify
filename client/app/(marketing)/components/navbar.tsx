import {
  Navbar as NextNavbar, 
  NavbarBrand,   
  NavbarContent,
  NavbarItem
} from "@nextui-org/react";

import Link from "next/link";

import { isTokenValid } from "@/services/token-service";
import { Icons } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";


export default function Navbar(){
  return (
    <NextNavbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap">
          <Icons.logo className="w-6 h-6" />
          Taskify
        </Link>
      </NavbarBrand>
      <AuthNavigation />
    </NextNavbar>
  )
}

function AuthNavigation (){
  const isLogged = isTokenValid();
  
  return (
      <NavbarContent justify="end">
        {isLogged ? (
          <NavbarItem>
            <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
              Dashboard
            </Link>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/register" className={buttonVariants({ variant: "default" })}>
                Sign Up
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
  )
}