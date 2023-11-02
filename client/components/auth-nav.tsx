import { Button, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"

const AuthNav = () => {
  return (
    <NavbarContent justify="end">
    <NavbarItem className="hidden lg:flex">
      <Link href="/login" >
        <Button variant="flat">
          Login
        </Button>
      </Link>
    </NavbarItem>
    <NavbarItem>
      <Link href="/register" >
        <Button color="primary" variant="flat">
          Sign Up
        </Button>
      </Link>
    </NavbarItem>
  </NavbarContent>
  )
}

export default AuthNav
