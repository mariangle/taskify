import Navbar from "./components/navbar"

interface PageProps {
    children: React.ReactNode
}

export default function Layout({
    children
} : PageProps){
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}