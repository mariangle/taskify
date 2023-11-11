"use client"

import { Spinner, HiOutlineEye, HiOutlineEyeOff, Button } from "@/components/ui";
import { Input } from "@nextui-org/react";

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
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const AuthSchema = variant === "login" ? LoginSchema : RegisterSchema;
    
    const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm<AuthSchemaType>({ resolver: zodResolver(AuthSchema)})

    const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data: AuthSchemaType) => {
    try {
      setIsLoading(true);
      if (variant === 'login') {
        await authService.login(data.username, data.password);
        toast.success('Successfully logged in!');
        router.push('/schedule')
      } else if (variant === 'register'){
        await authService.register(data.username, data.name, data.password);
        toast.success('Successfully registered. You can now log in.');
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
      <Input 
        type="text" 
        label="Username" 
        size="sm" 
        variant="bordered"         
        isInvalid={errors.username ? true : false}
        errorMessage={errors.username?.message}
        {...register("username")}
        />
      { variant === "register" && 
      <Input 
        type="text" 
        label="Name" 
        size="sm" 
        variant="bordered"
        isInvalid={errors.name ? true : false}
        errorMessage={errors.name?.message}
        {...register("name")}
      />
      }
      <Input
        label="Password"
        variant="bordered"
        {...register("password")}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <HiOutlineEyeOff className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        isInvalid={errors.password ? true : false}
        errorMessage={errors.password?.message}
        className="max-w-xs"
      />    
      <Button
        isLoading={isLoading}
        type="submit"
        color="primary"
        spinner={< Spinner />}
        onClick={handleSubmit(onSubmit)}
      >
        { variant === "login" ? "Login" : "Register"}
      </Button>
    </form>
  )
}
export default AuthForm;