import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { capitalizeFirstLetter } from "@/helpers/util"

interface Item {
    id: number,
    value: string,
    label: string
}

interface FormSelectProps<T extends FieldValues> {
    form: UseFormReturn<T>,
    items: Item[],
    name: Path<T>;
    label?: string;
    placeholder?: string;
    description?: string;
  }

  const FormSelect = <T extends FieldValues>({ 
    form, 
    name, 
    label, 
    placeholder, 
    description,
    items
}: FormSelectProps<T>) => {

  const formLabel = label ? label : capitalizeFirstLetter(name);
  const formPlaceholder = placeholder ? placeholder : `Select ${capitalizeFirstLetter(name)}`;

    return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
          <FormItem className="w-full flex-1">
            <FormLabel>{formLabel}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue defaultValue={field.value} placeholder={formPlaceholder}/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item) => (
                    <div key={item.id}>
                        <SelectItem value={item.value}>{item.label}</SelectItem>
                    </div>
                ))}
              </SelectContent>
            </Select>
            { description && (
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

  export default FormSelect;