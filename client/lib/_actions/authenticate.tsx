'use server'

import { api } from '@/lib/api';
import { agent } from '@/lib/agent';
import { cookies } from 'next/headers'

export const authenticate = async (): Promise<boolean> => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')

  try {
    if (accessToken) {
      await api.get('/validate-token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
        },
        httpsAgent: agent,
      });
      return true; 
    }
    return false; 
  } catch (e) {
    return false;
  }
};