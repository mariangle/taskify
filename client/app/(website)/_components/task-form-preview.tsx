import TaskForm from '@/components/shared/task/task-form';

const lists = [
  {
    id: '1',
    userId: 'user1',
    name: 'Personal',
    order: 1,
    tasks: [
      { id: 'task1', description: 'Buy groceries', completed: false },
      { id: 'task2', description: 'Exercise', completed: true },
    ],
  },
  {
    id: '2',
    userId: 'user1',
    name: 'Work',
    order: 2,
    tasks: [
      { id: 'task3', description: 'Prepare presentation', completed: false },
      { id: 'task4', description: 'Reply to emails', completed: true },
    ],
  },
];

const labels = [
  {
    id: 'label1',
    userId: 'user1',
    name: 'Urgent',
    color: 'red',
    tasks: [
      { id: 'task1', description: 'Buy groceries', completed: false },
      { id: 'task3', description: 'Prepare presentation', completed: false },
    ],
  },
  {
    id: 'label2',
    userId: 'user1',
    name: 'Personal',
    color: 'blue',
    tasks: [
      { id: 'task2', description: 'Exercise', completed: true },
      { id: 'task4', description: 'Reply to emails', completed: true },
    ],
  },
];

export default function TaskFormPreview() {
  return (
    <div className="border rounded-lg">
      <TaskForm lists={lists} labels={labels} preview />
    </div>
  );
}
