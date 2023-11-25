import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { capitalizeFirstLetter } from "@/util"
import { cn } from "@/lib/utils"

interface FormInputProps<T extends FieldValues> extends InputProps {
  form: UseFormReturn<T> | any
  name: Path<T>
  label?: string
  placeholder?: string
  description?: string,
  fullWidth?: boolean,
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
    const formLabel = label ? label : capitalizeFirstLetter(name);
    const formPlaceholder = placeholder ? placeholder : `${capitalizeFirstLetter(name)}`;
  
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn(fullWidth ? 'w-full' : '', 'mb-4')}>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <Input placeholder={formPlaceholder} {...field} {...props} id={name}/>
            </FormControl>
            {description && (
              <FormDescription>
                {description}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  export default FormInput;