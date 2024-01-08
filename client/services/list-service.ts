/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { List } from '@/types';
import { api } from '@/lib/api';

export const ListService = {
  createList: async (list: any): Promise<List> => {
    try {
      const response: AxiosResponse = await api.post('/lists', list);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLists: async (): Promise<List[]> => {
    try {
      const response = await api.get('/lists');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getList: async (listId: string): Promise<List | null> => {
    try {
      const response: AxiosResponse = await api.get(`/lists/${listId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateList: async (listId: string, updatedList: any): Promise<List> => {
    try {
      const response: AxiosResponse = await api.patch(
        `/lists/${listId}`,
        updatedList,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteList: async (listId: string): Promise<List> => {
    try {
      const response: AxiosResponse = await api.delete(`/lists/${listId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
