import SubtaskItem from '@/components/shared/subtask/subtask-item'

import { SubtaskResponse, TaskResponse } from '@/types'
import { cn } from '@/lib/util/cn'

interface SubtaskList {
  task: TaskResponse
  subtasks?: SubtaskResponse[]
  showAddSubtask: boolean
  setShowAddSubtask: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SubtaskList({ subtasks, task, showAddSubtask, setShowAddSubtask }: SubtaskList) {
  return (
    <div className={cn('pl-4', subtasks?.length || showAddSubtask ? 'pt-4' : '')}>
      {subtasks && subtasks.map((subtask) => <SubtaskItem key={subtask.id} task={task} subtask={subtask} />)}
      {showAddSubtask && <SubtaskItem task={task} setShowAddSubtask={setShowAddSubtask} />}
    </div>
  )
}
