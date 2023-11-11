import { Button, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import { isTokenValid } from "@/helpers/actions/get-token";

const AuthNav = () => {
  const isLogged = isTokenValid();

  return (
    <NavbarContent justify="end">
      {isLogged ? (
        <NavbarItem>
          <Link href="/schedule">
            <Button color="primary" variant="flat">
              Dashboard
            </Button>
          </Link>
        </NavbarItem>
      ) : (
        <>
          <NavbarItem className="hidden sm:flex">
            <Link href="/login">
              <Button variant="flat">Login</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/register">
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </Link>
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  );
};

export default AuthNav;

