import RootNavbar from '@/components/navigation/root-navbar'

interface PageProps {
    children: React.ReactNode
}

export default function Layout({
    children
} : PageProps){
    return (
        <div>
            <RootNavbar />
            {children}
        </div>
    )
}