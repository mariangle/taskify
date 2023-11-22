import {
  NavbarMenu,
  NavbarMenuItem,
  cn
} from "@nextui-org/react";
import Link from "next/link";

import { dashboardLinks } from "@/helpers/constants";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <NavbarMenu>
        {dashboardLinks.map((link) => (
        <NavbarMenuItem key={link.label}>
        <Link 
        key={link.label}
            href={link.href} 
            className={cn(
            pathname.includes(link.href) ? 'bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white font-semibold' : 'font-medium text-default-600',
            "w-full block px-4 py-2 rounded-xl"
            )}
            >
            {link.label}
            </Link>
        </NavbarMenuItem>
        ))}
    </NavbarMenu>
  )
}

export default MobileMenu