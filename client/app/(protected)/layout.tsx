import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

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
            <div className="hidden md:flex flex-col w-[225px]">
                <Sidebar lists={lists}/>
            </div>
            <div className="flex flex-col gap-4 flex-1 lg:gap-6">
                <Navbar />
                <div className="overflow-y-auto">
                    {props.children}
                    {props.modal}
                </div>
            </div>
        </div>
    );
}
