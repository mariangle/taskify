import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 as Loader } from "lucide-react";

interface Props extends ButtonProps {
    isLoading?: boolean,
    loadingText?: string,
    children: React.ReactNode
}

export default function FormButton({
    isLoading,
    children,
    loadingText,
    ...props
} : Props ) {
  return (
    <Button 
        disabled={isLoading}
        className="bg-background"
        {...props}
    >
        { isLoading && <Loader className="mr-2 h-4 w-4 animate-spin"/>}
        { isLoading && loadingText ? loadingText : children }
    </Button>
  )
}