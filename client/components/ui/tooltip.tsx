import { Tooltip as UITooltip } from "@nextui-org/react";
import { FaQuestionCircle, FaInfoCircle } from "react-icons/fa";

interface TooltipProps {
  children?: React.ReactNode;
  content: string;
  variant?: 'help' | 'info';
}

const Tooltip = ({
  children,
  content,
  variant,
}: TooltipProps) => {

  const tooltipIcon = variant === 'help' 
    ? <FaQuestionCircle className="w-3 h-3" /> 
    : <FaInfoCircle className="w-3 h-3" />

  return (
    <UITooltip content={content} className="dark:text-white max-w-xs">
      {children || tooltipIcon}
    </UITooltip>
  );
}

export default Tooltip;