import axios, { AxiosResponse } from 'axios';
import { TaskEntry, TaskResponse } from '@/types';
import { requestOptions } from '@/helpers/util';
import https from "https"

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const TaskService = {
  createTask: async (task: TaskEntry): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.post('/tasks', task, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTasks: async (): Promise<TaskResponse[] | []> => {
    try {
      const response: AxiosResponse = await api.get(`/tasks`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }), 
      });
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getTask: async (taskId: string): Promise<TaskResponse | null> => {
    try {
      const response: AxiosResponse = await api.get(`/tasks/${taskId}`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // ! only use in dev
        }), 
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },

  updateTask:async (taskId: string, updatedTask: TaskEntry): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/tasks/${taskId}`, updatedTask, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/tasks/${taskId}`, requestOptions);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

export default TaskService;
