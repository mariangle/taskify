import axios, { AxiosResponse } from 'axios';
import { TaskEntry, TaskResponse } from '@/types/types';
import { requestOptions } from '@/helpers/util';
import https from "https"

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const createTask = async (task: TaskEntry): Promise<TaskResponse> => {
  try {
    const response: AxiosResponse = await api.post('/tasks', task, requestOptions);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTasks = async (): Promise<TaskResponse[] | []> => {
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
};

const getTask = async (taskId: string): Promise<TaskResponse | null> => {
  try {
    const response: AxiosResponse = await api.get(`/tasks/${taskId}`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }), 
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

const updateTask = async (taskId: string, updatedTask: TaskEntry): Promise<TaskResponse> => {
  try {
    const response: AxiosResponse = await api.put(`/tasks/${taskId}`, updatedTask, requestOptions);
    console.log(updatedTask)
    alert('')
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId: string): Promise<TaskResponse> => {
  try {
    const response: AxiosResponse = await api.delete(`/tasks/${taskId}`, requestOptions);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const TaskService = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask
};

export default TaskService;
