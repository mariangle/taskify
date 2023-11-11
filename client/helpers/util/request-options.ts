import { parseCookies } from 'nookies'

const cookies = parseCookies()
export const accessToken = cookies['access_token']

export const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  