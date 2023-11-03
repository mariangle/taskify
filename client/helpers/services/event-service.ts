import axios, { AxiosInstance, AxiosResponse } from 'axios';
import https from "https"

import { IEventApiResponse as IEvent } from '@/types';

class EventService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:7232/api',
    });
  }

  async getEvents(): Promise<IEvent[]> {
    try {
      const response: AxiosResponse = await this.api.get('/events', {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
      }) // bad in production
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createEvent(event: IEvent): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.post('/events', event);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getEvent(eventId: string): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(eventId: string, updatedEvent: IEvent): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.put(`/events/${eventId}`, updatedEvent);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteEvent(eventId: string): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export default EventService;
