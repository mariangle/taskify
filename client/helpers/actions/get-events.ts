import axios, { AxiosResponse } from 'axios';
import https from "https"
import { IEventApiResponse } from '@/types';
import { token } from './get-token';
export const getEvents = async (): Promise<IEventApiResponse[]> => {

    try {
      const response: AxiosResponse = await axios.get('https://localhost:7232/api/events', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.value}`,
          },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        }), // Avoid using this in production
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  