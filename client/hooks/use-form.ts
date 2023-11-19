import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm as ZodUseForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';

type UseFormOptions<T extends FieldValues> = {
  schema: z.ZodObject<T, any, any>;
};

export const useForm = <T extends FieldValues>(options: UseFormOptions<T> & { onSubmit: SubmitHandler<T> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = ZodUseForm<T>({
    resolver: zodResolver(options.schema) as any,
  });

  return {
    register,
    handleSubmit,
    errors,
    onSubmit: handleSubmit(options.onSubmit),
  };
};
