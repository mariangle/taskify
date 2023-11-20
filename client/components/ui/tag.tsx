import { Chip } from "@nextui-org/react";

interface TagProps {
    icon?: React.ReactNode;
    label: string | null;
    isMissing?: boolean;
  }
  
 const Tag = ({ icon, label, isMissing }: TagProps) => (
    <Chip variant="flat" size="sm" color={isMissing ? "danger" : "default"}>
      <div className="flex-gap-sm">
        {icon}
        {label}
      </div>
    </Chip>
  );

export default Tag;