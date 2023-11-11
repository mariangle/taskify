import { cookies } from 'next/headers'

const cookieStore = cookies()
export const token = cookieStore.get('access_token')

export const isTokenValid = () => {
    let isLogged = false;
    const cookieStore = cookies()
    const token = cookieStore.get('access_token')
    isLogged = !!token; 
    
    return isLogged;
}