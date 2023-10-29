"use client"

import * as react from "react";

const UseHydration = ({ 
    children,
} : {
    children?: React.ReactNode
}) => {
    const [ isMounted, setIsMounted ] = react.useState<boolean>(false);

    react.useEffect(() => { 
        setIsMounted(true)
    }, [])

    return (
        <>{isMounted && children}</>
    );
}

export default UseHydration