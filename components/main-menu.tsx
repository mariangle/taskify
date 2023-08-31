"use client"

import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { NAVLINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MainMenu = () => {
    const pathname = usePathname();

  return (
    <nav>
        <ul className="flex gap-2 items-center">
            <Logo />
            {NAVLINKS.map(({label, href}) => (
                <li
                    key={label}
                    className={cn(
                        "px-2 py-3 font-medium",
                        href === pathname ? "border-b-2 border-[#ee7203] text-[#ee7203]" : ""
                    )}
                >
                    <Link href={href}>{label}</Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

const Logo = () => <Image src={"https://cdn.itslearning.com/v3.141.1.13518/images/logo-badge.svg"} alt="Logo" width={32} height={32} className="p-1"/>

export default MainMenu;

