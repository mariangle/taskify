import * as React from "react"

import ProjectService from "@/services/project-service";

import { revalidate} from "@/lib/_actions/revalidate-path";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectSchemaType } from "@/lib/validations/project";
import { handleError } from "@/util";
import { ProjectResponse } from "@/types";

export const useProjectForm = (initialData?: ProjectResponse, close?: () => void) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const form = useForm<ProjectSchemaType>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: initialData, 
    })

    const submit = async (data: ProjectSchemaType) => {
        try {
          setIsLoading(true);
      
          if (initialData) {
            await ProjectService.updateProject(initialData.id, { ...initialData, ...data });
          } else {
            await ProjectService.createProject(data);
          }
          close && close()
          revalidate({ path: '/projects'})
        } catch (e) {
          handleError(e);
        } finally {
          setIsLoading(false);
        }
      };

    const deleteProject = async (projectId: string) => {
        try {
            setIsLoading(true);
            await ProjectService.deleteProject(projectId)
            close && close()
            revalidate({ path: '/projects'})
          } catch (e){
            handleError(e)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        form,
        submit,
        deleteProject
    }
}