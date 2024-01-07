import axios, { AxiosInstance } from 'axios';
import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { useSWR };

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Example usage in a component
// const { data, error } = useApiSWR('/lists');
