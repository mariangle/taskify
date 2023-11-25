
import { Select as UISelect, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface Props {
    id: string,
    items: any,
    label?: string,
    selectLabel: string,
    defaultValue?: string | undefined,
    errors: FieldErrors,
    register?: UseFormRegister<FieldValues | any>,
    isRequired?: boolean
}

const Select: React.FC<Props> = ({
    id,
    register,
    selectLabel,
    defaultValue,
    items,
    label,
    errors,
    isRequired
}) => {
  return (
    <UISelect defaultValue={defaultValue} {...(register && register(id, { required: isRequired}))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label ? label : `Select a ${id}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {items.map((item: any, index: number) => (
              <SelectItem key={index} value={item.label}>{item.label}</SelectItem>
          ))}
          {!isRequired && <SelectItem key="none" value={'None'}>None</SelectItem>}
        </SelectGroup>
      </SelectContent>
      {errors?.[id] && (
          <span>{String(errors[id]?.message)}</span>
        )}  
    </UISelect>
  )
}

export default Select