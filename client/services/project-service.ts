import axios, { AxiosResponse } from 'axios';
import { ProjectEntry, ProjectResponse } from '@/types';
import { requestOptions } from '@/util';
import { agent } from '@/lib/agent';

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const ProjectService = {
  createProject: async (project: ProjectEntry): Promise<ProjectResponse> => {
    try {
      const response: AxiosResponse = await api.post('/projects', project, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getProjects: async (): Promise<ProjectResponse[] | []> => {
    try {
      const response: AxiosResponse = await api.get(`/projects`, {
        httpsAgent: agent, 
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching projects", error)
      return [];
    }
  },

  getProject: async (projectId: string): Promise<ProjectResponse | null> => {
    try {
      const response: AxiosResponse = await api.get(`/projects/${projectId}`, {
        httpsAgent: agent, 
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },

  updateProject:async (projectId: string, updatedproject: ProjectResponse): Promise<ProjectResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/projects/${projectId}`, updatedproject, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteProject: async (projectId: string): Promise<ProjectResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/projects/${projectId}`, requestOptions);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

export default ProjectService;
