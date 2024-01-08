import axios, { AxiosInstance } from 'axios';

export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return res.json();
  });

export const LISTS_KEY = '/api/lists';
export const LABELS_KEY = '/api/labels';

export const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.PUBLIC_URL
      : process.env.DEV_URL,
});
