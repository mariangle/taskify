import { SubtaskResponse } from "@/types"

interface SubtaskPanelProps {
    subtasks: SubtaskResponse[] | []
}

export default function SubtaskPanel({
    subtasks
} : SubtaskPanelProps ){


    return (
        <div>
            <ul>
                
            </ul>
        </div>
    )
}