"use client"

import { useTheme } from "next-themes";
import React from "react";

import { HiSun, HiMoon } from "react-icons/hi";
import { Button } from "@nextui-org/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [ isMounted, setIsMounted ] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Button onClick={toggleTheme} isIconOnly aria-label="Toggle Theme">
      {theme === "dark" ? <HiMoon /> : <HiSun />}
    </Button>
  );
}
