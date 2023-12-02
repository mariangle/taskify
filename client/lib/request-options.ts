 import { parseCookies } from 'nookies'
 function getAccessToken(){
   const cookies = parseCookies()
   const accessToken = cookies['access_token']
   return accessToken
 }
 export const requestOptions = {
   headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${getAccessToken()}`,
   },
 };