import { Button } from "@nextui-org/react";

interface HoldButtonProps {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
  children: React.ReactNode;
}

const HoldButton: React.FC<HoldButtonProps> = ({
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  children,
}) => {
  return (
    <Button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </Button>
  );
};

export default HoldButton;
