"use client"

import { NextUIProvider } from "@nextui-org/react";

const NextUiContext = ({ 
    children,
} : {
    children?: React.ReactNode
}) => {
    return (
        <NextUIProvider>{children}</NextUIProvider>
    );
}

export default NextUiContext