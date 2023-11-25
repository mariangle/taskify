import axios, { AxiosResponse } from 'axios';
import { requestOptions } from '@/helpers/util';

interface TaskLabelRelation {
    labelId: string,
    taskId: string
}

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const TaskLabelService = {
    associateTaskLabel: async ({ taskId, labelId }: TaskLabelRelation): Promise<any> => {
      const response: AxiosResponse = await api.post(`/tasks/${taskId}/labels/${labelId}`, null, requestOptions);
      return response.data;
    },
    disassociateTaskLabel: async ({ labelId, taskId }: TaskLabelRelation): Promise<any> => {
      try {
        const response: AxiosResponse = await api.delete(`/tasks/${taskId}/labels/${labelId}`, requestOptions);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  };

export default TaskLabelService;
