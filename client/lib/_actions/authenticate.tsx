'use server';

import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { api } from '@/lib/api';
import { agent } from '@/lib/agent';
import { UserResponse } from '@/types';

interface AuthResponse {
  isAuthenticated: boolean;
  user?: UserResponse;
}

const getUserInfo = async (token: string): Promise<UserResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const res: AxiosResponse = await api.get('/current-user', {
    headers,
    httpsAgent: agent,
  });

  return res.data;
};

export const authenticate = async (): Promise<AuthResponse> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  try {
    if (accessToken) {
      const user = await getUserInfo(accessToken.value);
      return { isAuthenticated: true, user };
    }
    return { isAuthenticated: false };
  } catch (e) {
    return { isAuthenticated: false };
  }
};
