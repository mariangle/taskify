import { cn } from '@/lib/util/cn'

interface IconProps {
  icon: React.ReactNode
  onClick?: () => void
  className?: string
}

const Icon = ({ icon, onClick, className }: IconProps) => {
  return (
    <div
      className={cn(
        'border rounded-full dark:border-neutral-600 p-1 bg-neutral-100 dark:bg-neutral-500 dark:text-neutral-200s',
        onClick ? 'cursor-pointer' : '',
        className,
      )}
      onClick={onClick}
    >
      {icon}
    </div>
  )
}

export default Icon
