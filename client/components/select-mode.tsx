import { modes, Mode } from "@/helpers/constants"
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
        className="text-xs"
        defaultSelectedKeys={["auto"]}
        >
        {(mode) => <SelectItem key={mode.value} onClick={() => setSelectedMode(mode)}>{mode.label}</SelectItem>}
    </Select>
  )
}

export default SelectMode