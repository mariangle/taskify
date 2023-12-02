"use client"

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ListEntry, ListResponse } from "@/types";
import { FaTrash } from "react-icons/fa";
import { extractNlpList, handleError } from "@/util";
import AlertModal from "@/components/modals/alert-modal";
import ListService from "@/services/list-service";

// TODO: Create emoji input

interface FormProps {
    list: ListResponse | null,
    onClose: () => void,
}

const ListForm = ({
    list,
    onClose,
} : FormProps) => {
    const action = list ? 'Save Changes' : 'Create List'

    const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [input, setInput] = React.useState<string>('')
    const [extractedList, setExtractedList] = React.useState<ListEntry | null>(null);
    const router = useRouter();
    const closeDialog = () => setIsOpen(false);
    const openDialog = () => setIsOpen(true)
      
    React.useEffect(() => {
      const updateTask = async () => {
          const list = await extractNlpList(input);
          setExtractedList(list);
      };
      updateTask();
    }, [input]);

    React.useEffect(() => {
      setInput(list ? `${list.emoji || ''} ${list?.name || ''}` : '');
    }, [list]);    

    const onSubmit = async () => {
      try {
        setIsLoading(true)

        if (!extractedList?.name) throw new Error("A name is required.");

        const newList: ListEntry = list
        ? { id: list.id, ...extractedList }
        : extractedList;
        
        list  
        ? await ListService.updateList(list.id, newList)
        : await ListService.createList(newList)

        router.refresh();
        onClose();
      } catch (error) {
        handleError(error)
      } finally {
          setIsLoading(false)
      }
    }
    
    const onDelete = async () => {
        if (!list) return;
    
        try {
          await ListService.deleteList(list.id)
          router.refresh();
          router.push('/lists/braindump')
          onClose();
        } catch (error) {
          handleError(error)
        }
      };

  return (
    <>  
      <AlertModal 
        isOpen={isOpen} 
        description="All tasks in this list will be deleted."
        onClose={closeDialog}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex">
        <Input id="name" 
            placeholder="Work"
            value={input || ''}
            onChange={((e) => setInput(e.target.value))}
            className="w-full"
        />
      </div>
      <div className="flex justify-between">
        <div>
          {list && (
              <Button type="button" variant={'secondary'} onClick={openDialog}><FaTrash /></Button>
          )}
        </div>
        <div className="flex-gap">
          <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
          <Button
              type="submit"
              onClick={onSubmit}
              variant={'default'}
          >
              {action}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ListForm