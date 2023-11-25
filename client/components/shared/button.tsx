import { Button as NextUIButton, ButtonProps } from "@nextui-org/react"
import { Spinner } from "@nextui-org/react"

interface Props extends ButtonProps {
    children: React.ReactNode
}

const Button = ({
    children,
    type = 'button',
    color = 'default',
    ...props
} : Props) => {
  return (
    <NextUIButton
        spinner={< Spinner />}
        color={color}
        {...props}
        >
        {children}
    </NextUIButton>
  )
}

export default Button