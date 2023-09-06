import { cn } from "@/lib/utils"

const Container = ({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) => {
  return (
    <div 
        className={cn(
          "max-w-[1400px] mx-auto",
          className
          )}
    >
        {children}
    </div>
  )
}

export default Container;