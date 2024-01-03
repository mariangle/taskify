import * as React from 'react';
import { cn } from '@/lib/util/tw-merge';

interface IconProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Icon({ icon, onClick, className }: IconProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <div
      role="button"
      className={cn(
        'border rounded-full dark:border-neutral-600 p-1 bg-neutral-100 dark:bg-neutral-500 dark:text-neutral-200s',
        onClick ? 'cursor-pointer' : '',
        className,
      )}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      tabIndex={0}
    >
      {icon}
    </div>
  );
}

Icon.defaultProps = {
  onClick: undefined,
  className: '',
};

export default Icon;
