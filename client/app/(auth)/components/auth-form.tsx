"use client"
import {
  Form,
} from "@/components/ui/form"
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import React from "react";
import toast from "react-hot-toast";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema} from "./auth-schemas";
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
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const authSchema = variant === 'login' ? LoginSchema : RegisterSchema;
    const action = variant === 'login' ? 'Login' : 'Register';
    const successMessage = variant === "login" ? 'Successfully logged in!' : 'Successfully registered. You can now log in.';
    const form = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema)})

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm)

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data: AuthSchemaType) => {
    try {
      setIsLoading(true);
      if (variant === 'login') {
        await authService.login(data.username, data.password);
        toast.success(successMessage);
        router.push('/dashboard')
      } else if (variant === 'register'){
        await authService.register(data.username, data.name, data.password);
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
        <form className="space-y-4">
          <FormInput form={form} name="username"/>
          { variant === "register" && <FormInput form={form} name="name"/>}
          <FormInput form={form} name="password"/>
          { variant === "register" && <FormInput form={form} name="confirmPassword"/>}
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          {action}
        </Button>
      </form>      
    </Form>

  )
}
export default AuthForm;