import { 
    Select as NextUISelect, 
    SelectItem,
    SelectProps as NextUIProps 
} from "@nextui-org/react"

import { PriorityEnum, StatusEnum } from "@/helpers/constants";
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { capitalizeFirstLetter } from '@/helpers/util/formatter';

interface Props extends NextUIProps {
    id: string,
    items: PriorityEnum[] | StatusEnum[],
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
        {(item: PriorityEnum | StatusEnum) => <SelectItem key={item.value} className="dark:text-white">{item.label}</SelectItem>}
    </NextUISelect>
  )
}

export default Select