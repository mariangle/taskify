import DashboardSidebar from "@/components/navigation/dashboard-sidebar";
import DashboardNavbar from "@/components/navigation/dashboard-navbar";
import Breadcrumbs from "@/components/navigation/breadcrumbs-nav";

interface PageProps {
    children: React.ReactNode;
}

// TODO: check if user is logged

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
