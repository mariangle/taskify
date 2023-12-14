import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UserResponse } from '@/types';
import { setToken as setServerToken } from '@/lib/_actions/set-token';

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:7232/api',
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response: AxiosResponse = await this.api.post('/login', { email, password });
      await setServerToken(response.data)
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, name: string, password: string): Promise<UserResponse> {
    try {
      const response: AxiosResponse = await this.api.post('/register', { email, name, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
