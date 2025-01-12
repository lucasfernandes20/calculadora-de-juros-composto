"use client";

import { AlignRightIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import HeaderNavigationMenu from "./header-navigation-menu";

const HeaderSheet: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <AlignRightIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="my-12">Navegação</SheetTitle>
          <HeaderNavigationMenu />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderSheet;
