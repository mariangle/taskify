import DashboardSidebar from "./components/dashboard-sidebar";
import DashboardNavbar from "./components/dashboard-navbar";
import Breadcrumbs from "./components/breadcrumbs";

interface PageProps {
    children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
    return (
        <div className="flex h-screen">
            <div className="hidden md:flex flex-col w-1/6 min-w-[250px]">
                <DashboardSidebar />
            </div>
            <div className="flex flex-col flex-1">
                <DashboardNavbar />
                <div className="p-4 overflow-y-auto">
                    <Breadcrumbs />
                    {children}
                </div>
            </div>
        </div>
    );
}
