"use client"
import * as React from "react";
import * as z from "zod"

import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/alert-modal";
import FormInput from "@/components/common/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabelResponse } from "@/types/label";
import LabelService from "@/helpers/services/label-service";
import { useRouter } from "next/navigation";
import { handleError } from "@/helpers/util";

export const LabelSchema = z.object({
  name: z.string().min(2),
  color: z.string().min(2),
  // recuring
})

export type LabelSchemaType = z.infer<typeof LabelSchema>;

interface FormProps { 
  label: LabelResponse | null,
  onClose: () => void,
}

export default function LabelForm({
  label,
  onClose
} : FormProps){
  const action = label ? 'Save changes' : 'Create Label'
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false); 
  const [isOpen, setIsOpen] = React.useState<boolean>(false); 

  const form = useForm<LabelSchemaType>({
    resolver: zodResolver(LabelSchema),
    defaultValues: {
      ...label,
      color: label?.color || '#ffffff',
      name: label?.name || ''
    }})

    const onSubmit = async (data: LabelSchemaType) => {
      try {
        setIsLoading(true);
        label 
        ? await LabelService.updateLabel(label.id, {...data, id: label.id})
        : await LabelService.createLabel(data)

        router.refresh();
        onClose();
      } catch (error){
        handleError(error)
      } finally {
        setIsLoading(false);

      }
    }

    
    const onDelete = async () => {
      if (!label) return;
  
      try {
        await LabelService.deleteLabel(label.id);
        router.refresh();
        onClose();
      } catch (error) {
        handleError(error);
      }
    };

  return (
    <Form {...form}>
      <form>
        <AlertModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            onConfirm={onDelete}
            loading={isLoading}
          />
        <FormInput form={form} name="name"/>    
        <FormInput form={form} name="color" type="color"/> 
        <div className="flex-gap justify-end">
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                {action}
            </Button>
        {label && <Button type="button" variant={'destructive'} onClick={() => setIsOpen(true)}>Delete</Button>}          
        </div>
      </form>
    </Form>
  )
}