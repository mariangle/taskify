import { statuses } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

interface StatusProps {
  status: string;
}

const StatusBadge = ({
  status,
}: StatusProps) => {
  const statusInfo = statuses.find((s) => s.value === status);
  const { label } = statusInfo || {};

  return (
    <Badge 
      variant={'secondary'}
    >
      {label}
    </Badge>
  );
};

export default StatusBadge;