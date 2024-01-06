/* eslint-disable no-useless-catch */
import { User } from '@/types';
import { api } from '@/lib/api';

export const AuthService = {
  async login(email: string, password: string): Promise<void> {
    try {
      await api.post('/auth/login', {
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  },
  async register(email: string, name: string, password: string): Promise<User> {
    try {
      const response = await api.post('/auth/register', {
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
