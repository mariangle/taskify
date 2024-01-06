/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { api } from '@/lib/api';
import { Label, LabelEntry } from '@/types';

export const LabelService = {
  createLabel: async (label: LabelEntry): Promise<Label> => {
    try {
      const response: AxiosResponse = await api.post('/labels', label);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLabels: async (): Promise<Label[] | []> => {
    try {
      const response: AxiosResponse = await api.get(`/labels`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLabel: async (labelId: string): Promise<Label> => {
    try {
      const response: AxiosResponse = await api.get(`/labels/${labelId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateLabel: async (
    labelId: string,
    updatedLabel: LabelEntry,
  ): Promise<Label> => {
    try {
      const response: AxiosResponse = await api.patch(
        `/labels/${labelId}`,
        updatedLabel,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteLabel: async (labelId: string): Promise<Label> => {
    try {
      const response: AxiosResponse = await api.delete(`/labels/${labelId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
