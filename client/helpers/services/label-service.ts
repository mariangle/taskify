import axios, { AxiosResponse } from 'axios';
import { LabelEntry, LabelResponse } from '@/types';
import { requestOptions } from '@/helpers/util';
import https from "https"

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const LabelService = {
  createLabel: async (label: LabelEntry): Promise<LabelResponse> => {
    try {
      const response: AxiosResponse = await api.post('/labels', label, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLabels: async (): Promise<LabelResponse[] | []> => {
    try {
      const response: AxiosResponse = await api.get(`/labels`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }), 
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching labels", error)
      return [];
    }
  },
  getLabel: async (labelId: string): Promise<LabelResponse | null> => {
    try {
      const response: AxiosResponse = await api.get(`/labels/${labelId}`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // ! only use in dev
        }), 
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },
  getTaskLabels: async ({ taskId } : { taskId: string}): Promise<LabelResponse[] | null> => {
    try {
      const response: AxiosResponse = await api.get(`/tasks/${taskId}/labels`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // ! only use in dev
        }), 
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return null;
    }
  },  
  updateLabel:async (labelId: string, updatedLabel: LabelEntry): Promise<LabelResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/labels/${labelId}`, updatedLabel, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteLabel: async (labelId: string): Promise<LabelResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/labels/${labelId}`, requestOptions);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

export default LabelService;
