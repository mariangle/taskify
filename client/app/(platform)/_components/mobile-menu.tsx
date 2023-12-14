import { cn } from "@/lib/utils";
import Link from "next/link";

import { dashboardLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <div>
        {dashboardLinks.map((link) => (
        <div key={link.label}>
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
        </div>
        ))}
    </div>
  )
}

export default MobileMenu