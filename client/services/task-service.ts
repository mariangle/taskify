import { api } from '@/lib/api'
import { AxiosResponse } from 'axios'
import { TaskEntry, TaskResponse } from '@/types'
import { requestOptions } from '@/lib/util'
import { agent } from '@/lib/agent'
import { SearchParamsOptions, queryParamsMapping } from '@/lib/util/filter'

interface TaskLabelRelation {
  labelId: string
  taskId: string
}

const TaskService = {
  createTask: async (task: TaskEntry) => {
    try {
      const response: AxiosResponse<TaskResponse> = await api.post('/tasks', task, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
  // Define default value for the entire argument using Partial
  getTasks: async (params: Partial<SearchParamsOptions> = {}): Promise<TaskResponse[]> => {
    try {
      const queryParams: { [key: string]: string | boolean } = {}

      // Loop through each [param, queryParam] pair in the queryParamsMapping object
      for (const [param, queryParam] of Object.entries(queryParamsMapping)) {
        // Extract the value of the current parameter from the params object
        const paramValue = params[param as keyof SearchParamsOptions]

        // Check if the extracted parameter value is not undefined
        if (paramValue !== undefined) {
          // Assign the non-undefined parameter value to the corresponding property in the queryParams object
          queryParams[queryParam] = paramValue
        }
      }

      const response: AxiosResponse = await api.get('/tasks', {
        httpsAgent: agent,
        params: queryParams,
      })

      return response.data
    } catch (err) {
      throw err
    }
  },
  getTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.get(`/tasks/${taskId}`, {
        httpsAgent: agent,
      })
      return response.data
    } catch (err) {
      throw err
    }
  },
  updateTask: async (taskId: string, updatedTask: TaskEntry): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/tasks/${taskId}`, updatedTask, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
  deleteTask: async (taskId: string): Promise<TaskResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/tasks/${taskId}`, requestOptions)
      return response.data
    } catch (err: any) {
      throw err
    }
  },
  addLabel: async ({ taskId, labelId }: TaskLabelRelation): Promise<void> => {
    try {
      const response: AxiosResponse = await api.post(`/tasks/${taskId}/labels/${labelId}`, null, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
  removeLabel: async ({ labelId, taskId }: TaskLabelRelation): Promise<void> => {
    try {
      const response: AxiosResponse = await api.delete(`/tasks/${taskId}/labels/${labelId}`, requestOptions)
      return response.data
    } catch (err) {
      throw err
    }
  },
}

export default TaskService
