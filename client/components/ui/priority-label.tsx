import { Chip } from "@nextui-org/react";
import { 
    HiArrowSmDown, 
    HiArrowSmUp, 
    HiArrowSmRight,
} from "react-icons/hi";

interface CategoryProps {
    label: string,
}

const PriorityLabel = ({ label }: CategoryProps) => {

    const items = [
        { name: 'Low', label: 'low priority', icon: <HiArrowSmDown /> },
        { name: 'Medium', label: 'medium priority', icon: <HiArrowSmRight /> },
        { name: 'High', label: 'high priority', icon: <HiArrowSmUp /> },
    ]

    const item = items.find((item) => item.name === label)

    return (
        <Chip 
            variant='flat'
            size='sm'
        >
            <div className="flex gap-1 items-center text-xs">
                {item?.icon}
                <p>{item?.label}</p>
            </div>
        </Chip>
    );
}

export default PriorityLabel