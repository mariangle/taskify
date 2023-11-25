import { statuses } from "@/helpers/constants";
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
  const { color, label } = statusInfo || {};

  if (hasNoContent) {
    return <Chip color={color} className='w-2 h-2 rounded-full' variant='shadow' />
  }

  return (
    <Chip 
      color={color}
      variant='flat'
      size='sm'
    >
      {label}
    </Chip>
  );
};

export default Badge;