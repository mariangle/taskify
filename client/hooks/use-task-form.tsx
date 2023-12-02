import * as React from 'react'

import { LabelResponse, ListResponse, ProjectResponse, TaskResponse } from '@/types';

import ListService from '@/services/list-service';
import LabelService from '@/services/label-service';
import TaskService from '@/services/task-service';
import { handleError } from '@/util';
import toast from 'react-hot-toast';

import { revalidate } from "@/lib/_actions/revalidate-path";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskSchema, TaskSchemaType } from '@/lib/validations/task';
import ProjectService from '@/services/project-service';

export const useTaskForm = (initialData?: TaskResponse, close?: () => void) => {
    const [labels, setLabels] = React.useState<LabelResponse[]>([])
    const [lists, setLists] = React.useState<ListResponse[]>([])
    const [projects, setProjects] = React.useState<ProjectResponse[]>([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen((prev) => !prev)



    React.useEffect(() => {
        const fetchData = async () => {
            const lists = await ListService.getLists();
            const labels = await LabelService.getLabels(); 
            const projects = await ProjectService.getProjects(); 
            setLists(lists)
            setLabels(labels)    
            setProjects(projects)           
       
        }

        fetchData();
    }, [])

    const submit = () => {

    }

    const deleteTask = async (taskId: string) => {  
        try {
          await TaskService.deleteTask(taskId);
          toast.success('Task deleted');
        } catch (e) {
          handleError(e);
        }
      };

    return {
        isOpen, 
        toggle, 
        lists, 
        labels, 
        projects,
        deleteTask
    }
}