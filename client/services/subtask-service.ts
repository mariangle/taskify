/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { api } from '@/lib/api';
import { Subtask, SubtaskEntry } from '@/types';

export const SubtaskService = {
  createSubtask: async (
    taskId: string,
    subtask: SubtaskEntry,
  ): Promise<void> => {
    try {
      const response: AxiosResponse = await api.post(
        `/tasks/${taskId}/subtasks`,
        subtask,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  updateSubtask: async (
    taskId: string,
    subtaskId: string,
    subtask: Subtask,
  ): Promise<void> => {
    try {
      const response: AxiosResponse = await api.patch(
        `/tasks/${taskId}/subtasks/${subtaskId}`,
        subtask,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
  deleteSubtask: async (taskId: string, subtaskId: string): Promise<void> => {
    try {
      const response: AxiosResponse = await api.delete(
        `/tasks/${taskId}/subtasks/${subtaskId}`,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
};
