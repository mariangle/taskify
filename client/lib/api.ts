import axios, { AxiosInstance } from 'axios'

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
  config: any
}

export type Api = AxiosInstance & {
  get<T = any, R = ApiResponse<T>>(url: string, config?: any): Promise<R>
  post<T = any, R = ApiResponse<T>>(url: string, data?: any, config?: any): Promise<R>
}

export const api: Api = axios.create({
  baseURL: 'https://localhost:7232/api',
})
