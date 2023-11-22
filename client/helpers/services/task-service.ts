import axios, { AxiosResponse } from 'axios';
import { TaskEntry, TaskResponse } from '@/types';
import { requestOptions } from '@/helpers/util';
import https from "https"

interface ParamsOptions {
  listId?: string,
  unsorted?: boolean,
  upcoming?: boolean,
  overdue?: boolean,
}

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
  // Define default value for the entire argument using Partial. cool.
  getTasks: async (params: Partial<ParamsOptions> = {}): Promise<TaskResponse[] | []> => {
    try {
      const queryParams: { [key: string]: string | boolean } = {};
  
      if (params.listId) {
        queryParams.listId = params.listId;
      }

      if (params.unsorted !== undefined) {
        queryParams.unsorted = params.unsorted;
      }

      if (params.upcoming !== undefined) {
        queryParams.upcoming = params.upcoming;
      }

      if (params.overdue !== undefined) {
        queryParams.overdue = params.overdue;
      }
  
      const response: AxiosResponse = await api.get('/tasks', {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
        params: queryParams, 
      });
  
      return response.data; 
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
