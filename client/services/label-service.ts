import { AxiosResponse } from 'axios'
import { api } from '@/lib/api'
import { LabelEntry, LabelResponse } from '@/types'
import { requestOptions } from '@/lib/util'
import { agent } from '@/lib/agent'

export const LabelService = {
  createLabel: async (label: LabelEntry): Promise<LabelResponse> => {
    try {
      const response: AxiosResponse = await api.post('/labels', label, requestOptions)
      return response.data
    } catch (error) {
      throw error
    }
  },
  getLabels: async (): Promise<LabelResponse[] | []> => {
    try {
      const response: AxiosResponse = await api.get(`/labels`, {
        httpsAgent: agent,
      })
      return response.data
    } catch (error) {
      console.log('Error fetching labels', error)
      return []
    }
  },
  getLabel: async (labelId: string): Promise<LabelResponse | null> => {
    try {
      const response: AxiosResponse = await api.get(`/labels/${labelId}`, {
        httpsAgent: agent,
      })
      return response.data
    } catch (error) {
      return null
    }
  },
  updateLabel: async (labelId: string, updatedLabel: LabelEntry): Promise<LabelResponse> => {
    try {
      const response: AxiosResponse = await api.put(`/labels/${labelId}`, updatedLabel, requestOptions)
      return response.data
    } catch (error) {
      throw error
    }
  },

  deleteLabel: async (labelId: string): Promise<LabelResponse> => {
    try {
      const response: AxiosResponse = await api.delete(`/labels/${labelId}`, requestOptions)
      return response.data
    } catch (error: any) {
      throw error
    }
  },
}
