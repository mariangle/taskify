"use client"

import React from "react";

const UseHydration = ({ 
    children,
} : {
    children?: React.ReactNode
}) => {
    const [ isMounted, setIsMounted ] = React.useState<boolean>(false);

    React.useEffect(() => { 
        setIsMounted(true)
    }, [])

    return (
        <>{isMounted && children}</>
    );
}

export default UseHydration