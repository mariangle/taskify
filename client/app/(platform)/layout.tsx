import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

import ListService from "@/services/list-service";
import LabelService from "@/services/label-service";
import TaskService from "@/services/task-service";
import ProjectService from "@/services/project-service";

import { authenticate } from "@/lib/_actions/authenticate";
import { redirect } from "next/navigation";

interface PageProps {
    children: React.ReactNode,
    modal: React.ReactNode,
}

export default async function Layout(props: PageProps) {
    const isAuthenticated  = await authenticate();

    if (!isAuthenticated) redirect('/login')

    const [tasks, lists, labels, projects] = await Promise.all([
        TaskService.getTasks(),
        ListService.getLists(),
        LabelService.getLabels(),
        ProjectService.getProjects()
      ]);
    
    return (
        <div className="flex h-screen overflow-y-hidden">
            <div className="hidden md:flex flex-col w-[175px]">
                <Sidebar lists={lists} projects={projects}/>
            </div>
            <div className="flex flex-col flex-1 bg-zinc-100 dark:bg-background overflow-y-hidden">
                <Navbar tasks={tasks} labels={labels}/>
                <div className="overflow-y-auto h-full p-4">
                    {props.children}
                    {props.modal}
                </div>
            </div>
        </div>
    );
}
