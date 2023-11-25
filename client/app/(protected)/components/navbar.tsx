"use client"

import {
  Navbar as MainNavbar, 
  NavbarMenuToggle as MobileBurger,
} from "@nextui-org/react";

import React from "react";
import UserMenu from "./user-menu";
import MobileMenu from "./mobile-menu";
import SearchModal from "@/components/modals/search.modal";
import PromptModal from "@/components/modals/prompt-modal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <MainNavbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="border-b">
      <div className="z-10 flex items-center gap-4">      
        <MobileBurger
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden z-10 p-2"
        />
        <div className="flex-center">
          <SearchModal />      
        </div>
      </div>
      <div className="flex-gap">
        <PromptModal />
        <UserMenu />
      </div>
      <MobileMenu />
    </MainNavbar>
  )
}

export default Navbar;