"use client"

import {
  Button
} from "@nextui-org/react";

import LogoutButton from "../../app/(protected)/components/logout-button";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/helpers/constants";
import Link from "next/link";

import * as React from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="border-r dark:border-zinc-800 h-full p-4">
      <ul>
        {dashboardLinks.map((link) => (
          <li key={link.label} className="mb-1">
            <Link href={link.href}>
                <Button 
                  variant={pathname.includes(link.href) ? 'flat' : 'light'}
                  fullWidth
                  className="flex justify-start"
                >
                  {link.label}
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