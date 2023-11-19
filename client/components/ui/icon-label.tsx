import { getIcon } from "@/helpers/util/get-icon";
import { Chip } from "@nextui-org/react";

interface CategoryProps {
    label: string,
    isHashtag?: boolean,
}

const IconLabel = ({ label, isHashtag = false }: CategoryProps) => {
    
    return (
        <Chip 
            variant='flat'
            size='sm'
        >
            <div className="flex gap-1 items-center text-xs">
                {getIcon(label, isHashtag)}
                <p>{label}</p>
            </div>
        </Chip>
    );
}

export default IconLabel