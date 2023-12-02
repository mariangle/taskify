'use server'

import { cookies } from 'next/headers'

export async function setToken(accessToken: string): Promise<void> {
    cookies().set({
        name: 'access_token',
        value: accessToken,
        httpOnly: true,
        path: '/',
    })
}