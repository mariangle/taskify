import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LabelResponse } from "@/types";

interface MultiSelectProps {
  items: LabelResponse[];
  selectedLabels: string[];
  onChange: (selectedLabels: string[]) => void;
}

const MultiSelect = ({ items, selectedLabels, onChange }: MultiSelectProps) => {
  const handleSelectChange = (selectedLabelId: string) => {
    const isLabelSelected = selectedLabels.includes(selectedLabelId);

    if (isLabelSelected) {
      // Remove the label if already selected
      onChange(selectedLabels.filter(labelId => labelId !== selectedLabelId));
    } else {
      // Add the label if not selected
      onChange([...selectedLabels, selectedLabelId]);
    }
  };

  const isLabelSelected = (selectedId: string): boolean => {
    return selectedLabels.some(labelId => labelId === selectedId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
            variant={"ghost"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground text-xs"
            )}
          >
          <span>Select Values</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
        <DropdownMenuLabel>Labels</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items?.map((label: LabelResponse, index: number) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={isLabelSelected(label.id)}
            onCheckedChange={() => handleSelectChange(label.id)}
          >
            {label.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
