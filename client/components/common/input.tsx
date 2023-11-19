import { Input as NextUIInput, InputProps as NextUIInputProps } from '@nextui-org/react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface Props extends NextUIInputProps {
  id: string,
  label?: string,
  required?: boolean;
  register?: UseFormRegister<FieldValues | any>,
  errors: FieldErrors,
  type?: 'text' | 'number' | 'date',
}

const Input: React.FC<Props> = ({ id, register, label, errors, required = true, type = 'text', ...props }) => {

  const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <NextUIInput
      size='sm'
      variant='bordered'
      placeholder=' '
      label={label ?? capitalizeFirstLetter(id)}
      type={type}
      {...(register && register(id, { required }))}
      isInvalid={errors[id] ? true : false}
      errorMessage={errors[id] ? String(errors[id]?.message) : ''}
      {...props}
    />
  );
};

export default Input;
