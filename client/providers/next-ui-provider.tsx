"use client"

import { NextUIProvider as Provider } from "@nextui-org/react";

const NextUIProvider = ({ 
    children,
} : {
    children?: React.ReactNode
}) => {
    return (
        <Provider>{children}</Provider>
    );
}

export default NextUIProvider