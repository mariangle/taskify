'use client'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FormInput from '@/components/common/form-input'

import z from 'zod'
import React from 'react'
import toast from 'react-hot-toast'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, RegisterSchema } from '@/lib/validations/authentication'
import { useRouter } from 'next/navigation'
import { handleError } from '@/lib/util/error'

import AuthService from '@/services/auth-service'

interface Props {
  variant: 'register' | 'login'
}

type LoginSchemaType = z.infer<typeof LoginSchema>
type RegisterSchemaType = z.infer<typeof RegisterSchema>
type AuthSchemaType = Props['variant'] extends 'login' ? LoginSchemaType : RegisterSchemaType

const authService = new AuthService()

const AuthForm = ({ variant }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const authSchema = variant === 'login' ? LoginSchema : RegisterSchema
  const action = variant === 'login' ? 'Login' : 'Register'
  const successMessage =
    variant === 'login'
      ? 'Successfully logged in! Redirecting to dashboard...'
      : 'Successfully registered. You can now log in.'
  const form = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema) })

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data: AuthSchemaType) => {
    try {
      setIsLoading(true)
      if (variant === 'login') {
        await authService.login(data.email, data.password)
        toast.success(successMessage)
        router.push('/inbox')
      } else if (variant === 'register') {
        await authService.register(data.email, data.name, data.password)
        toast.success(successMessage)
        router.push('/login')
      }
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4 max-w-sm w-full">
        <FormInput form={form} name="email" label="Email" />
        {variant === 'register' && <FormInput form={form} name="name" label="Name" />}
        <FormInput form={form} name="password" type="password" label="Password" />
        {variant === 'register' && (
          <FormInput form={form} name="confirmPassword" type="password" label="Confirm Password" />
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          variant={'default'}
          onClick={form.handleSubmit(onSubmit)}
        >
          {action}
        </Button>
      </form>
    </Form>
  )
}
export default AuthForm
