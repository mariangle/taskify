"use client"
import * as React from "react";
import * as z from "zod"

import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import AlertModal from "@/components/modals/alert-modal";
import FormInput from "@/components/common/form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LabelResponse } from "@/types/label";
import LabelService from "@/services/label-service";
import { useRouter } from "next/navigation";
import { handleError } from "@/util";

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
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(true);

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
            onClose={closeDialog}
            onConfirm={onDelete}
            loading={isLoading}
            description="This action will remove the labels from tasks that are currently associated with this label."
        />
        <div className="flex-gap w-full">
          <FormInput form={form} name="color" type="color" className="aspect-square"/>           
          <FormInput form={form} name="name" fullWidth/>    
        </div>
        <div className="flex justify-between">
            <div>
              {label && <Button type="button" variant={'secondary'} onClick={openDialog} size={'icon'}><Trash className="w-4 h-4"/></Button>}      
            </div>
            <div className="flex-gap">
              <Button type="button" variant={'ghost'} onClick={onClose}>Cancel</Button>   
              <Button type="submit" onClick={form.handleSubmit(onSubmit)} variant={'default'}>
                  {action}
              </Button>
            </div>    
        </div>
      </form>
    </Form>
  )
}