"use client"

import { HiOutlineEye, HiOutlineEyeOff } from "@/components/ui";
import { Input, Button } from "@/components/common";

import * as z from 'zod';
import * as React from "react";
import toast from "react-hot-toast";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, RegisterSchema} from "./auth-schemas";
import { useRouter } from "next/navigation";
import { handleError } from "@/helpers/util/error-handler";

import AuthService from "@/helpers/services/auth-service";

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
    const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema)})

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
    <form className="max-w-xs space-y-4 mx-auto">
      <Input id='username' errors={errors} register={register}/>
      { variant === "register" &&  <Input id='name' errors={errors} register={register}/> }
      <Input id='password' register={register} errors={errors} type={isVisible ? "text" : "password"}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <HiOutlineEyeOff className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
      />   
      { variant === "register" &&  
          <Input id='confirmPassword' register={register} errors={errors} type={isVisibleConfirm ? "text" : "password"}
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm}>
                {isVisibleConfirm ? (
                  <HiOutlineEyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />   
      }
      <Button
        isLoading={isLoading}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        {action}
      </Button>
    </form>
  )
}
export default AuthForm;