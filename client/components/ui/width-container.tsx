import { cn } from "@nextui-org/react"

interface props {
    children: React.ReactNode,
    classsName?: string
}

const WidthContainer: React.FC<props> = ({
    children,
    classsName
}) => {
  return (
    <div className={cn("w-full max-w-screen-lg p-6 mx-auto", classsName)}>
        {children}
    </div>
  )
}

export default WidthContainer