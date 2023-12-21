import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/util/cn'

interface FormInputProps<T extends FieldValues> extends InputProps {
  form?: UseFormReturn<T> | any
  name: Path<T>
  label?: string
  placeholder?: string
  description?: string
  fullWidth?: boolean
}
const FormInput = <T extends FieldValues>({
  form,
  name,
  label,
  fullWidth = false,
  placeholder,
  description,
  ...props
}: FormInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(fullWidth ? 'w-full' : '')}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input placeholder={placeholder} {...field} {...props} id={name} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
