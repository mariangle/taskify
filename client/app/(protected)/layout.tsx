import DashboardSidebar from "@/components/navigation/dashboard-sidebar";
import DashboardNavbar from "@/components/navigation/dashboard-navbar";
import Breadcrumbs from "@/components/navigation/breadcrumbs-nav";
import ListService from "@/helpers/services/list-service";

interface PageProps {
    children: React.ReactNode,
    modal: React.ReactNode
}

// TODO: Check if user is logged in through API

export default async function Layout(props: PageProps) {
    const lists = await ListService.getLists()
    return (
        <div className="flex h-screen">
            <div className="hidden md:flex flex-col w-1/6 min-w-[250px]">
                <DashboardSidebar lists={lists}/>
            </div>
            <div className="flex flex-col flex-1">
                <DashboardNavbar />
                <div className="p-4 overflow-y-auto">
                    <Breadcrumbs />
                    {props.children}
                    {props.modal}
                </div>
            </div>
        </div>
    );
}
