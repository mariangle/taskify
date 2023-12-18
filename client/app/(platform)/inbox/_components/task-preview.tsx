import StatusBadge from "@/components/status-badge"
import PriorityLabel from "@/components/priority-label";
import Tag from "@/components/tag";

import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineTitle } from "react-icons/md";

import { TaskEntry } from "@/types";
import { format } from "date-fns";

interface TaskPreviewProps {
  task: TaskEntry | null;
}

const TaskPreview = ({ task }: TaskPreviewProps) => (
  <div className="flex-gap-sm">
    {task?.name ? (
      <Tag label={task.name} icon={<MdOutlineTitle />} />
    ) : (
      <Tag isMissing label={"name"} icon={<MdOutlineTitle />} />
    )}
    {task?.dueDate && <Tag label={format(new Date(task.dueDate), "EEEE, d MMM yyyy, h:mm a")} icon={<HiOutlineClock />} />}
    {task?.priority && <PriorityLabel label={task.priority} />}
    {task?.status && <StatusBadge status={task.status} />}
  </div>
);

export default TaskPreview;