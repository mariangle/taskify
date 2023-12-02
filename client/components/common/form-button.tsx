import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";

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
        {...props}
    >
        { isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>}
        { isLoading && loadingText ? loadingText : children }
    </Button>
  )
}