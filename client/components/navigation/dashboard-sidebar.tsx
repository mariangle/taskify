"use client"

import LogoutButton from "../logout-button";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/helpers/constants";
import { cn } from "@nextui-org/react";
import Link from "next/link";

import React from "react";
import { ListResponse } from "@/types";

import ListModal from "@/components/modals/list-modal";
import ListItem from "@/components/ui/list-item";

interface SidebarProps {
  lists: ListResponse[],
}

const DashboardSidebar = ({
  lists
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="border-r dark:border-zinc-800 h-full p-4">
      <ul>
        {dashboardLinks.map((link) => (
          <li key={link.label} className="mb-1">
            <Link 
              href={link.href} 
              className={cn(
                pathname.includes(link.href) ? 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white font-semibold' : 'font-medium text-default-600',
                "w-full block px-4 py-2 rounded-xl"
              )}
              >
                {link.label}
              </Link>
          </li>
        ))}
        <div className="md:spl-4">
            <div className="flex-between">
              <h4>My Lists</h4>
              <ListModal list={null}/>
            </div>
            <div className="space-y-2 my-2">
                {lists && lists.map((list) => <ListItem list={list} key={list.id}/>)}
            </div>
        </div>
        <LogoutButton />
      </ul>
    </div>
  )
}

export default DashboardSidebar;