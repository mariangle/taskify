import { cn } from "@nextui-org/react"

interface PanelHeaderProps{
    title: string,
    items?: Object[],
    className?: string,
}
export default function PanelHeader({
    title,
    items,
    className
} : PanelHeaderProps) {
  return (
    <div className={cn("flex gap-1 py-2", className)}>
        <h4 className="font-bold text-lg">{title}</h4>
        { items && (
            <p className="text-xs flex items-end pb-1 text-default-500">({items.length})</p>
        )}
    </div>
  )
}