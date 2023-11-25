import * as React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { DatePicker } from "@/components/ui/date-picker";

import { FieldValues, Path, UseFormReturn } from "react-hook-form"

interface FormDatePickerProps<T extends FieldValues> {
    form: UseFormReturn<T>,
    name: Path<T>;
    label?: string;
    placeholder?: string;
    description?: string;
  }

  const FormDatePicker = <T extends FieldValues>({ 
    form, 
    name, 
    label, 
    placeholder, 
    description,
  }: FormDatePickerProps<T>) => {
  
    return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
            <FormLabel>{label || 'Due Date'}</FormLabel>
            <FormControl>
              <DatePicker
                  placeholder={placeholder}
                  selected={field.value}
                  onSelect={(value: string) => {
                  field.onChange(value)
                  }}
              />
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

  export default FormDatePicker;