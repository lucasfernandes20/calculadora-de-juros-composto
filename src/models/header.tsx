"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, PlayIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export const Header: React.FC = () => {
  const { setTheme } = useTheme();

  return (
    <header className="border-b-[1px] border-muted shadow-md mb-6">
      <div className="container py-2 flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Escuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              Sistema
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="text-xl">Capital Rico</h1>
        <a
          href="https://www.youtube.com/@capitalrico"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>
            <PlayIcon
              size="1rem"
              className="text-primary-foreground"
              fill="#FFF"
              absoluteStrokeWidth={false}
            />
            Youtube
          </Button>
        </a>
      </div>
    </header>
  );
};
