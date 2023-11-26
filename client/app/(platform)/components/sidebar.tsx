"use client"

import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

import React from "react";
import { ListResponse } from "@/types";

import ListModal from "@/components/modals/list-modal";
import ListItem from "./list-header";

interface SidebarProps {
  lists: ListResponse[] | [],
}

const Sidebar = ({
  lists,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="h-full border-r">
      <div className="h-14 p-4 font-extrabold">
        <span className="bg-gradient-to-r from-primary/25 pl-1">.tas</span>
        kify
      </div>
      <ul>
        {dashboardLinks.map((link) => (
          <li key={link.label} className="mb-1">
            <Link 
              href={link.href} 
              className={cn(
                pathname.includes(link.href) 
                ? 'font-semibold bg-gradient-to-l from-primary/20 border-r-3 border-primary' 
                : 'font-medium',
                "w-full block px-4 py-2 text-sm"
              )}
              >
                {link.label}
              </Link>
          </li>
        ))}
        <div className="px-4 text-sm">
            <div className="flex-between py-3 font-extrabold">
              <h4>Lists</h4>
              <ListModal list={null}/>
            </div>
            <div className="space-y-2 my-2 font-medium text-sm">
                <ListItem />
                {lists && lists.map((list) => <ListItem list={list} key={list.id}/>)}
            </div>
        </div>
      </ul>
    </aside>
  )
}

export default Sidebar;