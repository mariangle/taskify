/* eslint-disable no-useless-catch */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User } from '@prisma/client';

const api: AxiosInstance = axios.create({
  baseURL: '/api/auth',
});

export const AuthService = {
  async login(email: string, password: string): Promise<void> {
    try {
      await api.post('/login', {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  },
  async register(email: string, name: string, password: string): Promise<User> {
    try {
      const response: AxiosResponse = await api.post('/register', {
        email,
        name,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
