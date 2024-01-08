import { create } from 'zustand';
import { Task } from '@/types';

interface TaskStore {
  task: Task | null;
  setTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  task: null,
  setTask: (newTask: Task) => set({ task: newTask }),
}));
