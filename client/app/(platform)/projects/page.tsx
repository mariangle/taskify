import ProjectModal from "@/components/modals/project-modal";
import ProjectService from "@/services/project-service";

import Link from "next/link";

export default async function ProjectsPage(){
    const projects = await ProjectService.getProjects();
    return (
        <ul>
            <div className="px-6 text-sm">
                <div className="flex-between py-3 font-extrabold">
                <h4>My Projects</h4>
                <ProjectModal />
                </div>
                <div className="space-y-2 my-2 font-medium text-sm">
                    {projects && projects.map((project) => (
                        <div key={project.id} className="flex-gap">
                            <Link href={`/projects/${project.id}`}> 
                                {project.name}
                            </Link>
                            <ProjectModal project={project}/>
                        </div>
                    ))}
                </div>
            </div>
        </ul>
    )
}