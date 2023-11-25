import axios, { AxiosResponse } from 'axios';
import { ListEntry, ListResponse } from '@/types';
import { requestOptions } from '@/util';
import https from "https"

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const ListService = {
  createList: async (list: ListEntry): Promise<ListResponse> => {
    try {
      const response: AxiosResponse = await api.post('/lists', list, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLists: async (): Promise<ListResponse[] | []> => {
    try {
      const response: AxiosResponse = await api.get(`/lists`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }), 
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching lists", error)
      return [];
    }
  },

  getList: async (listId: string): Promise<ListResponse | null> => {
    try {
      const response: AxiosResponse = await api.get(`/lists/${listId}`, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // ! only use in dev
        }), 
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },

  updateList:async (listId: string, updatedList: ListEntry): Promise<ListResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/lists/${listId}`, updatedList, requestOptions);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteList: async (listId: string): Promise<ListResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/lists/${listId}`, requestOptions);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

export default ListService;
