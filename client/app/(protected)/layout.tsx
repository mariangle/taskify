import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import ListService from "@/services/list-service";
import LabelService from "@/services/label-service";
import TaskService from "@/services/task-service";

interface PageProps {
    children: React.ReactNode,
    modal: React.ReactNode,
}

// TODO: Check if user is logged in through API

export default async function Layout(props: PageProps) {
    const tasks = await TaskService.getTasks()
    const lists = await ListService.getLists()
    const labels = await LabelService.getLabels()

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex flex-col w-[225px]">
                <Sidebar lists={lists}/>
            </div>
            <div className="flex flex-col flex-1">
                <Navbar tasks={tasks} labels={labels}/>
                <div className="overflow-y-auto h-full p-4">
                    {props.children}
                    {props.modal}
                </div>
            </div>
        </div>
    );
}
