"use client"

import { useTheme } from "next-themes";
import * as React from "react";

import { HiSun, HiMoon } from "react-icons/hi";
import { Button } from "@nextui-org/react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Button onClick={toggleTheme} isIconOnly aria-label="Toggle Theme">
      {theme === "dark" ? <HiSun /> : <HiMoon />}
    </Button>
  );
}
