import { Badge } from "@/components/ui/badge";
import { priorities } from "@/lib/constants";

interface CategoryProps {
    label: string,
}

const PriorityLabel = ({ label }: CategoryProps) => {

    const priority = priorities.find((p) => p.label === label)!

    return (
        <Badge variant={'secondary'}>
            <priority.icon />
            <p className="pl-2">{priority?.label}</p>
        </Badge>
    );
}

export default PriorityLabel