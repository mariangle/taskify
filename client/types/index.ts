import type { Task as PrismaTask, Label, Subtask } from '@prisma/client';

export type Task = PrismaTask & {
  labels?: Label[];
  subtasks?: Subtask[];
};

export type TaskEntry = Partial<PrismaTask> & { name: string };
export type SubtaskEntry = Partial<Subtask> & { name: string };
export type LabelEntry = Partial<Label> & { name: string };
export type { User, List, Label, Subtask, TaskPriority } from '@prisma/client';
