interface PanelHeaderProps{
    title: string,
    items?: Object[]
}
export default function PanelHeader({
    title,
    items
} : PanelHeaderProps) {
  return (
    <div className="flex gap-1">
        <h4 className="font-bold text-lg">{title}</h4>
        { items && (
            <p className="text-xs flex items-end pb-1 text-default-500">({items.length})</p>
        )}
    </div>
  )
}