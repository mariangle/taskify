  "use client"

  import { Input } from "@nextui-org/react";
  import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
  import * as z from 'zod';
  import { SubmitHandler, useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";

  import * as React from "react";
  import axios from "axios";

  interface Props {
    variant: "register" | "login"
  }

  const AuthSchema = z.object({
    username: z.string().min(4),
    name: z.string().min(2).optional(),
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

  const AuthForm = ({
    variant
  } : Props) => {
      const [isVisible, setIsVisible] = React.useState(false);
      const [value, setValue] = React.useState("");
      const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthSchemaType>({ resolver: zodResolver(AuthSchema) })

      const toggleVisibility = () => setIsVisible(!isVisible);

      const onSubmit: SubmitHandler<AuthSchemaType> = (data: AuthSchemaType) => {
        if (variant === "login"){
          axios.post("https://localhost:7232/api/auth/login", data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response.data));
          } else if (variant === "register"){

        }
      };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xs space-y-4 mx-auto">
        <Input 
          type="text" 
          label="Username" 
          size="sm" 
          variant="bordered"         
          value={value}
          onValueChange={setValue}
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
        <button type="submit" >submit!</button>
      </form>
    )
  }

  export default AuthForm;