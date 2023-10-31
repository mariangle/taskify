import { Button, NavbarContent, Link, NavbarItem } from "@nextui-org/react"

const AuthNav = () => {

    const onLogin = () => {
    }

    const onSignOut = () => {
    }

  return (
    <NavbarContent justify="end">
    <NavbarItem className="hidden lg:flex">
      <Button onClick={onSignOut}>Sign Out</Button>
    </NavbarItem>
    <NavbarItem>
      <Button as={Link} color="primary" variant="flat" onClick={onLogin}>
        Login
      </Button>
    </NavbarItem>
  </NavbarContent>
  )
}

export default AuthNav
