import { parseCookies } from 'nookies'

// Only works in server components/pages

const cookies = parseCookies()
const accessToken = cookies['access_token']

const requestOptions = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
};
  
export { 
  accessToken,
  requestOptions
}