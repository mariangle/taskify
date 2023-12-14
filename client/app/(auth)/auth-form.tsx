"use client"
import {
  Form,
} from "@/components/ui/form"
import FormInput from "@/components/common/form-input";
import FormButton from "@/components/common/form-button";
import z from 'zod';
import React from "react";
import toast from "react-hot-toast";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema} from "@/lib/validations/authentication";
import { useRouter } from "next/navigation";
import { handleError } from "@/util/error";

import AuthService from "@/services/auth-service";

interface Props { variant: "register" | "login" }

type LoginSchemaType = z.infer<typeof LoginSchema>;
type RegisterSchemaType = z.infer<typeof RegisterSchema>;  
type AuthSchemaType = Props['variant'] extends "login" ? LoginSchemaType : RegisterSchemaType;

const authService = new AuthService();

const AuthForm = ({
  variant
} : Props) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const authSchema = variant === 'login' ? LoginSchema : RegisterSchema;
    const action = variant === 'login' ? 'Login' : 'Register';
    const successMessage = variant === "login" ? 'Successfully logged in!' : 'Successfully registered. You can now log in.';
    const form = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema)})

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data: AuthSchemaType) => {
    try {
      setIsLoading(true);
      if (variant === 'login') {
        await authService.login(data.email, data.password);
        toast.success(successMessage);
        router.push('/dashboard')
      } else if (variant === 'register'){
        await authService.register(data.email, data.name, data.password);
        toast.success(successMessage);
        router.push('/login')
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
        <form className="space-y-4 max-w-sm w-full">
          <FormInput form={form} name="email"/>
          { variant === "register" && <FormInput form={form} name="name"/>}
          <FormInput 
            form={form} 
            name="password"
            type="password"
          />
          { variant === "register" && <FormInput form={form} name="confirmPassword" type="password" label="Confirm Password" placeholder="Confirm Password"/>}
          <FormButton
            type="submit"
            className="w-full"
            isLoading={isLoading}
            variant={'default'}
            onClick={form.handleSubmit(onSubmit)}
          >
            {action}
          </FormButton>
      </form>      
    </Form>

  )
}
export default AuthForm;