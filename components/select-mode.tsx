import { modes, Mode } from "@/lib/constants"
import { Select, SelectItem } from "@nextui-org/react"

interface props {
  setSelectedMode: (mode: Mode) => void;
}

const SelectMode: React.FC<props> = ({
    setSelectedMode
}) => {
  return (
    <Select
        items={modes}
        label="Select Mode"
        className="max-w-xs text-xs"
    >
        {(mode) => <SelectItem key={mode.value} onClick={() => setSelectedMode(mode)}>{mode.label}</SelectItem>}
    </Select>
  )
}

export default SelectMode