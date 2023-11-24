"use client"

import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/helpers/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

import React from "react";
import { ListResponse } from "@/types";

import ListModal from "@/components/modals/list-modal";
import ListItem from "./list-header";

interface SidebarProps {
  lists: ListResponse[],
}

const Sidebar = ({
  lists
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="h-full py-4 border-r">
      <ul>
        {dashboardLinks.map((link) => (
          <li key={link.label} className="mb-1">
            <Link 
              href={link.href} 
              className={cn(
                pathname.includes(link.href) 
                ? 'text-black dark:text-white font-semibold bg-gradient-to-l from-sky-500/20 border-r border-red-500' 
                : 'font-medium text-default-500',
                "w-full block px-4 py-3"
              )}
              >
                {link.label}
              </Link>
          </li>
        ))}
        <div className="px-4">
            <div className="flex-between">
              <h4>Lists</h4>
              <ListModal list={null}/>
            </div>
            <div className="space-y-2 my-2 text-default-500">
                <ListItem />
                {lists && lists.map((list) => <ListItem list={list} key={list.id}/>)}
            </div>
        </div>
      </ul>
    </aside>
  )
}

export default Sidebar;