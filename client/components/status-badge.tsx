import { statuses } from "@/lib/constants";
import { Chip } from "@nextui-org/react";

interface StatusProps {
  status: string;
  hasNoContent?: boolean;
}

const Badge = ({
  status,
  hasNoContent
}: StatusProps) => {
  const statusInfo = statuses.find((s) => s.value === status);
  const { label } = statusInfo || {};

  if (hasNoContent) {
    return <Chip className='w-2 h-2 rounded-full' variant='shadow' />
  }

  return (
    <Chip 
      variant='flat'
      size='sm'
    >
      {label}
    </Chip>
  );
};

export default Badge;