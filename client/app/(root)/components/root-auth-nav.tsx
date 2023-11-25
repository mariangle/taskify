import { Button, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import { isTokenValid } from "@/services/token-service";

// TODO: Create an API endpoint to validate user
const AuthNav = () => {
  const isLogged = isTokenValid();

  return (
    <NavbarContent justify="end">
      {isLogged ? (
        <NavbarItem>
          <Link href="/dashboard">
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

