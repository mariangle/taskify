import StatusBadge from "@/components/ui/status-badge";
import PriorityLabel from "@/components/ui/priority-label";
import Tag from "@/components/ui/tag";

import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineTitle } from "react-icons/md";

import { TaskEntry } from "@/types";
import { formatToEEEDDMMMYYYYY } from "@/helpers/util/format";

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
    {task?.dueDate && <Tag label={formatToEEEDDMMMYYYYY(task.dueDate)} icon={<HiOutlineClock />} />}
    {task?.priority && <PriorityLabel label={task.priority} />}
    {task?.status && <StatusBadge status={task.status} />}
  </div>
);

export default TaskPreview;