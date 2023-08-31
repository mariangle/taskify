import Container from "@/components/ui/width-container";
import MainMenu from "@/components/main-menu";
import PersonalMenu from "@/components/personal-menu";

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full border-b px-2">
        <Container className="flex justify-between items-center">
            <MainMenu />
            <PersonalMenu />
        </Container>
    </header>
  )
}

export default Navbar;