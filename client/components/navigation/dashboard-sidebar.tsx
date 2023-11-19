"use client"

import {
  Button
} from "@nextui-org/react";

import LogoutButton from "../../app/(protected)/components/logout-button";
import { usePathname } from "next/navigation";

import Link from "next/link";

import * as React from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    {label: 'Dashboard', href: '/dashboard', active: pathname === "/dashboard"},
    {label: 'Tasks', href: '/tasks', active: pathname === "/tasks"},
    {label: 'Calendar', href: '/calendar', active: pathname === "/calendar"},
  ]

  return (
    <div className="border-r dark:border-zinc-800 h-full p-4">
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