import DashboardNavbar from "./components/dashboard-navbar"

interface PageProps {
    children: React.ReactNode
}

export default function Layout({
    children
} : PageProps){
    return (
        <div>
            <DashboardNavbar />
            {children}
        </div>
    )
}