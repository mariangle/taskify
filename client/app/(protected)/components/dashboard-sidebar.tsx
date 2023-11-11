"use client"

import {
  Button
} from "@nextui-org/react";

import LogoutButton from "./logout-button";
import { usePathname } from "next/navigation";

import Link from "next/link";

import * as React from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    {label: 'Dashboard', href: '/dashboard', active: pathname === "/dashboard"},
    {label: 'Events', href: '/dashboard/events', active: pathname === "/dashboard/events"},
    {label: 'Settings', href: '/dashboard/settings', active: pathname === "/dashboard/settings"},
  ]

  return (
    <div className="border-r dark:border-zinc-800 h-full p-4">
      <div className="w-full flex flex-col items-center justify-center h-1/6">
        <div className="bg-red-100 rounded-full h-12 w-12"></div>
        <div>Lorem, ipsum.</div>
        <div>Lorem, ipsum.</div>
      </div>
      <ul>
        {navLinks.map(({label, href, active}) => (
          <li key={label} className="mb-1">
            <Link href={href}>
                <Button 
                  variant={active ? 'flat' : 'light'}
                  fullWidth
                  className="flex justify-start"
                >
                  {label}
                </Button>
              </Link>
          </li>
        ))}
        <LogoutButton />
      </ul>
    </div>
  )
}

export default DashboardSidebar;