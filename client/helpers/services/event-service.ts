import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { IEvent } from '@/types';

class EventService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:7232/api',
    });
  }

  async createEvent(event: IEvent): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.post('/events', event);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async getEvent(eventId: string): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.get(`/events/${eventId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  async updateEvent(eventId: string, updatedEvent: any): Promise<IEvent> {
    try {
      const response: AxiosResponse = await this.api.put(`/events/${eventId}`, updatedEvent);
      return response.data;
    } catch (error: any) {
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
