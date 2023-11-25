import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { capitalizeFirstLetter } from "@/helpers/util"

interface FormInputProps<T extends FieldValues> extends InputProps {
  form: UseFormReturn<T> | any
  name: Path<T>
  label?: string
  placeholder?: string
  description?: string
}
  const FormInput = <T extends FieldValues>({ 
    form, 
    name, 
    label, 
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
          <FormItem>
            <FormLabel>{formLabel}</FormLabel>
            <FormControl>
              <Input placeholder={formPlaceholder} {...field} {...props} />
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