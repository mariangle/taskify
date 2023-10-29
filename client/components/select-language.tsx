import { languageOptions, Language } from "@/lib/constants"
import { Select, SelectItem } from "@nextui-org/react"

interface props {
    setSelectedLanguage: (mode: Language) => void;
}

const SelectLanguage: React.FC<props> = ({
    setSelectedLanguage
}) => {
  return (
    <Select
        items={languageOptions}
        label="Select Language"
        className="max-w-xs text-xs"
    >
        {(language) => <SelectItem key={language.label} onClick={() => setSelectedLanguage(language)}>{language.label}</SelectItem>}
    </Select>
  )
}

export default SelectLanguage