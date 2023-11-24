import { Badge } from "@/components/ui/badge"

interface TagProps {
    icon?: React.ReactNode;
    label: string | null;
    isMissing?: boolean;
  }
  
 const Tag = ({ icon, label, isMissing }: TagProps) => (
    <Badge variant={isMissing ? 'destructive' : 'secondary'}>
      <div className="flex-gap-sm">
        {icon}
        {label}
      </div>
    </Badge>
  );

export default Tag;