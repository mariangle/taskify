import Link from "next/link";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { authenticate } from "@/lib/_actions/authenticate";

export default function Navbar(){

  return (
    <div>
      <div>
        <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap">
          <Icons.logo className="w-6 h-6" />
          Taskify
        </Link>
      </div>
      <AuthNavigation />
    </div>
  )
}

function AuthNavigation (){
  return (
      <div>
        {false ? (
          <div>
            <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
              Dashboard
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden sm:flex">
              <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                Login
              </Link>
            </div>
            <div>
              <Link href="/register" className={buttonVariants({ variant: "default" })}>
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
  )
}