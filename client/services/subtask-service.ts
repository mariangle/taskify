import axios, { AxiosResponse } from 'axios'
import { SubtaskEntry } from '@/types'
import { requestOptions } from '@/util'

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
})

const SubtaskService = {
  createSubtask: async (taskId: string, subtask: SubtaskEntry): Promise<void> => {
    try {
      const response: AxiosResponse = await api.post(`/tasks/${taskId}/subtask`, subtask, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
  updateSubtask: async (subtaskId: string, subtask: SubtaskEntry): Promise<void> => {
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

export default SubtaskService
