import { cn } from "@nextui-org/react"

interface props {
    children: React.ReactNode,
    className?: string
}

const PageLayout: React.FC<props> = ({
    children,
    className
}) => {
  return (
    <div className={cn("min-h-screen py-8 w-full max-w-screen-lg p-6 mx-auto", className)}>
        {children}
    </div>
  )
}

export default PageLayout