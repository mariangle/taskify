import axios, { AxiosResponse } from 'axios';
import { IEvent, IEventApiResponse } from '@/types';
import { requestOptions } from '../util';

const api = axios.create({
  baseURL: 'https://localhost:7232/api',
});

const createEvent = async (event: IEvent): Promise<IEventApiResponse> => {
  try {
    const response: AxiosResponse = await api.post('/events', event, requestOptions);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getEvent = async (eventId: string): Promise<IEventApiResponse> => {
  try {
    const response: AxiosResponse = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEvent = async (eventId: string, updatedEvent: IEvent): Promise<IEventApiResponse> => {
  try {
    const response: AxiosResponse = await api.put(`/events/${eventId}`, updatedEvent, requestOptions);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteEvent = async (eventId: string): Promise<IEventApiResponse> => {
  try {
    const response: AxiosResponse = await api.delete(`/events/${eventId}`, requestOptions);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const eventService = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent
};

export default eventService;
