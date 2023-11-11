import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import Cookies from "js-cookie"

import { IUser } from '@/types';

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:7232/api',
    });
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const response: AxiosResponse = await this.api.post('/login', { username, password });
      // const { accessToken, refreshToken } = response.data;
      setCookie(null, 'access_token', response.data, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
      });
      setCookie(null, 'refresh_token', response.data, {
        maxAge: 30 * 24 * 60 * 60, 
        path: '/',
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
      });;
    } catch (error) {
      throw error;
    }
  }

  async register(username: string, name: string, password: string): Promise<IUser> {
    try {
      const response: AxiosResponse = await this.api.post('/register', { username, name, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    destroyCookie(null, 'access_token');
    destroyCookie(null, 'refresh_token');
  }

  isLogged(): boolean {
    let isLogged = true;
    const token =  Cookies.get('access_token') 

    console.log(token)

    isLogged = !!token; 
    
    return isLogged;
  }
}

export default AuthService;
