import ListService from "@/helpers/services/list-service";
import { ListEntry } from "@/types";

const useLists = () => {
  
  const createList = async (data: ListEntry) => {
    if (!data?.name) throw new Error("A name is required.");

    try {
      await ListService.createList(data)
    } catch (error) {
      throw error;
    } 
  }

  const updateList = async (listId: string, data: ListEntry) => {
    if (!data?.name) throw new Error("A name is required.");

    try {
      await ListService.updateList(listId, data)
    } catch (error) {
      throw error;
    }
  }

  const deleteList = async (listId: string) => {
    try {
      await ListService.deleteList(listId)

    } catch (error) {
      throw error;
    }
  }

  return {
    createList,
    deleteList,
    updateList,
  };
};

export default useLists;
