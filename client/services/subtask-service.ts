import { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { SubtaskEntry, SubtaskResponse } from '@/types'
import { requestOptions } from '@/lib/util'

export const SubtaskService = {
  createSubtask: async (taskId: string, subtask: SubtaskEntry): Promise<void> => {
    try {
      const response: AxiosResponse = await api.post(`/tasks/${taskId}/subtask`, subtask, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
  updateSubtask: async (subtaskId: string, subtask: SubtaskResponse): Promise<void> => {
    try {
      const response: AxiosResponse = await api.put(`/subtasks/${subtaskId}`, subtask, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
  deleteSubtask: async (subtaskId: string): Promise<void> => {
    try {
      const response: AxiosResponse = await api.delete(`/subtasks/${subtaskId}`, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
}
