import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { Input as UIInput, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { capitalizeFirstLetter } from '@/helpers/util';

interface Props extends InputProps {
  id: string,
  label?: string,
  required?: boolean;
  register?: UseFormRegister<FieldValues | any>,
  errors?: FieldErrors,
}

const Input: React.FC<Props> = ({ id, register, label, errors, required = true, ...props }) => {
  return (
    <div>
      <Label>{label ?? capitalizeFirstLetter(id)}</Label>
      <UIInput
        {...(register && register(id, { required }))}
        {...props}
      />
        {errors?.[id] && (
          <span>{String(errors[id]?.message)}</span>
        )}
    </div>
  );
};

export default Input;
