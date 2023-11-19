import { Input as NextUIInput, InputProps as NextUIInputProps } from '@nextui-org/react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { capitalizeFirstLetter } from '@/helpers/util/formatter';

interface Props extends NextUIInputProps {
  id: string,
  label?: string,
  required?: boolean;
  register?: UseFormRegister<FieldValues | any>,
  errors: FieldErrors,
}

const Input: React.FC<Props> = ({ id, register, label, errors, required = true, ...props }) => {
  return (
    <NextUIInput
      size='sm'
      variant='bordered'
      placeholder=' '
      label={label ?? capitalizeFirstLetter(id)}
      {...(register && register(id, { required }))}
      isInvalid={errors[id] ? true : false}
      errorMessage={errors[id] ? String(errors[id]?.message) : ''}
      {...props}
    />
  );
};

export default Input;
