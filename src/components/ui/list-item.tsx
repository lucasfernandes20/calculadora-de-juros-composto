import React from "react";
import { NavigationMenuLink } from "./navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { clamp?: number }
>(({ className, title, children, clamp, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={ref as Url}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
          <p
            className={cn(
              "line-clamp-2 text-sm leading-snug text-muted-foreground",
              `line-clamp-${clamp}`
            )}
          >
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export { ListItem };
