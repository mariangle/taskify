"use client"
import * as React from "react";
import { Form } from "@/components/ui/form"
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
import { LabelSchemaType, LabelSchema } from "@/lib/validations/label";


interface FormProps { 
  label: LabelResponse | null,
  onClose?: () => void,
}

export default function LabelForm({
  label,
  onClose
} : FormProps){
  const action = label ? 'Save' : 'Create'
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false); 
  const [isOpen, setIsOpen] = React.useState<boolean>(false); 
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

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
        onClose && onClose();
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
        onClose && onClose();
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
        <div className="flex items-end gap-4 w-full">
          <FormInput form={form} name="color" type="color" className="aspect-square"/>           
          <FormInput form={form} name="name" fullWidth/>    
          {label && <Button type="button" variant={'secondary'} onClick={openDialog} size={'icon'} className="w-14"><Trash className="w-4 h-4"/></Button>}      
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} variant={'default'}>
                  {action}
              </Button>
        </div>
        <div className="flex justify-between">
            <div className="flex-gap">
              {onClose && <Button type="button" variant={'ghost'} onClick={onClose}>Cancel</Button>}   
            </div>    
        </div>
      </form>
    </Form>
  )
}