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
        'border rounded-full dark:border-zinc-600 p-1 bg-zinc-100 dark:bg-zinc-500 dark:text-zinc-200s',
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
