  "use client"

  import { Spinner, HiOutlineEye, HiOutlineEyeOff, Button } from "@/components/ui";
import { Input } from "@nextui-org/react";

  import * as z from 'zod';
  import * as React from "react";

  import { SubmitHandler, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";

  import AuthService from "@/helpers/services/auth-service";

  interface Props {
    variant: "register" | "login"
  }

  const AuthSchema = z.object({
    username: z.string().min(4),
    name: z.string().min(2),
    password: z
      .string()
      .min(6)
      .max(20)
      /*.refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      }),*/
  });

  type AuthSchemaType = z.infer<typeof AuthSchema>;
  const authService = new AuthService();

  const AuthForm = ({
    variant
  } : Props) => {
      const [isVisible, setIsVisible] = React.useState<boolean>(false);
      const [isLoading, setIsLoading] = React.useState<boolean>(false);
      const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthSchemaType>({ resolver: zodResolver(AuthSchema) })

      const toggleVisibility = () => setIsVisible(!isVisible);

      const onSubmit: SubmitHandler<AuthSchemaType> = async (data: AuthSchemaType) => {
        try {
          setIsLoading(true);
          const response = await (variant === "login"
            ? authService.login(data.username, data.password)
            : authService.register(data.username, data.name, data.password));
          console.log(response);
        } catch (error: any) {
          console.log(error.response.data);
        } finally {
          setIsLoading(false);
        }
      };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xs space-y-4 mx-auto">
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
        >
          { variant === "login" ? "Login" : "Register"}
        </Button>
      </form>
    )
  }

  export default AuthForm;