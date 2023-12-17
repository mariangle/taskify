import { api } from '@/lib/api'
import { AxiosResponse } from 'axios'
import { TaskEntry, TaskResponse } from '@/types'
import { requestOptions } from '@/util'
import { agent } from '@/lib/agent'

export interface SearchParamsOptions {
  listId?: string
  labelId?: string
  projectId?: string
  unsorted?: boolean
  upcoming?: boolean
  overdue?: boolean
  incomplete?: boolean
}

interface TaskLabelRelation {
  labelId: string
  taskId: string
}

const TaskService = {
  createTask: async (task: TaskEntry) => {
    try {
      const response: AxiosResponse<TaskResponse> = await api.post('/tasks', task, requestOptions)
      return response.data
    } catch (error) {
      throw error
    }
  },
  // Define default value for the entire argument using Partial
  getTasks: async (params: Partial<SearchParamsOptions> = {}): Promise<TaskResponse[] | []> => {
    try {
      const queryParams: { [key: string]: string | boolean } = {}

      if (params.listId) {
        queryParams.listId = params.listId
      }

      if (params.labelId) {
        queryParams.labelId = params.labelId
      }

      if (params.projectId) {
        queryParams.projectId = params.projectId
      }

      if (params.unsorted !== undefined) {
        queryParams.unsorted = params.unsorted
      }

      if (params.upcoming !== undefined) {
        queryParams.upcoming = params.upcoming
      }

      if (params.overdue !== undefined) {
        queryParams.overdue = params.overdue
      }

      if (params.incomplete !== undefined) {
        queryParams.incomplete = params.incomplete
      }

      const response: AxiosResponse = await api.get('/tasks', {
        httpsAgent: agent,
        params: queryParams,
      })

      return response.data
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  },
  getTask: async (taskId: string): Promise<TaskResponse | null> => {
    try {
      const response: AxiosResponse = await api.get(`/tasks/${taskId}`, {
        httpsAgent: agent,
      })
      return response.data
    } catch (error) {
      return null
    }
  },
  updateTask: async (taskId: string, updatedTask: TaskEntry): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/tasks/${taskId}`, updatedTask, requestOptions)
      return response.data
    } catch (error) {
      throw error
    }
  },
  deleteTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/tasks/${taskId}`, requestOptions)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
  addLabel: async ({ taskId, labelId }: TaskLabelRelation): Promise<void> => {
    const response: AxiosResponse = await api.post(`/tasks/${taskId}/labels/${labelId}`, null, requestOptions)
    return response.data
  },
  removeLabel: async ({ labelId, taskId }: TaskLabelRelation): Promise<void> => {
    try {
      const response: AxiosResponse = await api.delete(`/tasks/${taskId}/labels/${labelId}`, requestOptions)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default TaskService
