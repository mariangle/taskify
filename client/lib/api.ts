import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define a custom type for your API response
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

// Define the type of your API
export type Api = AxiosInstance & {
  get<T = any, R = ApiResponse<T>>(url: string, config?: any): Promise<R>;
  post<T = any, R = ApiResponse<T>>(url: string, data?: any, config?: any): Promise<R>;
  // Add other HTTP methods if needed
};

// Create an instance of Axios with your custom type
export const api: Api = axios.create({
  baseURL: "https://localhost:7232/api",
});