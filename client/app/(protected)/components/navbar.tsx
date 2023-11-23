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
import ThemeSwitcher from "@/components/theme-switcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <MainNavbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" className="bg-white border-none rounded-xl dark:bg-zinc-900">
      <div className="z-10 flex items-center gap-4">      
        <MobileBurger
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden z-10 p-2"
        />
        <div className="flex-center">
          <SearchModal />      
          <ThemeSwitcher />  
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