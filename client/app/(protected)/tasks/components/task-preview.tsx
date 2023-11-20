import StatusBadge from "@/components/ui/status-badge";
import IconLabel from "@/components/ui/icon-label";
import AttachmentLabel from "@/components/ui/attachment-label";

import { Chip } from "@nextui-org/react";
import { HiLocationMarker, HiOutlineClock } from "react-icons/hi";
import { MdOutlineTitle } from "react-icons/md";

import { TaskEntry } from "@/types";
import { formatToEEEDDMMMYYYYY } from "@/helpers/util/formatter";
interface TaskPreviewProps {
    task: TaskEntry | null
}

const TaskPreview = ({
    task
}: TaskPreviewProps) => {
  return (
    <div className="flex-gap-sm">
        {task?.name ? <Tag label={task.name}  icon={<MdOutlineTitle />}/> : <Tag label={'name'} />}
        {task?.dueDate ? <Tag label={formatToEEEDDMMMYYYYY(task.dueDate)} icon={<HiOutlineClock />} /> : <Tag label={'due date'} />}
        {task?.priority && <IconLabel label={task.priority}/>}
        {task?.location && <Tag label={task.location} icon={<HiLocationMarker />} /> }
        {task?.status && <StatusBadge status={task.status} />}
    </div>
  )
}

const Tag = ({
    icon,
    label
} : {
    icon?: React.ReactNode,
    label: string,
}) => {
    return (
        <Chip variant='flat' size='sm' color={icon ? 'default' : 'danger'}>
            <div className="flex-gap-sm">
                {icon}
                {label}
            </div>
        </Chip>
    )
}

export default TaskPreview;