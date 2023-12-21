import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ListResponse } from '@/types'

interface FormSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>
  items: any[]
  name: Path<T>
  label?: string
  placeholder?: string
  description?: string
}

const FormSelectList = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  items,
}: FormSelectProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 flex flex-col">
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue defaultValue={field.value} placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <div key={item.id}>
                  <SelectItem value={item.id}>{item.name}</SelectItem>
                </div>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelectList
