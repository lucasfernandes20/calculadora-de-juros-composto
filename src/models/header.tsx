"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import HeaderSheet from "@/components/header-sheet";
import HeaderNavigationMenu from "@/components/header-navigation-menu";

const Header: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <header className="border-b-[1px] border-muted shadow-sm mb-6">
      <div className="container py-3 flex items-center justify-between">
        <h1 className="text-xl">Capital Rico</h1>
        <HeaderSheet />

        <div className="hidden md:inline-block">
          <HeaderNavigationMenu />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex relative"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default React.memo(Header);
