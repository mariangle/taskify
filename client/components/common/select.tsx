import { 
    Select as NextUISelect, 
    SelectItem,
    SelectProps as NextUIProps 
} from "@nextui-org/react"

import { Enum } from "@/helpers/constants";
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { capitalizeFirstLetter } from '@/helpers/util/formatter';

interface Props extends NextUIProps {
    id: string,
    items: Enum[],
    label?: string,
    errors: FieldErrors,
    register?: UseFormRegister<FieldValues | any>,
}

const Select: React.FC<Props> = ({
    id,
    register,
    label,
    errors,
    ...props
}) => {
  return (
    <NextUISelect
        className="max-w-xs"
        label={label ? label : `Select ${capitalizeFirstLetter(id)}`}
        isInvalid={errors[id] ? true : false}
        errorMessage={errors[id] ? String(errors[id]?.message) : ''}
        {...(register && register(id))}
        {...props}
    >
        {(status) => <SelectItem key={status.value} className="dark:text-white">{status.label}</SelectItem>}
    </NextUISelect>
  )
}

export default Select