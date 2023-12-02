"use client"

import UserMenu from "./user-nav";
import PromptModal from "@/components/modals/prompt-modal";
import LabelSwitcher from "@/components/label-filter";
import { LabelResponse, TaskResponse } from "@/types";
import SearchMenu from "@/components/search-menu";

interface NavbarProps {
  labels: LabelResponse[] | [],
  tasks: TaskResponse[] | []
}
const Navbar = ({
  labels,
  tasks
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-zinc-950/50">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex-gap">
          <LabelSwitcher labels={labels}/>
          <SearchMenu tasks={tasks}/>
        </div>
        <div className="flex-gap">
          <PromptModal />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Navbar;